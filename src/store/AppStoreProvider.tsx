import type { PropsWithChildren } from 'react'
import { StoreContext } from './StoreContext'
import { appStore } from './AppStore'

export function AppStoreProvider({ children }: PropsWithChildren) {
  return <StoreContext.Provider value={appStore}>{children}</StoreContext.Provider>
}
