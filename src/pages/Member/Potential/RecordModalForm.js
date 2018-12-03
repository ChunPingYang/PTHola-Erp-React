import React, { PureComponent } from 'react';
import {
  Table,
  Modal,
} from 'antd';
import moment from 'moment';
import styles from './Potential.less';

class RecordModalForm extends PureComponent {

  handleTableChange() {

  }

  render() {
    const { recordModalVisible, handleRecordModalVisible } = this.props;

    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        render: val => <span>{moment(val * 1000).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title:'跟进描述',
        dataIndex:'desc',
        key:'desc'
      }
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 50,
    };

    const tableList = [
      {
        uuid:'111',
        date:1543827619,
        desc:'这是第一段描述'
      },
      {
        uuid:'222',
        date:1543741219,
        desc:'这是第二段描述'
      }
    ]

    return (
      <Modal
        className={styles.memberModal}
        width={680}
        destroyOnClose
        title="跟进记录"
        maskClosable={false}
        visible={recordModalVisible}
        footer={null}
        onCancel={() => handleRecordModalVisible()}
      >

        <div className={styles.tableListOperator}>
          <Table
            style={{ minWidth: '600px' }}
            rowKey='uuid'
            bordered
            pagination={paginationProps}
            dataSource={tableList}
            onChange={this.handleTableChange.bind(this)}
            columns={columns}/>
        </div>

      </Modal>
    );
  }
}

export default RecordModalForm;
