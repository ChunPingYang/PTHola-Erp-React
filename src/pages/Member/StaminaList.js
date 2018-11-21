import React, {PureComponent} from 'react';
import {
  Table
} from 'antd'

import styles from './MemberDetail.less'

class StaminaList extends PureComponent{

  render(){
    const tableData = [
      {
        key:''
      }
    ]

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    return(
      <div>体测数据</div>
    )
  }
}

export default StaminaList;
