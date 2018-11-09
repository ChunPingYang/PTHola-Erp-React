import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '@/components/Charts';
import Yuan from '@/utils/Yuan';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;

import styles from './DataCenter.less';

class DataCenter extends Component {
  constructor(props) {
    super(props);
    this.rankListData = []
    for (let i = 0; i < 8; i += 1) {
      this.rankListData.push({
        title: `工专路 ${i} 号店`,
        total: 323234,
      });
    }
  }

  componentDidMount() {

  }

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {

    const visitData = [];
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + (1000 * 60 * 60 * 24 * i))).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
      });
    }

    const salesPieData = [
      {
        x: '私教销售',
        y: 15200,
      },
      {
        x: '会籍销售',
        y: 10000,
      },
      {
        x: '其他销售',
        y: 10000,
      },
    ];

    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200,
      });
    }

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 8,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="今日消课数量"
              total={numeral(30).format('0,0')}
              contentHeight={46}
              action={
                <Tooltip title="详情">
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
              footer={
                <div>
                  <span>
                    私教课确认收入：6580元
                  </span>
                </div>
              }
            >
              <MiniBar
                height={46}
                data={visitData}
              />
            </ChartCard>
          </Col>

          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="今日到场人数"
              total={numeral(8846).format('0,0')}
              contentHeight={46}
              action={
                <Tooltip title="详情">
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
              footer={
                <div>
                  <span>
                    当前在场：100
                  </span>
                  <span style={{ marginLeft: 16 }}>
                    已离场：150
                  </span>
                </div>
              }
            >
              <MiniArea color="#975FE4" data={visitData}/>
            </ChartCard>
          </Col>

          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="今日新增会员"
              total={numeral(3).format('0,0') + '位'}
              contentHeight={46}
              action={
                <Tooltip title="详情">
                  <Icon type="info-circle-o"/>
                </Tooltip>
              }
              footer={
                <div>
                  <span>
                    本月新增：26位
                  </span>
                  <span style={{ marginLeft: 16 }}>
                    上月新增：38位
                  </span>
                </div>
              }
            >
              <MiniBar
                height={46}
                color="#11c9c9"
                data={visitData}
              />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <div className={styles.salesCard}>
              <Tabs defaultActiveKey="1" tabBarStyle={{ marginBottom: 24 }} tabBarGutter={10}>
                <TabPane tab="总销售额" key="1">
                  <div className={styles.barPad}>
                    <Bar
                      style={{marginRight:24}}
                      height={300}
                      title="总销售额"
                      data={salesData}
                    />
                  </div>

                </TabPane>
                <TabPane tab="会籍销售额" key="2">
                  会籍销售额
                </TabPane>
                <TabPane tab="私教销售额" key="3">
                  私教销售额
                </TabPane>
                <TabPane tab="其他销售额" key="4">
                  其他销售额
                </TabPane>
                <TabPane tab="新增课程" key="5">
                  新增课程
                </TabPane>
                <TabPane tab="消课数量" key="6">
                  消课数量
                </TabPane>
                <TabPane tab="活跃会员" key="7">
                  活跃会员
                </TabPane>
                <TabPane tab="新增会员" key="8">
                  新增会员
                </TabPane>
              </Tabs>
            </div>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.salesCard}
              bordered={false}
              title="今日销售额"
              bodyStyle={{ padding: 24 }}
            >
              <h4 style={{ marginBottom: 32 }}>
                销售额
              </h4>
              <Pie
                hasLegend
                subTitle="销售额"
                total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
                data={salesPieData}
                height={248}
                valueFormat={value => <Yuan>{value}</Yuan>}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}

export default DataCenter;
