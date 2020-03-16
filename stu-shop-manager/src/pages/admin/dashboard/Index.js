// 看板页面
import React from 'react';
import { Statistic, Card, Row, Col, Icon } from 'antd';

function Index() {
    return (
        <div>
            <Card title="数据汇总" bordered={false}>
                <Row gutter={8}>
                    <Col span={8}>
                        <Card title="新增用户">
                            <Statistic
                                title="新增用户"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="arrow-up" />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="总用户">
                            <Statistic
                                title="总用户"
                                value={80}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="arrow-up" />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="今日订单">
                            <Statistic
                                title="今日订单"
                                value={50}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<Icon type="arrow-up" />}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
            <Card title="其他统计" bordered={false}></Card>
        </div>
    );
}

export default Index
