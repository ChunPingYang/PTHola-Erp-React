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
  DatePicker
} from 'antd';
import moment from 'moment'
import AddEmployee from './AddEmployee'
import styles from './EmployeeList.less';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class EmployeeList extends PureComponent {

  state = {
    expandForm: false,
    addVisible: false,
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form
        onKeyDown={(e)=>{
          e.keyCode == 13 && e.preventDefault()
        }}
        onSubmit={this.handleSearch.bind(this)}
        layout="inline">
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

    return (
      <Form
        onKeyDown={(e)=>{
          e.keyCode == 13 && e.preventDefault()
        }}
        onSubmit={this.handleSearch.bind(this)}
        layout="inline">
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
            <FormItem label="工号">
              {getFieldDecorator('card_number')(<Input placeholder="请输入搜索工号"/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="角色">
              {getFieldDecorator('role')(<Input placeholder="请输入搜索角色"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="入职时间">
              {getFieldDecorator('date')(
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="请选择入职时间"
                />
              )}
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


  handleAddModalVisible = flag => {
    this.setState({
      addVisible: !!flag,
    });
  };


  render() {
    const {addVisible} = this.state

    const columns = [
      {
        title: '照片',
        dataIndex: 'photo',
        key: 'photo',
        render:val=>(
          <div className={styles.avatar}>
            <img src={val}/>
          </div>
        )
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render:val=><span>{val === 1 ? '男' : '女'}</span>
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '工号',
        dataIndex: 'card_number',
        key: 'card_number',
        sorter:true
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        render: val => <span className={styles.role}>会籍等{val.split(',').length}个角色</span>,
      },
      {
        title: '职称',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title:'入职时间',
        dataIndex:'date',
        key:'date',
        sorter:true,
        render:val=><span>{moment(val*1000).format('YYYY-MM-DD')}</span>
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (val, row) => <a href="javascript:;">修改</a> ,
      },
    ];

    const dataList = [
      {
        uuid: '1111',
        photo:'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        name: '玩你吗',
        sex: 1,
        phone: 18303034944,
        card_number:34442222,
        role: '李四,王五,占三',
        title: '五星私人教练',
        date: 1543829539
      },
      {
        uuid: '3333',
        photo:'',
        name: '速度快',
        sex: 1,
        phone: 18303034944,
        card_number:34442222,
        role: '李四,王五,占三',
        title: '四星私人教练',
        date: 1543829539
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 50,
    };

    const MethodsProps = {
      handleAddModalVisible: this.handleAddModalVisible,
      addVisible: addVisible
    }

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleAddModalVisible(true)}>
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

        <AddEmployee
          {...MethodsProps}
        />
      </div>
    );
  }
}

export default EmployeeList;
