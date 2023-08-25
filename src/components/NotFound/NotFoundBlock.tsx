import React from "react";

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span className={styles.code}>404</span>
      Not found
      <p className={styles.description}>Unfortunately, this page was not found</p>
    </h1>
  )
}

export default NotFoundBlock;