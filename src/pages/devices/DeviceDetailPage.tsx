import { Alert, Card, Descriptions, Space, Statistic, Tag, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppStore } from '../../hooks/useAppStore'

export function DeviceDetailPage() {
  const { deviceId } = useParams<{ deviceId: string }>()
  const navigate = useNavigate()
  const { getDeviceById } = useAppStore()
  const device = deviceId ? getDeviceById(deviceId) : undefined

  if (!device) {
    return <Alert type="warning" message="未找到设备信息" showIcon />
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        设备详情 - {device.name}
      </Typography.Title>
      <Card>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="设备ID">{device.id}</Descriptions.Item>
          <Descriptions.Item label="设备名称">{device.name}</Descriptions.Item>
          <Descriptions.Item label="设备型号">{device.model}</Descriptions.Item>
          <Descriptions.Item label="序列号">{device.serialNumber}</Descriptions.Item>
          <Descriptions.Item label="固件版本">{device.firmwareVersion}</Descriptions.Item>
          <Descriptions.Item label="最后上线">{device.lastSeenAt}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag
              color={
                device.status === 'online' ? 'green' : device.status === 'offline' ? 'default' : 'orange'
              }
            >
              {device.status === 'online' ? '在线' : device.status === 'offline' ? '离线' : '预警'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="所属区域" span={2}>
            {device.location}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card>
        <Space size={32}>
          <Statistic title="当前温度" value={25.8} suffix="°C" />
          <Statistic title="当前湿度" value={68.2} suffix="%" />
          <Statistic title="剩余电量" value={87} suffix="%" />
        </Space>
      </Card>
      <Typography.Link onClick={() => navigate('/devices')}>返回设备列表</Typography.Link>
    </Space>
  )
}
