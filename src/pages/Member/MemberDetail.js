import React, { PureComponent } from 'react';
import router from 'umi/router'
import {
  Row,
  Col,
  Card,
  Divider,
  Button
} from 'antd';

import styles from './MemberDetail.less'

class MemberDetail extends PureComponent{

  onTabChange = key => {
    const {match} = this.props
    router.push(`${match.url}/${key}`);
  }

  render(){
    const {
      match,
      location,
      children
    } = this.props

    const operationTabList = [
      {
        key: 'stamina',
        tab: '体测数据',
      },
      {
        key: 'heart',
        tab: '心率数据',
      },
      {
        key: 'sign',
        tab: '签到记录',
      },
      {
        key: 'elimination',
        tab: '消课记录',
      },
      {
        key: 'private',
        tab: '私教课购课记录',
      },
      {
        key: 'ship',
        tab: '会籍续费记录',
      }
    ];

    return(
      <div className={styles.detailCenter}>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  <div className={styles.name}>王尼玛 28</div>
                  <div>18939393993</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <i className={styles.title} />
                    手机：18030331883
                  </p>
                  <p>
                    <i className={styles.title} />
                    微信：cxcmy199292
                  </p>
                  <p>
                    <i className={styles.title} />
                    邮箱：2343432@qq.com
                  </p>
                  <p>
                    <i className={styles.title} />
                    身份证号：333747474747474738382
                  </p>
                  <p>
                    <i className={styles.title} />
                    所在单位：成都匹体科技
                  </p>
                </div>
                <Divider dashed />
                <div className={styles.item}>
                  <div className={styles.itemTitle}>会籍到期时间</div>
                  <div className={styles.itemInfo}>
                    <p className={styles.date}>2018-12-20</p>
                    <p className={styles.msg}>
                      维护会籍：王尼玛
                    </p>
                    <p className={styles.msg}>
                      上次签到时间：3天前（2018-12-17）
                    </p>
                    <div className={styles.btns}>
                      <Button>续费</Button>
                      <Button>请假</Button>
                      <Button>退款</Button>
                    </div>
                  </div>
                </div>
                <Divider dashed />
                <div className={styles.item}>
                  <div className={styles.itemTitle}>私教课程数量</div>
                  <div className={styles.itemInfo}>
                    <p className={styles.date}>36节</p>
                    <p className={styles.msg}>
                      维护教练：王尼玛、尼玛玩、李四
                    </p>
                    <p className={styles.msg}>
                      上次消课时间：3天前（2018-12-17）
                    </p>
                    <div className={styles.btns}>
                      <Button>买课</Button>
                      <Button>消课</Button>
                      <Button>退款</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={location.pathname.replace(`${match.path}/`, '')}
              onTabChange={this.onTabChange}
            >
              {children}
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default MemberDetail;
