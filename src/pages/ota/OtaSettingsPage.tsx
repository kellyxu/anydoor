import { observer } from 'mobx-react-lite'
import { Button, Card, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../hooks/useAppStore'
import type { OtaPlan } from '../../types/models'

const columns: ColumnsType<OtaPlan> = [
  {
    title: '任务名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '版本',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: OtaPlan['status']) => {
      const colorMap: Record<OtaPlan['status'], string> = {
        draft: 'default',
        publishing: 'processing',
        finished: 'success',
      }
      return <Tag color={colorMap[status]}>{status}</Tag>
    },
  },
  {
    title: '目标设备',
    dataIndex: 'targetDeviceCount',
    key: 'targetDeviceCount',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space>
        <Button type="link">
          <Link to={`/ota/${record.id}`}>查看详情</Link>
        </Button>
      </Space>
    ),
  },
]

export const OtaSettingsPage = observer(() => {
  const { otaList } = useAppStore()

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        OTA 设置
      </Typography.Title>
      <Card>
        <Table<OtaPlan>
          rowKey="id"
          columns={columns}
          dataSource={otaList}
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </Space>
  )
})
