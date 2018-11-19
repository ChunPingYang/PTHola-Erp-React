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
  Divider
} from 'antd'

import styles from './MemberSignIn.less'
import PageHeaderMain from '@/components/PageHeaderMain'
import AddMemberForm from './AddMemberForm'

const FormItem = Form.Item;
const Option = Select.Option
const TabPane = Tabs.TabPane


@Form.create()
class MemberSignIn extends PureComponent{

  state = {
    data: [],
    value: [],
    fetching: false,
    addModalVisible:false
  }

  columns = [
    {
      title: '手牌号',
      hasSort: false,
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
        },
        {
          title:'年龄',
          sortUp:false,
          hasSort:true,
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
          <a target="_blank" rel="noopener noreferrer" href="#">私教消课</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">会籍续费</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">买私教课</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">会籍请假</a>
        </Menu.Item>
      </Menu>
    );
  }

  renderThead(){
    return(
      <thead>
        <tr>
            {
              this.columns.map(item => (
                <th key={item.title}>
                  <div className={styles.title}>
                    {item.title}
                    {
                      item.hasSort ?
                        <p className={styles.sorters}>
                          <Icon type="caret-up"/>
                          <Icon type="caret-down"/>
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
                              {subItem.title}
                              {
                                subItem.hasSort ?
                                  <p className={styles.sorters}>
                                    <Icon type="caret-up"/>
                                    <Icon type="caret-down"/>
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
                <a className="ant-dropdown-link" href="#">
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
  };


  render(){
    const { fetching, data, value, addModalVisible } = this.state;
    const addMemberMethods = {
      handleAddModalVisible: this.handleAddModalVisible,
      renderMemberInfo:this.renderMemberInfo
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

                <div className={styles.tableList}>
                  <table>
                    {this.renderThead()}
                    {this.renderTbody()}
                  </table>
                </div>

              </Card>
            </TabPane>

            <TabPane tab="签到记录" key="2">签到记录</TabPane>
          </Tabs>
        </div>

        <AddMemberForm
          {...addMemberMethods}
          addModalVisible={addModalVisible}
        />
      </div>
    )
  }
}

export default MemberSignIn;
