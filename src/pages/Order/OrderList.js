import React, {PureComponent} from 'react'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  DatePicker,
  Table,
  Divider
} from 'antd';

import StandarInfoData from '@/components/StandarInfoData'
import styles from './OrderList.less'
import moment from 'moment'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

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

@Form.create()
class OrderList extends PureComponent{
  state = {
    expandForm: false
  };

  columns=[
    {
      title:'订单号',
      dataIndex:'order_id',
      key:'order_id'
    },
    {
      title:'关联订单',
      dataIndex:'order',
      key:'order'
    },
    {
      title:'会员姓名',
      dataIndex:'name',
      key:'name'
    },
    {
      title:'会员卡号',
      dataIndex:'card_id',
      key:'card_id'
    },
    {
      title:'订单类型',
      dataIndex:'type',
      key:'type'
    },
    {
      title:'订单数量',
      dataIndex:'number',
      key:'number'
    },
    {
      title:'订单操作时间',
      dataIndex:'date',
      key:'date'
    },
    {
      title:'前台操作员',
      dataIndex:'oper',
      key:'oper'
    },
    {
      title:'实收金额',
      dataIndex:'money',
      key:'money'
    },
    {
      title:'订单修改记录',
      dataIndex:'order_amend',
      key:'order_amend'
    },
    {
      title:'财务锁定',
      dataIndex:'locking',
      key:'locking'
    },
    {
      title:'操作',
      dataIndex:'',
      key:'x',
      render:()=>(
        <span>
          <a href="javascript:;">查看</a>
          <Divider type="vertical" />
          <a href="javascript:;">修改</a>
        </span>
      )
    }
  ]

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleSearch(e){
    const _this = this
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if(!err){
        console.log(fieldsValue)
      }
    });
  }

  renderSimpleForm(){
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={7} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('date')(<RangePicker />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="订单类型">
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
          <Col md={6} sm={24}>
            <FormItem label="卡号">
              {getFieldDecorator('card_id')(<Input placeholder="请输入会员卡号"/>)}
            </FormItem>
          </Col>
          <Col md={5} sm={24}>
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

  renderAdvancedForm(){
    const {
      form: { getFieldDecorator },
    } = this.props;

    return(
      <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('date')(<RangePicker />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="订单类型">
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
          <Col md={6} sm={24}>
            <FormItem label="卡号">
              {getFieldDecorator('card_id')(<Input placeholder="请输入会员卡号"/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="订单号">
              {getFieldDecorator('order_id')(<Input placeholder="请输入订单号"/>)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="财务锁定">
              {getFieldDecorator('locking')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择财务锁定"
                >
                  <Option key='1' value='1'>
                    不限
                  </Option>
                  <Option key='2' value='2'>
                    已锁定
                  </Option>
                  <Option key='3' value='3'>
                    未锁定
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="修改">
              {getFieldDecorator('order_amend')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择是否修改"
                >
                  <Option key='1' value='1'>
                    不限
                  </Option>
                  <Option key='2' value='2'>
                    有修改
                  </Option>
                  <Option key='3' value='3'>
                    没修改
                  </Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
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

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render(){
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const tableData = [
      {
        key:1,
        order_id:133444,
        order:37747474,
        name:'牛逼',
        card_id:18383883,
        type:'私教购课',
        number:'299天',
        date:'2018-09-12',
        oper:'甜心',
        money:'¥3999',
        order_amend:'2条记录',
        locking:'是',
      },
      {
        key:2,
        order_id:133444,
        order:37747474,
        name:'牛逼',
        card_id:18383883,
        type:'私教购课',
        number:'299天',
        date:'2018-09-12',
        oper:'甜心',
        money:'¥3999',
        order_amend:'2条记录',
        locking:'是',
      }
    ]


    return(
      <div>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月销售额" number="1343455" subTitle1="上月1234344" subTitle2="同比15%" up='true' bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月会籍销售额" number="193939" subTitle1="上月234444" subTitle2="同比16%" up="false" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月私教销售额" number="710033" subTitle1="上月137447" subTitle2="同比17%" up='true' bordered/>
              </Col>
              <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月其他销售额" number="3453454" subTitle1="上月28383" subTitle2="同比17%" up="false" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData title="本月退款金额" number="56000" subTitle1="上月83292" subTitle2="同比19%" up='true'/>
              </Col>
            </Row>
          </Card>
        </div>

        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Table
              rowKey='key'
              pagination={paginationProps}
              dataSource={tableData}
              columns={this.columns}/>
          </div>
        </Card>
      </div>
    )
  }
}

export default OrderList;
