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
  List,
  Avatar,
  Dropdown,
  Menu,
  DatePicker,
  Modal,
  Steps,
  Radio,
  Table
} from 'antd';

import StandarInfoData from '@/components/StandarInfoData'
import styles from  './EliminateList.less'
import moment from 'moment'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

@Form.create()
class EliminateList extends PureComponent {
  state = {
    expandForm: false
  };

  columns = [
    {
      title:'会员姓名',
      dataIndex:'name',
      key:'name'
    },
    {
      title:'上课教练',
      dataIndex:'coach',
      key:'coach'
    },
    {
      title:'上课日期(上课时间)',
      dataIndex:'classDate',
      key:'classDate',
      sorter:true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title:'课程类型',
      dataIndex:'type',
      key:'type'
    },
    {
      title:'课程单价',
      dataIndex:'price',
      key:'price',
      render:val => <span>¥{val}</span>,
    },
    {
      title:'前台当值',
      dataIndex:'dutyName',
      key:'dutyName'
    },
    {
      title:'操作时间',
      dataIndex:'operDate',
      key:'operDate',
      sorter: true,
      render:val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title:'确认状态',
      dataIndex:'status',
      key:'status',
      render:val => <span>{val===1 ? '会员已确认' : '会员未确认'}</span>
    },
    {
      title:'管理权限',
      dataIndex:'authority',
      key:'authority',
      render:val => <span>{val===1 ? '修改' : ''}</span>
    }
  ]

  componentDidMount() {

  }

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="上课日期">
              {getFieldDecorator('date')(<RangePicker />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="会员姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入会员姓名"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
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

    const owners = [
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
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="上课日期">
              {getFieldDecorator('date')(<RangePicker />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="会员姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入会员姓名"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="上课教练">
              {getFieldDecorator('coach')(<Input placeholder="请输入上课教练"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="课程类型">
              {getFieldDecorator('type')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择课程类型"
                >
                  {owners.map(owner => (
                    <Option key={owner.id} value={owner.id}>
                      {owner.name}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
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

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {

    const tableData = [
      {
        key:1,
        name:'陈鑫1',
        coach:'甜心教练',
        classDate:1542000600,
        type:'常规私教课',
        price:'196',
        dutyName:'李四',
        operDate:1542087000,
        status:1,
        authority:1
      },
      {
        key:2,
        name:'陈鑫2',
        coach:'甜心教练',
        classDate:1539234000,
        type:'常规私教课',
        price:'196',
        dutyName:'李四',
        operDate:1539322200,
        status:1,
        authority:1
      }
    ]

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    return (
      <div>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="今日消课数" title="28" subTitle2="本周283 本月1700" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="今日销售课时" title="36" subTitle2="本周283 本月100" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="今日销售业绩" title="¥7100" subTitle2="本周¥34000 本月¥89000" bordered/>
              </Col>
              <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="剩余总课时" title="100" subTitle2="已消1345" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="今日消课收入" title="¥56000" subTitle2="本周¥34000 本月¥89000"/>
              </Col>
            </Row>
          </Card>
        </div>

        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary">
              导出
            </Button>
            <Table
              rowKey='key'
              pagination={paginationProps}
              dataSource={tableData}
              columns={this.columns}/>
          </div>
        </Card>
      </div>
    );
  }
}

export default EliminateList;
