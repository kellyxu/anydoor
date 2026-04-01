import { Card, Col, List, Progress, Row, Space, Statistic, Tag, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { useAppStore } from '../../hooks/useAppStore'

export const DashboardPage = observer(() => {
  const { dashboardStats, users, roles, devices, otaList } = useAppStore()

  const onlineCount = useMemo(() => devices.filter((item) => item.status === 'online').length, [devices])
  const warningCount = useMemo(() => devices.filter((item) => item.status === 'warning').length, [devices])

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        数据仪表盘
      </Typography.Title>

      <Row gutter={[16, 16]}>
        {dashboardStats.map((stat) => (
          <Col key={stat.id} xs={24} md={12} lg={6}>
            <Card>
              <Statistic title={stat.title} value={stat.value} suffix={stat.suffix} />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="用户总数" value={users.length} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="角色数" value={roles.length} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="设备总数" value={devices.length} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="设备状态分布">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                在线设备 <Tag color="green">{onlineCount}</Tag>
                <Progress
                  percent={devices.length ? Math.round((onlineCount / devices.length) * 100) : 0}
                  showInfo={false}
                />
              </div>
              <div>
                预警设备 <Tag color="orange">{warningCount}</Tag>
                <Progress
                  percent={devices.length ? Math.round((warningCount / devices.length) * 100) : 0}
                  showInfo={false}
                  strokeColor="#fa8c16"
                />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="最近OTA策略">
            <List
              dataSource={otaList}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description={`版本 ${item.targetVersion} · 通道 ${item.channel} · 成功率 ${item.successRate}%`}
                  />
                  <Tag
                    color={
                      item.status === 'finished'
                        ? 'success'
                        : item.status === 'publishing'
                          ? 'processing'
                          : 'default'
                    }
                  >
                    {item.status}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  )
})
