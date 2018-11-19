import React, {PureComponent} from 'react';
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
  Radio
} from 'antd';
import styles from './MemberShipForm.less'
import StandardFormRow from '@/components/StandardFormRow';

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()

class MemberShipForm extends PureComponent{

  state = {
    key:'day'
  }

  handleChange(e){
    this.setState({
      key:e.target.value
    })
  }

  renderContent(){
    const {renderMemberInfo} = this.props
    const {key} = this.state
    return(
      <Row>
        <div className={styles.baseInfo}>
          {renderMemberInfo('https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png','陈鑫',28,180340431333)}
          <span className={styles.divider}></span>
          <div className={styles.ship}>
            <p>维护会籍</p>
            <p className={styles.name}>王尼玛</p>
          </div>
        </div>

        <div className={styles.datePeriod}>
          <Col xs={24} sm={8} md={6} lg={6}>
            <p className={styles.title}>到期时间：</p>
          </Col>
          <Col xs={24} sm={16} md={18} lg={18}>
            <div className={styles.dateBox}>
              <div className={styles.dateInfo}>
                <span className={styles.date}>2018-10-09</span>
                <span className={styles.txt}>当前到期时间</span>
              </div>
              <span className={styles.divider}></span>
              <div className={styles.dateInfo}>
                <span className={styles.date}>2018-11-09</span>
                <span className={styles.txt}>充值后到期时间</span>
              </div>
            </div>
          </Col>
        </div>

        <div className={styles.tabGroup}>
          <Radio.Group value={key} onChange={this.handleChange.bind(this)} style={{marginBottom:24}}>
            <Radio.Button value="day">按天数</Radio.Button>
            <Radio.Button value="date">按到期时间</Radio.Button>
          </Radio.Group>
        </div>

        {this.renderForm()}
      </Row>
    );
  }

  renderDayForm(){
    const {form} = this.props

    return [
      <StandardFormRow title="充值天数" labelCol={5} wrapperCol={19}>
        <div className={styles.chargeDays}>
          <FormItem key="name">
            {form.getFieldDecorator('day', {
              rules: [{ required: true, message: '请输入天数' }]
            })(<Input placeholder="请输入天数" />)}
          </FormItem>
          <FormItem key="status">
            {form.getFieldDecorator('status', {
              initialValue:"1"
            })(
              <Select
                style={{ width: '140px',marginLeft:'10px' }}
              >
                <Option key="1" value="1">
                  立即激活
                </Option>
                <Option key="2" value="2">
                  下次到场激活
                </Option>
              </Select>
            )}
          </FormItem>
        </div>
      </StandardFormRow>,
      <StandardFormRow title="收款金额" labelCol={5} wrapperCol={19}>
        <FormItem key="money">
          {form.getFieldDecorator('money', {
            rules: [{ required: true, message: '请输入收款金额' }]
          })(<Input placeholder="请输入收款金额" addonAfter="¥"/>)}
        </FormItem>
        <p className={styles.msg}>
          如果有定金，请填写包含定金的总金额
        </p>
      </StandardFormRow>
    ];
  }

  renderDateForm(){

  }

  handleSubmit(e){
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if(!err){
        console.log(fieldsValue)
      }
    });
  }

  renderForm(){
    const {key} = this.state
    return key === 'day' ? this.renderDayForm() : this.renderDateForm()
  }

  render(){
    const { shipModelVisible, handleShipModalVisible } = this.props;

    return(
      <Modal
        className={styles.memberModal}
        width={450}
        destroyOnClose
        title="会籍续费/新增会籍时间"
        visible={shipModelVisible}
        onCancel={() => handleShipModalVisible()}
        onOk={this.handleSubmit.bind(this)}
      >

        {this.renderContent()}

      </Modal>
    )
  }
}

export default MemberShipForm;
