import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { Card, Descriptions, Empty, Progress, Space, Tag, Typography } from 'antd'
import { useAppStore } from '../../hooks/useAppStore'
import type { OtaPlan } from '../../types/models'

export const OtaDetailPage = observer(() => {
  const { otaId } = useParams()
  const { otaList, users, devices } = useAppStore()
  const plan = useMemo(() => otaList.find((item) => item.id === otaId), [otaId, otaList])

  if (!plan) {
    return <Empty description="未找到 OTA 策略" />
  }

  const operatorName = users.find((user) => user.id === plan.operatorUserId)?.name ?? plan.operatorUserId
  const relatedDevices = devices.filter((device) => device.model === plan.name.split(' ')[0] || true)
  const statusColor: Record<OtaPlan['status'], string> = {
    draft: 'default',
    publishing: 'processing',
    finished: 'success',
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        OTA 策略详情
      </Typography.Title>
      <Card>
        <Descriptions column={2}>
          <Descriptions.Item label="策略编号">{plan.id}</Descriptions.Item>
          <Descriptions.Item label="策略名称">{plan.name}</Descriptions.Item>
          <Descriptions.Item label="目标版本">{plan.targetVersion}</Descriptions.Item>
          <Descriptions.Item label="发布通道">{plan.channel}</Descriptions.Item>
          <Descriptions.Item label="目标设备数">{plan.targetDeviceCount}</Descriptions.Item>
          <Descriptions.Item label="操作人">{operatorName}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{dayjs(plan.createdAt).format('YYYY-MM-DD HH:mm')}</Descriptions.Item>
          <Descriptions.Item label="发布说明" span={2}>
            {plan.releaseNote}
          </Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={statusColor[plan.status]}>{plan.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="成功率">
            <Progress percent={plan.successRate} size="small" />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="受影响设备（示例）">
        <Typography.Paragraph style={{ marginBottom: 8 }}>
          当前匹配设备数：{relatedDevices.length}（展示为模板数据，后续可接真实 API）
        </Typography.Paragraph>
        <Typography.Text type="secondary">
          该任务将按通道 {plan.channel} 发布到目标版本 {plan.targetVersion}。
        </Typography.Text>
      </Card>
    </Space>
  )
})
