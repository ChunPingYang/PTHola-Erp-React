import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Icon,
  Button,
  Tabs,
  Menu,
  Dropdown,
  Divider,
  Tooltip,
} from 'antd';
import moment from 'moment';
import styles from './MemberSignIn.less';
import PageHeaderMain from '@/components/PageHeaderMain';
import AddMemberForm from './AddMemberForm';
import MemberShipForm from '@/components/Member/MemberShipForm';
import MemberLeave from '@/components/Member/MemberLeave';
import MemberPayCourse from '@/components/Member/MemberPayCourse';
import MemberEliminate from '@/components/Member/MemberEliminate';
import AdvancedTable from '@/components/AdvancedTable';

const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

@connect(({ sign, loading }) => ({
  sign,
  loading: loading.models.sign,
}))
@Form.create()
class MemberSignIn extends PureComponent {

  state = {
    data: [],
    value: [],
    fetching: false,
    addModalVisible: false,  //会员签到
    shipModelVisible: false, //会籍续费
    leaveModelVisible: false,  //请假
    payModelVisible: false,  //买私教课
    eliminateModelVisible: false, //私教消课

    page:1,
    pageSize: 10,
    form_values:[]
  };

  columns = [  //sortUp 1:默认不排序  2:升序  3:降序
    {
      title: '手牌号',
      hasSort: false,
      tooltip: '目标提示信息',  //目标提示信息
      children: [
        {
          title: '男',
          sortUp: 1,
          hasSort: false,
        },
        {
          title: '女',
          sortUp: 1,
          hasSort: false,
        },
      ],
    },
    {
      title: '会员基本信息',
      hasSort: false,
      children: [
        {
          title: '姓名',
          sortUp: 1,
          hasSort: false,
          sort_column: 'name',
          tooltip: '',
        },
        {
          title: '年龄',
          sortUp: 1,
          hasSort: false,
          sort_column:'age'
        },
      ],
    },
    {
      title: '会员卡号',
      hasSort: false,
      children: [
        {
          title: '录入时间',
          hasSort: true,
          sortUp: 1,
          sort_column:'created_at',
        },
      ],
    },
    {
      title: '到期时间',
      hasSort: false,
      sortUp: 1,
      children: [
        {
          title: '维护会籍',
          hasSort: false,
        },
      ],
    },
    {
      title: '剩余课时',
      hasSort: false,
      sortUp: 1,
      children: [
        {
          title: '维护教练',
          hasSort: false,
        },
      ],
    },
    {
      title: '入场状态',
      hasSort: false,
      sortUp: 1,
      children: [
        {
          title: '全部状态',
          hasSort: false,
        },
      ],
    },
    {
      title: '入场时间',
      hasSort: true,
      sortUp: 1,
      sort_column:'sign_time',
      children: [
        {
          title: '离场状态',
          hasSort: false,
        },
      ],
    },
    {
      title: '操作',
    },
  ];

  //获取会员列表
  querySignList(params) {
    const { dispatch } = this.props;
    dispatch({
      type: 'sign/fetch',
      payload: params,
    });
  }

  componentDidMount() {
    this.querySignList({
      page: 1,
      page_size: this.state.pageSize,
      sort_column: "created_at",
      sort_mode: "desc"
    });
  }

  fetchUser = (value) => {
    console.log('fetch' + value);
  };

  handleChange = (value) => {
    console.log('change' + value);
  };

  handleTabChange(key) {
    console.log(key);
  }

  renderMenu() {
    return (
      <Menu>
        <Menu.Item>
          <span onClick={this.handleEiminateModalVisible.bind(this, true)}>私教消课</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handleShipModalVisible.bind(this, true)}>会籍续费</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handlePayModalVisible.bind(this, true)}>买私教课</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handleLeaveModalVisible.bind(this, true)}>会籍请假</span>
        </Menu.Item>
      </Menu>
    );
  }

  renderTbody(item) {
    const coaches = item.coaches_name ? item.coaches_name.split(',') : '';

    return (
      <tr key={item.uuid}>
        <td>
          {
            item.bracelets ?
              <p className={styles.signNum}>
                {
                  item.bracelets.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.status == 0 ? item.msg : ''}
                      </span>
                    );
                  })
                }
              </p>
              : <a href="javascript:;">未领手环</a>
          }
        </td>
        <td>
          {this.renderMemberInfo(item.headimgurl, item.name, item.age, item.phone)}
        </td>
        <td>
          {
            item.is_guest === 0 ?
              <div className={styles.cardInfo}>
                <p className={styles.title}>{item.card_number}</p>
                <p className={styles.subTitle}>{moment(item.created_at * 1000).format('YYYY-MM-DD')}</p>
              </div> : '访客'
          }
        </td>
        <td>
          {
            item.is_guest === 0 ?
              <div className={styles.dateInfo}>
                <p className={styles.date}>{item.expire ? moment(item.expire * 1000).format('YYYY-MM-DD') : '无会籍卡'}</p>
                <p className={styles.subTitle}>{item.membership}</p>
              </div> : ''
          }
        </td>
        <td>
          {
            item.is_guest === 0 ?
              <div className={styles.dateInfo}>
                <p className={styles.date}>剩余{item.has_course_count}节</p>
                <p
                  className={styles.subTitle}>{coaches.length > 1 ? coaches[0] + '教练等' + coaches.length + '人' : coaches[0]}</p>
              </div> : ''
          }
        </td>
        <td>
          <div className={styles.status}>
            <p className={styles.statusTxt}>
              {item.status == 1 ? '已入场' : item.status == 2 ? '已超时' : '已离场'}
            </p>
          </div>
        </td>
        <td>
          <div className={styles.timeOrder}>
            <p className={styles.statusSign}>入</p>
            <p className={styles.title}>{moment(item.sign_time * 1000).format('MM-DD HH:mm')}</p>
          </div>
          <div className={styles.timeOrder}>
            <p className={styles.statusSign}>离</p>
            <p className={styles.title}>{moment(item.leave_time * 1000).format('MM-DD HH:mm')}</p>
          </div>
        </td>
        <td>
          <div className={styles.opers}>
            <a href="#">签退</a>
            <Divider type="vertical"/>
            <Dropdown overlay={this.renderMenu()}>
              <a className="ant-dropdown-link" href="javascript:;">
                更多 <Icon type="down"/>
              </a>
            </Dropdown>
          </div>
        </td>
      </tr>
    );
  }

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={10} sm={24}>
            <FormItem label="入场状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">已入场</Option>
                  <Option value="2">已超时</Option>
                  <Option value="3">已离场</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>

    );
  }

  handleSearch(e){
    e.preventDefault();
    const {
      form: { validateFields },
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        this.setState({
          form_values: values,
        });
        this.querySignList({
          page:1,
          page_size: this.state.pageSize,
          ...values
        })
      }
    });
  }

  renderMemberInfo(avatar, name, age, phone) {
    return (
      <div className={styles.memberInfo}>
        <p className={styles.avatar}>
          <img src={avatar}/>
        </p>
        <div className={styles.baseInfo}>
          <p className={styles.title}>
            <span>{name}</span>
            <span>{age}</span>
          </p>
          <p className={styles.subTitle}>{phone}</p>
        </div>
      </div>
    );
  }

  onPageChange(current, pageSize) {
    const { form_values } = this.state;
    this.setState({
      page: current,
      pageSize,
    });

    this.querySignList({
      page: current,
      page_size: pageSize,
      sort_column: "created_at",
      sort_mode: "desc",
      ...form_values,
    });
  }

  handleCheckSortList(item) {
    const { page, pageSize, form_values } = this.state;

    this.querySignList({
      page: page,
      page_size: pageSize,
      sort_column: item.sort_column,
      sort_mode: item.sortUp === 2 ? 'asc' : item.sortUp === 3 ? 'desc' : '',
      ...form_values,
    });
  }

  handleAddModalVisible = flag => {
    this.setState({
      addModalVisible: !!flag,
    });
  };

  handleShipModalVisible = flag => {
    this.setState({
      shipModelVisible: !!flag,
    });
  };

  handleLeaveModalVisible = flag => {
    this.setState({
      leaveModelVisible: !!flag,
    });
  };

  handlePayModalVisible = flag => {
    this.setState({
      payModelVisible: !!flag,
    });
  };

  handleEiminateModalVisible = flag => {
    this.setState({
      eliminateModelVisible: !!flag,
    });
  };

  render() {
    const {
      fetching,
      data,
      value,
      addModalVisible,
      shipModelVisible,
      leaveModelVisible,
      payModelVisible,
      eliminateModelVisible,
    } = this.state;

    const {
      sign: { response },
      loading,
    } = this.props;

    const memberMethods = {
      handleAddModalVisible: this.handleAddModalVisible,
      handleShipModalVisible: this.handleShipModalVisible,
      handleLeaveModalVisible: this.handleLeaveModalVisible,
      handlePayModalVisible: this.handlePayModalVisible,
      handleEiminateModalVisible: this.handleEiminateModalVisible,
    };
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      current: response.paginator.page,
      total: response.paginator.total_count,
    };

    console.log(response);

    return (
      <div className={styles.signBox}>
        <PageHeaderMain title="会员签到">
          <div className={styles.searchBox}>
            <div className={styles.searchContent}>
              <Select
                mode="multiple"
                labelInValue
                value={value}
                placeholder="请输入搜索内容"
                notFoundContent={fetching ? <Spin size="small"/> : null}
                filterOption={false}
                size={'large'}
                onSearch={this.fetchUser}
                onChange={this.handleChange}
                style={{ width: '350px' }}
              >
                {data.map(d => <Option key={d.value}>{d.text}</Option>)}
              </Select>
              <Button type="primary" className={styles.signBtn} size={'large'}
                      onClick={() => this.handleAddModalVisible(true)}>签到</Button>
              <Button size={'large'} style={{ marginLeft: '10px' }}>访客签到</Button>
            </div>
            <div className={styles.descTxt}>
              <p>请[刷卡] 或输入姓名 [姓名] [手机号] [卡号]签到，或扫描手环归还签退</p>
              <p>[人脸] [指纹] 签到需配合SmartSign设备自动完成会员签到</p>
            </div>
          </div>
        </PageHeaderMain>

        <div className={styles.tableContent}>
          <Tabs animated={false} defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane tab="今日签到" key="1">
              <Card bordered={false}>
                <div className={styles.tableListForm}>{this.renderForm()}</div>

                <AdvancedTable
                  loading={loading}
                  columns={this.columns}
                  data={response.signs}
                  pagination={paginationProps}
                  onPageChange={this.onPageChange.bind(this)}
                  handleCheckSortList={this.handleCheckSortList.bind(this)}>
                  <tbody>
                  {
                    response.signs.map(item => {
                      return (
                        this.renderTbody(item)
                      );
                    })
                  }
                  </tbody>
                </AdvancedTable>

              </Card>
            </TabPane>

            <TabPane tab="签到记录" key="2">签到记录</TabPane>
          </Tabs>
        </div>

        <AddMemberForm
          {...memberMethods}
          addModalVisible={addModalVisible}
        />

        <MemberShipForm
          {...memberMethods}
          shipModelVisible={shipModelVisible}
        />

        <MemberLeave
          {...memberMethods}
          leaveModelVisible={leaveModelVisible}
        />

        <MemberPayCourse
          {...memberMethods}
          payModelVisible={payModelVisible}
        />

        <MemberEliminate
          {...memberMethods}
          eliminateModelVisible={eliminateModelVisible}
        />
      </div>
    );
  }
}

export default MemberSignIn;
