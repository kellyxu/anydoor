import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import App from './App'
import './index.css'
import { AppStoreProvider } from './store/AppStoreProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
        },
      }}
    >
      <AppStoreProvider>
        <App />
      </AppStoreProvider>
    </ConfigProvider>
  </StrictMode>,
)
