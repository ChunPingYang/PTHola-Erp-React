import React, {PureComponent} from 'react';
import {
  Tooltip,
  Icon,
  Pagination
} from 'antd'

import styles from './index.less'

class AdvancedTable extends PureComponent{

  renderThead(){
    const {columns, handleCheckSortList} = this.props
    return(
      <thead>
      <tr>
        {
          columns.map(item => (
            <th key={item.title}>
              <div className={styles.title}>
                <Tooltip title={item.tooltip}>
                  {item.title}
                </Tooltip>
                {
                  item.hasSort ?
                    <p className={styles.sorters} onClick={handleCheckSortList.bind(this, item)}>
                      <Icon type="caret-up"/>
                      <Icon type="caret-down"/>
                    </p>
                    : ''
                }
              </div>
              {
                item.children ?
                  <div className={styles.info}>
                    {
                      item.children.map(subItem => (
                        <div key={subItem.title} className={styles.sortItem}>
                          <Tooltip title={subItem.tooltip}>
                            {subItem.title}
                          </Tooltip>
                          {
                            subItem.hasSort ?
                              <p className={styles.sorters} onClick={handleCheckSortList.bind(this, subItem)}>
                                <Icon type="caret-up"/>
                                <Icon type="caret-down"/>
                              </p>
                              : ''
                          }
                        </div>
                      ))
                    }
                  </div>
                  : ''
              }
            </th>
          ))
        }
      </tr>
      </thead>
    );
  }

  render(){
    const {children} = this.props
    return(
      <div className={styles.tableList}>
        <table>
          {this.renderThead()}
          {children}
        </table>
      </div>
    );
  }
}

export default AdvancedTable;
