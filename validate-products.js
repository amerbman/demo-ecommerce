const fs = require('fs');
const data = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

const allIds = new Set();
const mismatches = [];
const duplicates = [];
const missingShowProduct = [];

for (const category of Object.keys(data.flora)) {
  const items = data.flora[category];
  // Skip non‐array entries (like the "info" string)
  if (!Array.isArray(items)) continue;

  items.forEach(item => {
    // 1) ID vs part_number
    if (item.id !== item.part_number) {
      mismatches.push({ category, id: item.id, part_number: item.part_number });
    }
    // 2) Check for duplicate IDs
    if (allIds.has(item.id)) {
      duplicates.push({ category, id: item.id });
    } else {
      allIds.add(item.id);
    }
    // 3) Missing show_product flag
    if (item.show_product === undefined) {
      missingShowProduct.push({ category, id: item.id });
    }
  });
}

console.log('ID≠part_number mismatches:', mismatches);
console.log('Duplicate IDs:', duplicates);
console.log('Missing show_product:', missingShowProduct);

if (!mismatches.length && !duplicates.length && !missingShowProduct.length) {
  console.log('✅ All checks passed!');
} else {
  console.log('⚠️  Fix the above issues before integrating.');
}
