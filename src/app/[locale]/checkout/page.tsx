"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface Address {
  id: string;
  full_name: string;
  email: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, closeCart } = useCart();
  const { locale } = useParams() as { locale?: string };
  const t = useTranslations();
  const router = useRouter();
  const isRTL = locale === "ar";

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Address>>({});
  const [showNewForm, setShowNewForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    fetch("/api/addresses")
      .then((res) => res.json())
      .then((json) => {
        if (json.addresses) {
          setSavedAddresses(json.addresses);
          if (json.addresses.length > 0) {
            setSelectedAddressId(json.addresses[0].id);
          }
        }
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/addresses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const result = await res.json();
    if (res.ok) {
      setSavedAddresses((prev) => prev.filter((a) => a.id !== id));
      if (id === selectedAddressId) setSelectedAddressId(null);
    } else {
      alert(result.error || "Failed to delete address");
    }
  };

  const startEdit = (address: Address) => {
    setEditingAddressId(address.id);
    setEditForm(address);
  };

  const cancelEdit = () => {
    setEditingAddressId(null);
    setEditForm({});
  };

  const handleEditSave = async () => {
    const res = await fetch("/api/addresses", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    const result = await res.json();
    if (res.ok) {
      setSavedAddresses((prev) =>
        prev.map((a) => (a.id === result.address.id ? result.address : a))
      );
      setEditingAddressId(null);
      setEditForm({});
    } else {
      alert(result.error || "Failed to update address");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let selectedAddress = null;

      if (showNewForm) {
        const res = await fetch("/api/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: newAddress.fullName,
            email: newAddress.email,
            street: newAddress.street,
            city: newAddress.city,
            postal_code: newAddress.postalCode,
            country: newAddress.country,
          }),
        });

        const result = await res.json();

        if (!res.ok || !result.address) {
          throw new Error(result.error || "Address insert failed");
        }

        selectedAddress = result.address;
      } else {
        selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId);
      }

      if (!selectedAddress) throw new Error("No address selected");

      const payload = {
        shipping: selectedAddress,
        items: items.map((it) => ({
          id: it.id,
          part_number: it.id,
          quantity: it.quantity,
          unit_price: it.price,
        })),
        total: totalPrice,
      };

      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await orderRes.json();
      if (!orderRes.ok) throw new Error(data.error || "Order failed");

      closeCart();
      clearCart();
      router.push(`/${locale}/order-confirmation?ref=${data.orderId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className={`container mx-auto p-8 space-y-6 ${isRTL ? "text-right" : ""}`}
    >
      

      
      <h1 className="text-2xl font-bold">{t("Checkout.title")}</h1>

      {error && <p className="text-red-600">{error}</p>}

      {savedAddresses.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold">{t("Checkout.selectAddress")}</h2>
          {savedAddresses.map((addr) => (
            <div key={addr.id} className="block border p-2 rounded">
              {editingAddressId === addr.id ? (
                <div className="space-y-2">
                  <input
                    name="full_name"
                    value={editForm.full_name || ""}
                    onChange={handleEditInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    name="email"
                    value={editForm.email || ""}
                    onChange={handleEditInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    name="street"
                    value={editForm.street || ""}
                    onChange={handleEditInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    name="city"
                    value={editForm.city || ""}
                    onChange={handleEditInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    name="postal_code"
                    value={editForm.postal_code || ""}
                    onChange={handleEditInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    name="country"
                    value={editForm.country || ""}
                    onChange={handleEditInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={cancelEdit} className="text-gray-500 text-sm">
                      {t("Checkout.cancel")}
                    </button>
                    <button onClick={handleEditSave} className="text-blue-600 text-sm">
                      {t("Checkout.save")}
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex items-center justify-between">
                  <span>
                    <input
                      type="radio"
                      name="selectedAddress"
                      value={addr.id}
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                      className="mr-2"
                    />
                    {addr.full_name}, {addr.street}, {addr.city}, {addr.country}
                  </span>
                  <div className="space-x-3 text-sm">
                    <button
                      onClick={() => startEdit(addr)}
                      className="text-blue-600 hover:underline"
                    >
                      {t("Checkout.edit")}
                    </button>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="text-red-500 hover:underline"
                    >
                      {t("Checkout.delete")}
                    </button>
                  </div>
                </label>
              )}
            </div>
          ))}
        </div>
      )}

      {savedAddresses.length < 3 && (
        <div>
          <button
            type="button"
            className="mt-4 text-sm text-blue-600"
            onClick={() => setShowNewForm(!showNewForm)}
          >
            {showNewForm ? t("Checkout.cancel") : t("Checkout.addNewAddress")}
          </button>
        </div>
      )}

      {showNewForm && (
        <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1">{t("Checkout.fullName")}</label>
            <input
              name="fullName"
              value={newAddress.fullName}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">{t("Checkout.email")}</label>
            <input
              type="email"
              name="email"
              value={newAddress.email}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">{t("Checkout.address")}</label>
            <input
              name="street"
              value={newAddress.street}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">{t("Checkout.city")}</label>
              <input
                name="city"
                value={newAddress.city}
                onChange={handleInputChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">{t("Checkout.postalCode")}</label>
              <input
                name="postalCode"
                value={newAddress.postalCode}
                onChange={handleInputChange}
                required
                className="w-full border rounded p-2"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">{t("Checkout.country")}</label>
            <input
              name="country"
              value={newAddress.country}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {submitting ? t("Checkout.processing") : t("Checkout.placeOrder")}
          </button>
        </form>
      )}

      {!showNewForm && (
        <form onSubmit={handleSubmit} className="pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {submitting ? t("Checkout.processing") : t("Checkout.placeOrder")}
          </button>
        </form>
      )}
    </main>
  );
}