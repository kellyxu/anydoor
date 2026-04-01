import { Button, Card, Form, Input, message, Space, Typography } from 'antd'
import type { FormProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../hooks/useAppStore'
import './LoginPage.css'

type LoginFormValues = {
  username: string
  password: string
}

export const LoginPage = observer(() => {
  const navigate = useNavigate()
  const appStore = useAppStore()

  const onFinish: FormProps<LoginFormValues>['onFinish'] = (values) => {
    const success = appStore.login(values.username, values.password)
    if (!success) {
      message.error('用户名或密码错误（示例账号：邮箱 + 123456）')
      return
    }
    message.success('登录成功')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="login-page">
      <Card className="login-card">
        <Space direction="vertical" size={20} style={{ width: '100%' }}>
          <div>
            <img className="login-logo" src="/tongyu-logo.svg" alt="瞳宇后台管理系统" />
            <Typography.Title level={3} style={{ marginBottom: 8 }}>
              瞳宇后台管理系统登录
            </Typography.Title>
            <Typography.Text type="secondary">
              示例账号：zhang.chen@example.com / li.wei@example.com，密码：123456
            </Typography.Text>
          </div>
          <Form<LoginFormValues> layout="vertical" onFinish={onFinish} autoComplete="off">
            <Form.Item
              label="用户名（邮箱）"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form>
        </Space>
      </Card>
    </div>
  )
})
