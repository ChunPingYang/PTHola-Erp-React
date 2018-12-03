import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Table,
  Modal,
  Divider,
} from 'antd';
import styles from './Potential.less';
import PotentialForm from './PotentialForm';
import RecordModalForm from './RecordModalForm'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

@Form.create()
class AddFollowRecord extends PureComponent {

  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
    });
  }

  render() {
    const { addFollowVisible, handleAddModalVisible, form } = this.props;

    return (
      <Modal
        className={styles.memberModal}
        width={500}
        bodyStyle={{ padding: '32px 40px 30px' }}
        destroyOnClose
        title="添加跟进记录"
        maskClosable={false}
        visible={addFollowVisible}
        onOk={this.handleSubmit.bind(this)}
        onCancel={() => handleAddModalVisible()}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} label="撰写跟进">
          {form.getFieldDecorator('records', {
            rules: [{ required: true, message: '请输入撰写跟进描述'}],
          })(
            <TextArea rows={4}/>
          )}
        </FormItem>
      </Modal>
    );
  }
}

@Form.create()
class Potential extends PureComponent {

  state = {
    expandForm: false,
    modalVisible: false,
    addFollowVisible: false,
    recordModalVisible:false,
    uuid: '',
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入搜索姓名"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入搜索手机号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const signs = [
      {
        id: 'wzj',
        name: '我自己',
      },
      {
        id: 'wjh',
        name: '吴家豪',
      },
      {
        id: 'zxx',
        name: '周星星',
      },
      {
        id: 'zly',
        name: '赵丽颖',
      },
      {
        id: 'ym',
        name: '姚明',
      },
    ];

    return (
      <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入搜索姓名"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入搜索手机号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="标签">
              {getFieldDecorator('signs')(
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="请选择更进标签"
                >
                  {
                    signs.map(item => {
                      return (
                        <Option key={item.id}>{item.name}</Option>
                      );
                    })
                  }
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="会籍">
              {getFieldDecorator('membership_name')(<Input placeholder="请输入维护会籍"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="来源">
              {getFieldDecorator('source')(<Input placeholder="请输入客户来源"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                收起 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch(e) {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue);
      }
    });
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  handleTableChange(pagination, filters, sorter) {
  }

  handleModalVisible = (flag, uuid) => {
    this.setState({
      modalVisible: !!flag,
      uuid: uuid,
    });
  };

  handleAddModalVisible = flag => {
    this.setState({
      addFollowVisible: !!flag,
    });
  };

  handleRecordModalVisible = flag => {
    this.setState({
      recordModalVisible: !!flag,
    });
  };

  render() {
    const {
      modalVisible,
      addFollowVisible,
      recordModalVisible,
      uuid,
    } = this.state;

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: val => <span>{val === 1 ? '男' : '女'}</span>,
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '客户来源',
        dataIndex: 'source',
        key: 'source',
      },
      {
        title: '维护会籍',
        dataIndex: 'membership_name',
        key: 'membership_name',
      },
      {
        title: '跟进标签',
        dataIndex: 'signs',
        key: 'signs',
        render: val => <span>{val.join(',')}</span>,
      },
      {
        title: '跟进记录',
        dataIndex: 'record',
        key: 'record',
        render: val => <a href="javascript:;" onClick={()=>this.handleRecordModalVisible(true)}>{val ? val : 0}条跟进记录</a>,
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (val, row) => (
          <span>
            <a href="javascript:;" onClick={() => this.handleModalVisible(true, row.uuid)}>编辑信息</a>
            <Divider type="vertical"/>
            <a href="javascript:;" onClick={()=>this.handleAddModalVisible(true)}>新增跟进</a>
            <Divider type="vertical"/>
            <a href="javascript:;">删除</a>
          </span>
        ),
      },
    ];

    const dataList = [
      {
        uuid: '1111',
        name: '玩你吗',
        sex: 1,
        phone: 18303034944,
        source: '美团点评',
        membership_name: '一护',
        signs: ['已到店', '有购买力'],
        record: 4,
      },
      {
        uuid: '222',
        name: '密码我',
        sex: 2,
        phone: 18303034944,
        source: '美团点评',
        membership_name: '一护',
        signs: ['已到店', '有购买力'],
        record: 4,
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 50,
    };

    const memberMethodsProps = {
      handleModalVisible: this.handleModalVisible.bind(this),
      handleAddModalVisible: this.handleAddModalVisible.bind(this),
      handleRecordModalVisible: this.handleRecordModalVisible.bind(this),
      addFollowVisible:addFollowVisible,
      modalVisible: modalVisible,
      recordModalVisible:recordModalVisible,
      uuid: uuid,
    };

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true, '')}>
              新建
            </Button>
            <div className={styles.tableList}>
              <Table
                rowKey='uuid'
                pagination={paginationProps}
                dataSource={dataList}
                onChange={this.handleTableChange.bind(this)}
                columns={columns}/>
            </div>
          </div>
        </Card>

        <PotentialForm
          {...memberMethodsProps}
        />

        <AddFollowRecord
          {...memberMethodsProps}
        />

        <RecordModalForm
          {...memberMethodsProps}
        />
      </div>
    );
  }
}

export default Potential;
