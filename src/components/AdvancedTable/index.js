import React, {PureComponent} from 'react';
import {
  Tooltip,
  Icon,
  Pagination,
  Spin
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
                      <Icon type="caret-up" className={item.sortUp === 2 ? styles.active : ''}/>
                      <Icon type="caret-down" className={item.sortUp === 2 ? '' : item.sortUp === 3 ? styles.active : ''}/>
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
                                <Icon type="caret-up" className={subItem.sortUp === 2 ? styles.active : ''}/>
                                <Icon type="caret-down" className={subItem.sortUp === 2 ? '' : subItem.sortUp === 3 ? styles.active : ''}/>
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
    const {
      children,
      pagination,
      onPageChange,
      loading,
      data
    } = this.props

    return(
      <Spin spinning={loading}>
        <div className={styles.tableList}>
          <table>
            {this.renderThead()}
            {children}
          </table>
          {
            data.length ?
              <div className={styles.page}>
                <Pagination
                  onChange={onPageChange}
                  onShowSizeChange={onPageChange}
                  {...pagination}
                />
              </div>
              : <p className={styles.noData}>暂无数据</p>
          }
        </div>
      </Spin>
    );
  }
}

export default AdvancedTable;
