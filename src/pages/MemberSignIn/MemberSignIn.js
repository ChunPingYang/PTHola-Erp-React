import React, {PureComponent} from 'react';
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
  Tooltip
} from 'antd'

import styles from './MemberSignIn.less'
import PageHeaderMain from '@/components/PageHeaderMain'
import AddMemberForm from './AddMemberForm'
import MemberShipForm from '@/components/Member/MemberShipForm'
import MemberLeave from '@/components/Member/MemberLeave'
import MemberPayCourse from '@/components/Member/MemberPayCourse'
import MemberEliminate from '@/components/Member/MemberEliminate'
import AdvancedTable from '@/components/AdvancedTable'

const FormItem = Form.Item;
const Option = Select.Option
const TabPane = Tabs.TabPane


@Form.create()
class MemberSignIn extends PureComponent{

  state = {
    data: [],
    value: [],
    fetching: false,
    addModalVisible:false,  //会员签到
    shipModelVisible:false, //会籍续费
    leaveModelVisible:false,  //请假
    payModelVisible:false,  //买私教课
    eliminateModelVisible:false, //私教消课
  }

  columns = [
    {
      title: '手牌号',
      hasSort: false,
      tooltip:'目标提示信息',  //目标提示信息
      children: [
        {
          title: '男',
          sortUp: false,
          hasSort: false,
        },
        {
          title: '女',
          sortUp: false,
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
          sortUp: false,
          hasSort: true,
          field:'name',
          tooltip:''
        },
        {
          title:'年龄',
          sortUp:false,
          hasSort:true,
          field:'age'
        }
      ],
    },
    {
      title: '会员卡号',
      hasSort: false,
      children: [
        {
          title: '录入时间',
          hasSort: true,
          sortUp:false
        },
      ],
    },
    {
      title: '到期时间',
      hasSort: true,
      sortUp: false,
      children: [
        {
          title: '维护会籍',
          hasSort: false,
        },
      ],
    },
    {
      title: '剩余课时',
      hasSort: true,
      sortUp: false,
      children:[
        {
          title:'维护教练',
          hasSort:false
        }
      ]
    },
    {
      title: '入场状态',
      hasSort: false,
      sortUp: false,
      children:[
        {
          title:'全部状态',
          hasSort:false
        }
      ]
    },
    {
      title: '入场时间',
      hasSort: false,
      sortUp: false,
      children:[
        {
          title:'离场状态',
          hasSort:false
        }
      ]
    },
    {
      title: '操作',
    },
  ];

  fetchUser=(value)=>{
    console.log('fetch'+value)
  }

  handleChange=(value)=>{
    console.log('change'+value)
  }

  handleTabChange(key){
    console.log(key)
  }

  renderMenu(){
    return (
      <Menu>
        <Menu.Item>
          <span onClick={this.handleEiminateModalVisible.bind(this,true)}>私教消课</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handleShipModalVisible.bind(this,true)}>会籍续费</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handlePayModalVisible.bind(this,true)}>买私教课</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handleLeaveModalVisible.bind(this,true)}>会籍请假</span>
        </Menu.Item>
      </Menu>
    );
  }


  handleCheckSortList(item){
    console.log(item)
  }

  renderTbody(){
    return(
      <tbody>
        <tr>
          <td>
            <p className={styles.signNum}>15</p>
          </td>
          <td>
            {this.renderMemberInfo('https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png','陈鑫',28,180340431333)}
          </td>
          <td>
            <div className={styles.cardInfo}>
              <p className={styles.title}>134344555</p>
              <p className={styles.subTitle}>2018-11-09</p>
            </div>
          </td>
          <td>
            <div className={styles.dateInfo}>
              <p className={styles.date}>2018-12-09</p>
              <p className={styles.subTitle}>李四</p>
            </div>
          </td>
          <td>
            <div className={styles.dateInfo}>
              <p className={styles.date}>剩余28节</p>
              <p className={styles.subTitle}>甜心教练等3人</p>
            </div>
          </td>
          <td>
            <div className={styles.status}>
              <p className={styles.statusTxt}>已入场</p>
              <p className={styles.subTitle}>11-09</p>
            </div>
          </td>
          <td>
            <div className={styles.timeOrder}>
              <p className={styles.statusSign}>入</p>
              <p className={styles.time}>10:00</p>
            </div>
            <div className={styles.timeOrder}>
              <p className={styles.statusSign}>离</p>
              <p className={styles.time}>11:00</p>
            </div>
          </td>
          <td>
            <div className={styles.opers}>
              <a href="#">签退</a>
              <Divider type="vertical" />
              <Dropdown overlay={this.renderMenu()}>
                <a className="ant-dropdown-link" href="javascript:;">
                  更多 <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  renderForm(){
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={10} sm={24}>
            <FormItem label="入场状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">已入场</Option>
                  <Option value="1">已离场</Option>
                  <Option value="2">已超时</Option>
                </Select>
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

  renderMemberInfo(avatar,name,age,phone){
    return(
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

  handleAddModalVisible = flag => {
    this.setState({
      addModalVisible: !!flag,
    });
  }

  handleShipModalVisible = flag =>{
    this.setState({
      shipModelVisible: !!flag,
    })
  }

  handleLeaveModalVisible = flag =>{
    this.setState({
      leaveModelVisible: !!flag,
    })
  }

  handlePayModalVisible = flag =>{
    this.setState({
      payModelVisible: !!flag,
    })
  }

  handleEiminateModalVisible = flag =>{
    this.setState({
      eliminateModelVisible: !!flag
    })
  }


  render(){
    const {
      fetching,
      data,
      value,
      addModalVisible,
      shipModelVisible,
      leaveModelVisible,
      payModelVisible,
      eliminateModelVisible
    } = this.state;
    const memberMethods = {
      handleAddModalVisible: this.handleAddModalVisible,
      handleShipModalVisible:this.handleShipModalVisible,
      handleLeaveModalVisible:this.handleLeaveModalVisible,
      handlePayModalVisible:this.handlePayModalVisible,
      handleEiminateModalVisible:this.handleEiminateModalVisible
    };

    return(
      <div className={styles.signBox}>
        <PageHeaderMain title="会员签到">
          <div className={styles.searchBox}>
            <div className={styles.searchContent}>
              <Select
                mode="multiple"
                labelInValue
                value={value}
                placeholder="请输入搜索内容"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                size={'large'}
                onSearch={this.fetchUser}
                onChange={this.handleChange}
                style={{ width: '350px' }}
              >
                {data.map(d => <Option key={d.value}>{d.text}</Option>)}
              </Select>
              <Button type="primary" className={styles.signBtn} size={'large'} onClick={()=>this.handleAddModalVisible(true)}>签到</Button>
              <Button size={'large'} style={{marginLeft:'10px'}}>访客签到</Button>
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

                <AdvancedTable columns={this.columns} handleCheckSortList={this.handleCheckSortList.bind(this)}>
                  {this.renderTbody()}
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
    )
  }
}

export default MemberSignIn;
