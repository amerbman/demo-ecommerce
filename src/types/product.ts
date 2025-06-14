// src/types/product.ts

/**
 * Represents a single product entry from products.json
 */
export interface Product {
    id: string;
    name: string;
    /** Arabic name, if available */
    name_ar?: string;
    description: string;
    /** Arabic description, if available */
    description_ar?: string;
    /** Array of image URLs */
    image: string[];
    /** Optional PDF link for product documentation */
    pdf?: string;
    /** Manufacturer part number */
    part_number?: string;
    /** Available quantity */
    quantity?: number;
    /** Stock availability flag */
    in_stock?: boolean;
    /** Flag to show PDF in UI */
    show_pdf?: boolean;
    /** Flag to show product details */
    show_product?: boolean;
    /** Price in your currency */
    price?: number;
  }
  