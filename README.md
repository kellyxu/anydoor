# IoT Admin 前端项目（React + TS + MobX + Ant Design）

基于 Vite 构建的后台管理系统骨架，已覆盖以下模块：

- 数据仪表盘
- 用户管理 / 用户详情
- 角色管理
- 权限管理
- 设备管理 / 设备详情
- OTA 设置 / OTA 详情

## 技术栈

- React 19
- TypeScript
- MobX + mobx-react-lite
- Ant Design
- React Router
- Vite

## 本地运行

```bash
npm install
npm run dev
```

打开浏览器访问：`http://localhost:5173`

## 构建与校验

```bash
npm run lint
npm run build
```

## 目录结构（简化）

```text
src/
  hooks/
  layout/
  mock/
  pages/
    dashboard/
    users/
    roles/
    permissions/
    devices/
    ota/
  store/
  types/
```

## 说明

当前版本使用 `src/mock/data.ts` 提供 Mock 数据。  
后续如需对接真实后端，可在现有页面和 store 基础上接入 API 请求层。  
