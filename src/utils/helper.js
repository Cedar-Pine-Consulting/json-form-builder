// this method will remove all duplicated and takes the last occurrence of duplicated value
export const uniqByKeepLast = (arr, key) => [
  ...new Map(arr.map((x) => [key(x), x])).values(),
];

// Helper: Convert a blob to text.
export const blobToText = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
  });
