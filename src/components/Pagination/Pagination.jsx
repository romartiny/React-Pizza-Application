import React, {useState} from 'react';
import ReactPaginate from "react-paginate";

import styles from './Pagination.module.scss';

const MyComponent = ({ currentPage, onChangePage }) => {
  return (
    <div className={styles.box}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        forcePage={currentPage}
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default MyComponent;
