export const takeFive = (numberOfPages: number, page: number, pages: number[]) => {
  if (page < numberOfPages && page > 1) {
    pages.push(page);
  }
  let offset = 1;
  while(page - offset > 0 || page + offset <= numberOfPages){
    if (page + offset < numberOfPages && page + offset > 0) {
      pages.push(page + offset);
      if(pages.length === 5) break;
    }
    if (page - offset < numberOfPages && page - offset > 0) {
      pages.push(page - offset);
      if(pages.length === 5) break;
    }
    offset++;
  }
}
export default takeFive;