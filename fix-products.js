const fs = require('fs');

// Load your raw products JSON
const data = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

// For each category, ensure id matches part_number and show_product exists
for (const category of Object.keys(data.flora)) {
  const items = data.flora[category];
  if (!Array.isArray(items)) continue;

  data.flora[category] = items.map(item => {
    if (item.part_number) item.id = item.part_number;
    if (item.show_product === undefined) item.show_product = false;
    return item;
  });
}

// Write out the fixed file
fs.writeFileSync(
  'fixed-products.json',
  JSON.stringify(data, null, 2),
  'utf-8'
);

console.log('✅ fixed-products.json generated');
