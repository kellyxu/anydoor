import { Card, Descriptions, Empty, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore } from '../../hooks/useAppStore'
import type { Device, OtaPlan } from '../../types/models'

const { Title } = Typography

export const UserDetailPage = observer(() => {
  const { userId } = useParams()
  const { getUserById, getDevicesByOwnerId, getOtaByOperatorId, roleMap } = useAppStore()

  const user = useMemo(() => (userId ? getUserById(userId) : undefined), [getUserById, userId])
  const devices = useMemo(() => (userId ? getDevicesByOwnerId(userId) : []), [getDevicesByOwnerId, userId])
  const otaTasks = useMemo(() => (userId ? getOtaByOperatorId(userId) : []), [getOtaByOperatorId, userId])

  const deviceColumns: ColumnsType<Device> = [
    { title: '设备名称', dataIndex: 'name' },
    { title: '设备型号', dataIndex: 'model' },
    { title: '序列号', dataIndex: 'serialNumber' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: Device['status']) => (
        <Tag color={status === 'online' ? 'success' : status === 'offline' ? 'default' : 'warning'}>
          {status === 'online' ? '在线' : status === 'offline' ? '离线' : '预警'}
        </Tag>
      ),
    },
  ]

  const otaColumns: ColumnsType<OtaPlan> = [
    { title: '任务名称', dataIndex: 'name' },
    { title: '目标版本', dataIndex: 'targetVersion' },
    { title: '设备数量', dataIndex: 'targetDeviceCount' },
    {
      title: '成功率',
      dataIndex: 'successRate',
      render: (successRate: number) => `${successRate}%`,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm'),
    },
  ]

  if (!user) {
    return <Empty description="未找到该用户" />
  }

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Title level={4} style={{ margin: 0 }}>
        用户详情 - {user.name}
      </Title>

      <Card>
        <Descriptions column={2}>
          <Descriptions.Item label="用户ID">{user.id}</Descriptions.Item>
          <Descriptions.Item label="姓名">{user.name}</Descriptions.Item>
          <Descriptions.Item label="角色">{roleMap.get(user.roleId)?.name ?? user.roleId}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
          <Descriptions.Item label="手机号">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="最后登录">{user.lastLoginAt}</Descriptions.Item>
          <Descriptions.Item label="状态">
            <Tag color={user.status === 'active' ? 'success' : 'default'}>
              {user.status === 'active' ? '启用' : '停用'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">{user.createdAt}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="名下设备">
        <Table<Device> rowKey="id" columns={deviceColumns} dataSource={devices} pagination={false} />
      </Card>

      <Card title="最近操作 OTA 任务">
        <Table<OtaPlan> rowKey="id" columns={otaColumns} dataSource={otaTasks} pagination={false} />
      </Card>
    </Space>
  )
})
