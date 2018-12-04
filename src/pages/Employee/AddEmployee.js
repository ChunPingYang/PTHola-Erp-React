import React,{PureComponent} from 'react'
import {
  Form,
  Input,
  Select,
  Button,
  Modal,
  Steps,
  DatePicker
} from 'antd';
import moment from 'moment'
import styles from "./EmployeeList.less"
import StandardFormRow from '@/components/StandardFormRow';

const { Step } = Steps;
const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
class AddEmployee extends PureComponent{
  constructor(props) {
    super(props);

    this.state = {
      formVals: {

      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: 5,
      wrapperCol: 18,
    };
  }

  handleNext = currentStep => {
    const { form } = this.props;
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
            console.log(formVals);
            //handleUpdate(formVals);
          }
        },
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
    const roles = [
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
      return[
        <StandardFormRow key="card_number" title="工号" {...this.formLayout}>
          <FormItem key="card_number">
            {form.getFieldDecorator('card_number', {
              initialValue: formVals.card_number,
            })(
              <Input placeholder="请输入员工工号"/>
            )}
            <p className={styles.msg}>
              工号的先后顺序决定对会员展示列表的顺序
            </p>
          </FormItem>
        </StandardFormRow>,
        <StandardFormRow key="title" title="职称" {...this.formLayout}>
          <FormItem>
            {form.getFieldDecorator('title', {
              initialValue: formVals.title,
            })(
              <Input placeholder="请输入员工职称"/>
            )}
            <p className={styles.msg}>
              对会员展示的称谓，并非内部管理角色
            </p>
          </FormItem>
        </StandardFormRow>,
        <StandardFormRow key="date" title="入职时间" {...this.formLayout}>
          <FormItem>
            {form.getFieldDecorator('date', {
              initialValue: formVals.date && moment(moment(formVals.date), 'YYYY-MM-DD'),
            })(
              <DatePicker
                style={{width:'100%'}}
                format="YYYY-MM-DD"
                placeholder="请选择入职时间"
              />
            )}
          </FormItem>
        </StandardFormRow>
      ]
    }
    if (currentStep === 2) {
      return[
        <StandardFormRow key="role" title="角色权限" {...this.formLayout}>
          <FormItem>
            {form.getFieldDecorator('role', {
              initialValue: formVals.role
            })(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="请选择员工角色"
              >
                {
                  roles.map(item=>{
                    return(
                      <Option key={item.id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            )}
            <p className={styles.msg}>
              可多选，详细角色权限，<a href="javascript:;">点击查看</a>
            </p>
            <p className={styles.msg}>
              工作室的管理建议每个教练兼具：会籍、教练、前台三个权限
            </p>
          </FormItem>
        </StandardFormRow>
      ]
    }
    if (currentStep === 3) {
      return[
        <StandardFormRow key="account" title="登录账户" {...this.formLayout}>
          <FormItem key="account">
            {form.getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入员工登录账户' }],
              initialValue:formVals.account
            })(
              <Input placeholder="请输入员工登录账户" addonAfter="@PTHola"/>
            )}
            <p className={styles.msg}>
              员工可使用账号@场馆唯一标示登录后台，建议使用【手机号】或【工号】
            </p>
          </FormItem>
        </StandardFormRow>,
        <StandardFormRow key="password" title="登录密码" {...this.formLayout}>
          <FormItem key="password">
            {form.getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入员工登录密码' }],
              initialValue:formVals.password
            })(
              <Input placeholder="请输入员工登录密码"/>
            )}
            <p className={styles.msg}>
              员工首次登录密码；首次登录后，会强制员工修改密码
            </p>
          </FormItem>
        </StandardFormRow>
      ]
    }
    return[
      <StandardFormRow key="name" title="姓名" {...this.formLayout}>
        <FormItem key="membership">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入员工姓名' }],
            initialValue: formVals.name,
          })(<Input placeholder="请输入员工姓名"/>)}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow key="sex" title="性别" {...this.formLayout}>
        <FormItem key="membership">
          {form.getFieldDecorator('sex', {
            rules: [{ required: true, message: '请选择性别' }],
            initialValue: '1',
          })(
            <Select
              style={{ width: '100%' }}
              placeholder="请选择性别"
            >
              <Option key="1" value="1">
                男
              </Option>
              <Option key="2" value="2">
                女
              </Option>
            </Select>
          )}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow key="phone" title="手机号码" {...this.formLayout}>
        <FormItem key="phone">
          {form.getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入员工手机号码' }],
            initialValue: formVals.phone,
          })(<Input placeholder="请输入员工手机号码"/>)}
        </FormItem>
      </StandardFormRow>,
      <StandardFormRow key="photo" title="人脸拍照" {...this.formLayout}>
        <div className={styles.operList}>
          <div className={styles.avatar}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
          </div>
          <div className={styles.btns}>
            <Button type="primary">拍摄</Button>
            <Button>上传</Button>
          </div>
        </div>
        <FormItem key="photo">
          {form.getFieldDecorator('photo', {
            rules: [{ required: true, message: '请选择上传头像' }],
            initialValue: 'https://gw.alipayobj',
          })(
            <Input type="hidden"/>,
          )}
        </FormItem>
      </StandardFormRow>
    ]
  };

  renderFooter = currentStep => {
    const { handleAddModalVisible } = this.props;
    if (currentStep === 1 || currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => handleAddModalVisible()}>
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
        <Button key="cancel" onClick={() => handleAddModalVisible()}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          完成
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleAddModalVisible()}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        下一步
      </Button>,
    ];
  };

  render() {
    const { addVisible, handleAddModalVisible } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        className={styles.memberModal}
        width={550}
        bodyStyle={{ padding: '32px 40px 30px' }}
        destroyOnClose
        title="新增员工"
        maskClosable={false}
        visible={addVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleAddModalVisible()}
      >
        <Steps style={{ marginBottom: 35 }} size="small" current={currentStep}>
          <Step title="基本"/>
          <Step title="职位"/>
          <Step title="权限"/>
          <Step title="账户"/>
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default AddEmployee;
