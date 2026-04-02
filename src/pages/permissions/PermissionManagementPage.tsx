import { observer } from 'mobx-react-lite'
import { Card, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useAppStore } from '../../hooks/useAppStore'
import type { Permission } from '../../types/models'

const columns: ColumnsType<Permission> = [
  {
    title: '权限名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '权限编码',
    dataIndex: 'code',
    key: 'code',
    render: (value: string) => <Typography.Text code>{value}</Typography.Text>,
  },
  {
    title: '资源',
    dataIndex: 'resource',
    key: 'resource',
    render: (value: string) => <Tag color="purple">{value}</Tag>,
  },
  {
    title: '动作',
    dataIndex: 'action',
    key: 'action',
    render: (value: string) => <Tag color="blue">{value}</Tag>,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
]

export const PermissionManagementPage = observer(() => {
  const { permissions } = useAppStore()

  return (
    <Card title="权限管理">
      <Table<Permission>
        rowKey="id"
        columns={columns}
        dataSource={permissions}
        pagination={{ pageSize: 8 }}
      />
    </Card>
  )
})
