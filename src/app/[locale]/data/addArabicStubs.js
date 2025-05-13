// addArabicStubs.js
const fs = require('fs');
const path = require('path');

// 1) adjust this path if your JSON lives elsewhere
const filePath = path.join(__dirname, 'products.json');

// 2) load your data
let raw = fs.readFileSync(filePath, 'utf8');
let data = JSON.parse(raw);

// 3) only iterate the arrays under data.flora
const flora = data.flora;
for (let [key, val] of Object.entries(flora)) {
  if (Array.isArray(val)) {
    val.forEach(product => {
      // add stubs if missing
      if (product.name_ar === undefined)        product.name_ar = "";
      if (product.description_ar === undefined) product.description_ar = "";
    });
  }
}

// 4) write it back, preserving indentation
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Arabic stubs added to each product.');
