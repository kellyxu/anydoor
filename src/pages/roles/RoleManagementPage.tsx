import { Card, Col, Row, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { observer } from 'mobx-react-lite'
import { useAppStore } from '../../hooks/useAppStore'
import type { Role } from '../../types/models'

const columns: ColumnsType<Role> = [
  {
    title: '角色名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '权限',
    dataIndex: 'permissionIds',
    key: 'permissionIds',
    render: (permissionIds: string[]) => (
      <Space wrap>
        {permissionIds.map((id) => (
          <Tag key={id}>{id}</Tag>
        ))}
      </Space>
    ),
  },
]

export const RoleManagementPage = observer(() => {
  const { roles } = useAppStore()
  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        角色管理
      </Typography.Title>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Card>
            <Typography.Text type="secondary">角色总数</Typography.Text>
            <Typography.Title level={2} style={{ margin: 0 }}>
              {roles.length}
            </Typography.Title>
          </Card>
        </Col>
      </Row>
      <Card>
        <Table<Role> rowKey="id" columns={columns} dataSource={roles} pagination={false} />
      </Card>
    </Space>
  )
})
