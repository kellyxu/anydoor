import { createContext } from 'react'
import { appStore } from './AppStore'

export const StoreContext = createContext(appStore)
