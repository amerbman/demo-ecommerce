// scripts/seed.js
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Ensure env vars are set
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seedProducts() {
  // 1) Read JSON from data folder
  const filePath = path.join(__dirname, '../data/products.json');
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`❌ Could not read JSON file at ${filePath}`);
    process.exit(1);
  }
  const data = JSON.parse(raw);

  // 2) Prepare products array for upsert
  const products = Object.entries(data.flora)
    .filter(([key]) => key !== 'info')
    .flatMap(([category, items]) =>
      items.map(item => ({
        name:          item.name,
        slug:          item.part_number,
        pdf:           item.pdf || null,
        part_number:   item.part_number,
        quantity:      item.quantity || 0,
        in_stock:      item.in_stock === true,
        description:   item.description || null,
        show_pdf:      item.show_pdf === true,
        show_product:  item.show_product === true,
        price:         item.price || 0,
        name_ar:       item.name_ar || null,
        description_ar:item.description_ar || null,
        category:      category,
        images:        Array.isArray(item.image) ? item.image : []
      }))
    );

  // 3) Upsert into Supabase by part_number
  const { error } = await supabase
    .from('products')
    .upsert(products, { onConflict: 'part_number' });

  if (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }

  console.log(`✅ Seeded ${products.length} products.`);
  process.exit(0);
}

seedProducts();
