export default function generateRangeOfPages(currentPage, lastPage) {
  const numbers = [];

  if (currentPage > lastPage) return [1];

  const numberOfPagesBefore = currentPage - 1;
  const numberOfPagesAfter = lastPage - currentPage;

  if (numberOfPagesBefore <= 1) {
    for (let i = 1; i <= lastPage; i++) {
      if (i > 5) break;
      numbers.push(i);
    }
  } else if (numberOfPagesAfter <= 1) {
    for (let i = lastPage; i >= 1; i--) {
      if (lastPage - i > 4) break;
      numbers.push(i);
    }
  } else if (numberOfPagesBefore >= 2 && numberOfPagesAfter >= 2) {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      numbers.push(i);
    }
  }

  return numbers.sort((a, b) => a - b);
}
