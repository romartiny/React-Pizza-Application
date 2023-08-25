import React from 'react';
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss';

type PaginationProps = {
    currentPage: number,
    onChangePage: any,
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <div className={styles.box}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        forcePage={currentPage - 1}
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
      />
    </div>
  );
};

export default Pagination;
