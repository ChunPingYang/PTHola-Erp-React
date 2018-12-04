import React, {PureComponent}  from 'react'
import {
  Row,
  Col,
  Form,
  Input,
  Cascader,
  Button,
  Icon,
  TimePicker
} from 'antd'
import moment from 'moment'
import styles from './Base.less'

const {TextArea} = Input
const FormItem = Form.Item;

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

@Form.create()
class Base extends PureComponent{

  handleAdd(){
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(keys.length);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  handleRemove(k){
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  renderContent(){
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k,index)=>{
      return(
        <FormItem
          style={{marginBottom:'10px'}}
          label={index === 0 ? '营业电话' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`phone[${k}]`, {
          })(
            <Input placeholder="请输入手机号"/>
          )}
          {keys.length > 1 ? (
            <Icon
              style={{fontSize:'20px', marginTop:'6px', marginLeft:'15px'}}
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.handleRemove(k)}
            />
          ) : null}
        </FormItem>
      );
    })

    return [
      <div className={styles.logoBox} key='logo'>
        <label className={styles.label}>
          logo上传
        </label>
        <div className={styles.logo}>
          <div className={styles.avatar}>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"/>
          </div>
          <Button icon="upload">上传logo</Button>
        </div>
      </div>,
      <FormItem label="场馆名称" key="venue_name">
        {getFieldDecorator('venue_name', {
        })(<Input placeholder="请输入场馆名称"/>)}
      </FormItem>,
      <FormItem label="品牌描述" key="brand_desc">
        {getFieldDecorator('brand_desc', {
        })(
          <TextArea placeholder="请输入品牌描述" rows={5}/>
        )}
      </FormItem>,
      <FormItem label="省份/城市/区县" key="geographic">
        {getFieldDecorator('geographic', {
        })(
          <Cascader options={options} placeholder="请选择省份/城市/区县" />
        )}
      </FormItem>,
      <FormItem label="详细地址" key="address">
        {getFieldDecorator('address', {
        })(<Input placeholder="请输入详细地址"/>)}
      </FormItem>,
      <div className={styles.phoneGroup} key="phone">
        {formItems}
        <Button type="dashed" onClick={()=>this.handleAdd()} style={{ width: '100%'}}>
          <Icon type="plus" /> 添加
        </Button>
      </div>,
      <div className={styles.timeGroup} key="time">
        <label className={styles.label}>
          营业时间
        </label>
        <Row gutter={24}>
          <Col lg={12} sm={24}>
            <FormItem key="start_time" style={{width:'100%', marginBottom:'10px'}}>
              {getFieldDecorator('start_time', {
              })(<TimePicker placeholder="请输入开始营业时间" style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
          <Col lg={12} sm={24}>
            <FormItem key="end_time" style={{width:'100%', marginBottom:'10px'}}>
              {getFieldDecorator('end_time', {
              })(<TimePicker placeholder="请输入结束营业时间" style={{width:'100%'}}/>)}
            </FormItem>
          </Col>
        </Row>
        <FormItem key="desc" style={{width:'100%'}}>
          {getFieldDecorator('desc', {
          })(<Input placeholder="特殊情况描述" style={{width:'100%'}}/>)}
        </FormItem>
      </div>,
      <FormItem label="大众点评链接" key="link">
        {getFieldDecorator('link', {
        })(<Input placeholder="请输入大众点评链接"/>)}
      </FormItem>,
      <Button key='btn' type='primary' htmlType="submit" style={{width:'100%'}}>更新基本信息</Button>
    ]
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

  render(){
    return(
      <div className={styles.baseView}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit.bind(this)}>
            {this.renderContent()}
          </Form>
        </div>
      </div>
    )
  }
}

export default Base;
