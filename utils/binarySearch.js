// Binary Search implementation for sorted arrays
const binarySearch = (arr, target, key) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const current = arr[mid][key].toLowerCase();
    const searchTarget = target.toLowerCase();

    if (current === searchTarget) {
      return mid;
    }

    if (current < searchTarget) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};

// Search products by name using binary search
const searchProducts = (products, searchTerm) => {
  // First sort the products by name for binary search
  const sortedProducts = [...products].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  const results = [];
  let currentIndex = 0;

  while (currentIndex < sortedProducts.length) {
    const index = binarySearch(
      sortedProducts.slice(currentIndex),
      searchTerm,
      "name"
    );

    if (index === -1) break;

    const foundIndex = currentIndex + index;
    results.push(sortedProducts[foundIndex]);
    currentIndex = foundIndex + 1;
  }

  return results;
};

// Search products by price range
const searchByPriceRange = (products, minPrice, maxPrice) => {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );
};

module.exports = {
  binarySearch,
  searchProducts,
  searchByPriceRange,
};
