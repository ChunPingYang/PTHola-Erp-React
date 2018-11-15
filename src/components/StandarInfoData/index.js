import React from 'react';
import styles from './index.less';

const StandarInfoData = ({subTitle1, title, subTitle2, bordered}) =>{
  return (
    <div className={styles.headerInfo}>
      <span>{subTitle1}</span>
      <p>{title}</p>
      <span>{subTitle2}</span>
      {bordered && <em/>}
    </div>
  )
}

export default StandarInfoData;
