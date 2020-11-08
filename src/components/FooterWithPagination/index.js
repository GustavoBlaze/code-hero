import React from "react";

import generateRangeOfPages from "../../utils/generateRangeOfPages";
import "./styles.scss";

function FooterWithPagination({ page, pages, callback, ...rest }) {
  const handleFirstPageClick = () => callback(1);

  const handlePrevPageClick = () => callback(page - 1);

  const handleNextPageClick = () => callback(page + 1);

  const handleLastPageClick = () => callback(pages);

  const rangeOfPages = generateRangeOfPages(page, pages);

  return (
    <footer className="footer-with-pagination" {...rest}>
      <button
        className="footer-with-pagination__button first"
        type="button"
        disabled={page <= 2}
        onClick={handleFirstPageClick}
      ></button>

      <button
        className="footer-with-pagination__button prev"
        type="button"
        disabled={page === 1}
        onClick={handlePrevPageClick}
      ></button>

      {rangeOfPages.map((pageNumber) => (
        <button
          key={pageNumber.toString()}
          className={`footer-with-pagination__button number${
            pageNumber === page ? " selected" : ""
          }`}
          type="button"
          onClick={() => callback(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="footer-with-pagination__button next"
        type="button"
        disabled={page === pages}
        onClick={handleNextPageClick}
      ></button>

      <button
        className="footer-with-pagination__button last"
        type="button"
        disabled={page >= pages - 1}
        onClick={handleLastPageClick}
      ></button>
    </footer>
  );
}

FooterWithPagination.defaultProps = {
  total: 0,
  pages: 1,
  page: 1,
  callback: () => {},
};

export default React.memo(FooterWithPagination);
