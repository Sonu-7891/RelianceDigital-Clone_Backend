// Quick Sort implementation for products
const quickSort = (arr, key, order = "asc") => {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];

  for (let item of arr) {
    if (order === "asc") {
      if (item[key] < pivot[key]) left.push(item);
      else if (item[key] > pivot[key]) right.push(item);
      else equal.push(item);
    } else {
      if (item[key] > pivot[key]) left.push(item);
      else if (item[key] < pivot[key]) right.push(item);
      else equal.push(item);
    }
  }

  return [
    ...quickSort(left, key, order),
    ...equal,
    ...quickSort(right, key, order),
  ];
};

// Bubble Sort implementation for products
const bubbleSort = (arr, key, order = "asc") => {
  const len = arr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (order === "asc") {
        if (arr[i][key] > arr[i + 1][key]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      } else {
        if (arr[i][key] < arr[i + 1][key]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
    }
  } while (swapped);

  return arr;
};

// Sort products by price or rating
const sortProducts = (products, sortBy = "price", order = "asc") => {
  const validSortKeys = ["price", "rating"];
  if (!validSortKeys.includes(sortBy)) {
    throw new Error('Invalid sort key. Use "price" or "rating"');
  }

  // Use quick sort for better performance
  return quickSort([...products], sortBy, order);
};

module.exports = {
  quickSort,
  bubbleSort,
  sortProducts,
};
