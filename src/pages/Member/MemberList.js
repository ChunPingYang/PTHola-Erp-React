import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import router from 'umi/router';
import Link from 'umi/link'
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
  Divider
} from 'antd';

import styles from './MemberList.less';
import StandardFormRow from '@/components/StandardFormRow';
import StandarInfoData from '@/components/StandarInfoData'
import AdvancedTable from '@/components/AdvancedTable'

const FormItem = Form.Item;
const { Step } = Steps;
const RadioGroup = Radio.Group;
const Option = Select.Option;

@Form.create()
class AddMemberForm extends PureComponent{
  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: '',
        target: '0',
        template: '0',
        type: '',
        frequency: 'month',
        phone:'',
        photo:'',
        card:'',
        membership:[],
        coach:[],
        wx:'',
        email:'',
        IDcard:'',
        company:'',
        channel:''
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 3) {
            this.forward();
          } else {
            console.log(formVals)
            //handleUpdate(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
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
    if (currentStep === 1) {
      return [
        <FormItem key="photo" {...this.formLayout} label="人脸拍照">
          {form.getFieldDecorator('photo',{
            initialValue:formVals.photo
          })(
            <div className={styles.operList}>
              <div className={styles.avatar}>
                <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
              </div>
              <div className={styles.btns}>
                <Button type="primary">拍摄</Button>
                <Button>上传</Button>
              </div>
            </div>
          )}
        </FormItem>,
        <FormItem key="card" {...this.formLayout} label="实体卡号">
          {form.getFieldDecorator('card',{
            initialValue:formVals.card
          })(
            <div className={styles.cardInfo}>
              <div className={styles.inp}>
                <Input defaultValue={formVals.card} placeholder="请输入实体卡号" />
                <Button type="primary">刷卡</Button>
              </div>
              <p className={styles.msg}>
                手动输入或通过读卡器、刷卡器录入卡号
              </p>
            </div>
          )}
        </FormItem>,
        <FormItem key="fingerprint" {...this.formLayout} label="指纹信息">
          {form.getFieldDecorator('fingerprint',{
            initialValue:formVals.fingerprint
          })(
            <div className={styles.cardInfo}>
              <div className={styles.inp}>
                <Input disabled={true} style={{textAlign:'center'}} value="未采集"/>
                <Button type="primary">采集</Button>
              </div>
              <p className={styles.msg}>
                点击采集，根据提示完成指纹录入
              </p>
            </div>
          )}
        </FormItem>
      ];
    }
    if (currentStep === 2) {
      return [
        <StandardFormRow title="维护会籍" labelCol={5} wrapperCol={15} key="1">
          <FormItem key="membership">
            {form.getFieldDecorator('membership', {
              initialValue: formVals.membership,
            })(
              <Select
                style={{ width: '100%' }}
                placeholder="请选择会籍"
              >
                {owners.map(owner => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <p className={styles.msg}>
            仅为方便管理，与业绩划分并无直接关系最多可选1位会籍
          </p>
        </StandardFormRow>,
        <StandardFormRow title="维护教练" labelCol={5} wrapperCol={15} key="2">
          <FormItem key="coach">
            {form.getFieldDecorator('coach', {
              initialValue: formVals.coach,
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择教练"
              >
                {owners.map(owner => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>
            )}
            <p className={styles.msg}>
              仅为方便管理，与业绩划分并无直接关系不限数量
            </p>
          </FormItem>
        </StandardFormRow>,
      ];
    }
    if(currentStep === 3){
      return [
        <FormItem key="wx" {...this.formLayout} label="微信">
          {form.getFieldDecorator('wx', {
            initialValue: formVals.wx,
          })(<Input placeholder="请输入微信号" />)}
        </FormItem>,
        <FormItem key="email" {...this.formLayout} label="邮箱">
          {form.getFieldDecorator('email', {
            initialValue: formVals.email,
          })(<Input placeholder="请输入邮箱号" />)}
        </FormItem>,
        <FormItem key="IDcard" {...this.formLayout} label="身份证号">
          {form.getFieldDecorator('IDcard', {
            initialValue: formVals.IDcard,
          })(<Input placeholder="请输入身份证号" />)}
        </FormItem>,
        <FormItem key="company" {...this.formLayout} label="所在单位">
          {form.getFieldDecorator('company', {
            initialValue: formVals.company,
          })(<Input placeholder="请输入所在单位" />)}
        </FormItem>,
        <FormItem key="channel" {...this.formLayout} label="所在单位">
          {form.getFieldDecorator('channel', {
            initialValue: formVals.channel,
          })(<Input placeholder="请输入来源渠道" />)}
        </FormItem>,
      ]
    }
    return [
      <FormItem key="name" {...this.formLayout} label="姓名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入姓名' }],
          initialValue: formVals.name,
        })(<Input placeholder="请输入姓名" />)}
      </FormItem>,
      <FormItem key="type" {...this.formLayout} label="性别">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择性别' }],
          initialValue: formVals.type,
        })(
          <RadioGroup>
            <Radio value="0">男</Radio>
            <Radio value="1">女</Radio>
          </RadioGroup>
        )}
      </FormItem>,
      <FormItem key="born" {...this.formLayout} label="生日">
        {form.getFieldDecorator('born',{
          initialValue:formVals.born && moment(moment(formVals.born), 'YYYY-MM-DD')
        })(
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            placeholder="请选择出生日期"
          />
        )}
      </FormItem>,
      <FormItem key="phone" {...this.formLayout} label="手机号码">
        {form.getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入手机号码' }],
          initialValue: formVals.phone,
        })(<Input placeholder="请输入手机号码" />)}
      </FormItem>,
    ];
  };

  renderFooter = currentStep => {
    const { handleModalVisible } = this.props;
    if (currentStep === 1 || currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleModalVisible()}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      ];
    }
    if (currentStep === 3) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleModalVisible()}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleModalVisible()}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { modalVisible, handleModalVisible } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        className={styles.memberModal}
        width={550}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="新增会员"
        visible={modalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本" />
          <Step title="打卡" />
          <Step title="维护" />
          <Step title="更多" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}


@Form.create()
class MemberList extends PureComponent {
  state = {
    expandForm: false,
    modalVisible: false,
  };

  columns = [
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
          title: '年龄',
          sortUp: false,
          hasSort: true,
        },
      ],
    },
    {
      title: '会员卡号',
      hasSort: false,
      children: [
        {
          title: '录入时间',
          sortUp: false,
          hasSort: true,
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
      children: [
        {
          title: '维护教练',
          hasSort: false,
        },
      ],
    },
    {
      title: '上次打卡',
      hasSort: true,
      sortUp: false,
    },
    {
      title: '上次消课',
      hasSort: true,
      sortUp: false,
    },
    {
      title: '消费总额',
      hasSort: true,
      sortUp: false,
    },
    {
      title: '操作',
    },
  ];

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
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
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
            <FormItem label="会员卡">
              {getFieldDecorator('card')(<Input placeholder="请输入搜索会员卡号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="会籍">
              {getFieldDecorator('card')(<Input placeholder="请输入搜索会籍"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="教练">
              {getFieldDecorator('card')(<Input placeholder="请输入搜索教练"/>)}
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

  renderSelfThead() {
    return (
      <ul className={styles.memberThead}>
        {
          this.columns.map(item => (
            <li key={item.title}>
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
            </li>
          ))
        }
      </ul>
    );
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleCheckSortList(item){
    console.log(item)
  }

  renderMenu(){
    return (
      <Menu>
        <Menu.Item>
          <span>编辑</span>
        </Menu.Item>
        <Menu.Item>
          <span>删除</span>
        </Menu.Item>
      </Menu>
    );
  }

  renderTbody(item,index){
    const {match} = this.props
    return(
      <tr key={index}>
        <td>
          {this.renderMemberInfo('https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png','陈鑫',28,180340431333)}
        </td>
        <td>
          <div className={styles.messInfo}>
            <p>{item.cardNum}</p>
            <p className={styles.inTime}>{item.inTime}</p>
          </div>
        </td>
        <td>
          <div className={styles.dateInfo}>
            <p className={styles.date}>{item.toTime}</p>
            <p className={styles.title}>{item.maintain}</p>
          </div>
        </td>
        <td>
          <div className={styles.dateInfo}>
            <p className={styles.date}>剩余{item.residue}节</p>
            <p className={styles.title}>{item.coachName}</p>
          </div>
        </td>
        <td>
          <div className={styles.messInfo}>
            <p>{item.lastClock}</p>
            <p className={styles.inTime}>{item.lastClockTime}</p>
          </div>
        </td>
        <td>
          <div className={styles.messInfo}>
            <p>{item.lastClass}</p>
            <p className={styles.inTime}>{item.lastClassTime}</p>
          </div>
        </td>
        <td>
          ¥{item.money}
        </td>
        <td>
          <div className={styles.opers}>
            <Link to={`${match.url}/detail/stamina`}>详情</Link>
            <Divider type="vertical" />
            <Dropdown overlay={this.renderMenu()}>
              <a className="ant-dropdown-link" href="javascript:;">
                更多 <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </td>
      </tr>
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

  onPageChange(current,pageSize){
    console.log(current,pageSize)
  }

  render() {
    const {modalVisible} = this.state

    const listTestData = [
      {
        id: 1,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        name: 'chenxin',
        age: 24,
        phone: 18040431883,
        cardNum: 133454545454,
        inTime: '2018-11-09',
        toTime: '2019-12-30',
        maintain: '李四',
        residue: 78,
        coachName: '甜心教练',
        lastClock: '3天前',
        lastClockTime: '2018-10-28',
        lastClass: '2天前',
        lastClassTime: '2018-11-08',
        money: '18000',
      },
      {
        id: 2,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        name: 'chenxin',
        age: 24,
        phone: 18040431883,
        cardNum: 133454545454,
        inTime: '2018-11-09',
        toTime: '2019-12-30',
        maintain: '李四',
        residue: 78,
        coachName: '甜心教练',
        lastClock: '3天前',
        lastClockTime: '2018-10-28',
        lastClass: '2天前',
        lastClassTime: '2018-11-08',
        money: '18000',
      },
    ];

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent:1,
      total: 50,
    };

    const addMemberMethods = {
      handleModalVisible: this.handleModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <div className={styles.memberContent}>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="会员总数" title="245" subTitle2="男134 女166" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="未过期会员" title="245" subTitle2="已过期58" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="私教会员" title="245" subTitle2="非私教会员100" bordered/>
              </Col>
              <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="90天内即将过期" title="245" subTitle2="30天内过期12" bordered/>
              </Col>
              <Col xl={5} lg={8} md={8} sm={12} xs={24}>
                <StandarInfoData subTitle1="剩余课时1-15节" title="245" subTitle2="剩余0节会员25"/>
              </Col>
            </Row>
          </Card>
        </div>

        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>

            <AdvancedTable
              columns={this.columns}
              pagination = {paginationProps}
              onPageChange={this.onPageChange.bind(this)}
              handleCheckSortList={this.handleCheckSortList.bind(this)}>
              <tbody>
              {
                listTestData.map((item,index)=>{
                  return (
                    this.renderTbody(item,index)
                  )
                })
              }
              </tbody>
            </AdvancedTable>

          </div>
        </Card>

        <AddMemberForm
          {...addMemberMethods}
          modalVisible={modalVisible}
        />
      </div>
    );
  }
}

export default MemberList;
