const fs = require('fs');
const path = './src/app/data/products.json';  // Updated path

// Default price if none exists
const defaultPrice = 19.99;

// Read the JSON file
try {
  const data = fs.readFileSync(path, 'utf8');
  const productsData = JSON.parse(data);

  // Iterate over all product categories
  for (const category in productsData.flora) {
    if (Array.isArray(productsData.flora[category])) {
      productsData.flora[category] = productsData.flora[category].map((product) => {
        // Add price if it doesn't exist
        if (!product.price) {
          product.price = defaultPrice;
        }
        return product;
      });
    }
  }

  // Save the updated JSON file
  fs.writeFileSync(path, JSON.stringify(productsData, null, 2));
  console.log('Prices added successfully!');
} catch (err) {
  console.error('Error reading or writing file:', err);
}
