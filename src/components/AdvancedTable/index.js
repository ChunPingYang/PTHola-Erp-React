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
    const {columns} = this.props
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
                    <p className={styles.sorters} onClick={this.handleCheckSort.bind(this, item)}>
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
                              <p className={styles.sorters} onClick={this.handleCheckSort.bind(this, subItem)}>
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

  handleCheckSort(item){
    const {columns, handleCheckSortList} = this.props

    columns.map(i=>{
      if(i.sort_column!==item.sort_column){
        i.sortUp = 1
        if(i.children){
          i.children.map(j=>{
            if(j.sort_column !== item.sort_column){
              j.sortUp = 1
            }
          })
        }
      }
    })

    item.sortUp === 1 ?
      item.sortUp = 2 :
      item.sortUp === 2 ?
        item.sortUp = 3 :
        item.sortUp = 2;

    handleCheckSortList(item)
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
            data ? data.length ?
              <div className={styles.page}>
                <Pagination
                  onChange={onPageChange}
                  onShowSizeChange={onPageChange}
                  {...pagination}
                />
              </div>
              : <p className={styles.noData}>暂无数据</p>
              : ''
          }
        </div>
      </Spin>
    );
  }
}

export default AdvancedTable;
