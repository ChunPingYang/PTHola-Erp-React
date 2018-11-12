import React, { Component } from 'react';
import moment from 'moment'
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';

import styles from './MemberList.less'

const FormItem = Form.Item;

@Form.create()
class MemberList extends Component {
  state = {
    expandForm:false
  }

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
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入搜索姓名" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入搜索手机号" />)}
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
                展开 <Icon type="down" />
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
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入搜索姓名" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入搜索手机号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="会员卡">
              {getFieldDecorator('card')(<Input placeholder="请输入搜索会员卡号" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="会籍">
              {getFieldDecorator('card')(<Input placeholder="请输入搜索会籍" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="教练">
              {getFieldDecorator('card')(<Input placeholder="请输入搜索教练" />)}
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
                收起 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {

    const Info = ({subTitle1,title,subTitle2,bordered}) => (
      <div className={styles.headerInfo}>
        <span>{subTitle1}</span>
        <p>{title}</p>
        <span>{subTitle2}</span>
        {bordered && <em/>}
      </div>
    );

    return (
      <div className={styles.memberContent}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <Info subTitle1="会员总数" title="245个会员" subTitle2="男134 女166" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <Info subTitle1="未过期会员" title="245个会员" subTitle2="已过期58" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <Info subTitle1="私教会员" title="245个会员" subTitle2="非私教会员100" bordered/>
              </Col>
              <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <Info subTitle1="90天内即将过期" title="245个会员" subTitle2="30天内过期12" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <Info subTitle1="剩余课时1-15节" title="245个会员" subTitle2="剩余0节会员25"/>
              </Col>
            </Row>
          </Card>
        </div>

        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
          </div>
        </Card>

      </div>
    );
  }
}

export default MemberList;
