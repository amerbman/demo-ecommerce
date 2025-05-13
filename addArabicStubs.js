// addArabicStubs.js
const fs   = require('fs');
const path = require('path');

// 1. locate your src/app folder
const appDir = path.join(__dirname, 'src', 'app');

// 2. find the folder whose name is like "[locale]"
const localeFolder = fs.readdirSync(appDir)
  .find(name => name.startsWith('[') && name.endsWith(']'));
if (!localeFolder) {
  console.error('❌ Couldn’t find a [locale] folder under src/app');
  process.exit(1);
}

// 3. build the path to your JSON
const filePath = path.join(appDir, localeFolder, 'data', 'products.json');

// 4. read, update, and write
const raw  = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw);

for (const [key, val] of Object.entries(data.flora)) {
  if (Array.isArray(val)) {
    val.forEach(product => {
      if (product.name_ar === undefined)        product.name_ar = "";
      if (product.description_ar === undefined) product.description_ar = "";
    });
  }
}

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('✅ Arabic stubs added to each product at', filePath);
