import { Button, Card, Input, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../hooks/useAppStore'
import type { Device } from '../../types/models'

export const DeviceManagementPage = observer(() => {
  const { devices } = useAppStore()
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const filteredDevices = useMemo(
    () =>
      devices.filter((item) =>
        [item.name, item.serialNumber, item.model].join(' ').toLowerCase().includes(keyword.toLowerCase()),
      ),
    [devices, keyword],
  )

  const columns: ColumnsType<Device> = [
    { title: '设备名称', dataIndex: 'name' },
    { title: '序列号', dataIndex: 'serialNumber' },
    { title: '型号', dataIndex: 'model' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value: Device['status']) => {
        const colorMap = { online: 'green', offline: 'red', warning: 'orange' } as const
        const textMap = { online: '在线', offline: '离线', warning: '预警' } as const
        return <Tag color={colorMap[value]}>{textMap[value]}</Tag>
      },
    },
    {
      title: '最后上报',
      dataIndex: 'lastSeenAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/devices/${record.id}`)}>
            查看详情
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Card
      title="设备管理"
      extra={
        <Input.Search
          placeholder="按设备名/序列号/型号搜索"
          allowClear
          onSearch={setKeyword}
          onChange={(event) => setKeyword(event.target.value)}
          style={{ width: 280 }}
        />
      }
    >
      <Table<Device> rowKey="id" columns={columns} dataSource={filteredDevices} pagination={{ pageSize: 6 }} />
    </Card>
  )
})
