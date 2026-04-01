import { observer } from 'mobx-react-lite'
import { Button, Card, Input, Space, Table, Tag, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../hooks/useAppStore'
import type { User } from '../../types/models'

export const UserManagementPage = observer(() => {
  const navigate = useNavigate()
  const { filteredUsers, roleMap } = useAppStore()

  const dataSource = useMemo(
    () =>
      filteredUsers.map((user) => ({
        ...user,
        key: user.id,
      })),
    [filteredUsers],
  )

  const columns: ColumnsType<User & { key: string }> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      key: 'role',
      render: (roleId: string) => <Tag color="blue">{roleMap.get(roleId)?.name ?? roleId}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) =>
        status === 'active' ? (
          <Tag color="success">启用</Tag>
        ) : (
          <Tag color="default">停用</Tag>
        ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`/users/${record.id}`)}>
          查看详情
        </Button>
      ),
    },
  ]

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        用户管理
      </Typography.Title>
      <Card>
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <Input.Search allowClear placeholder="搜索（示例骨架，待接接口）" />
          <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 8 }} />
        </Space>
      </Card>
    </Space>
  )
})
