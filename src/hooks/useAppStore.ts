import { useContext } from 'react'
import { StoreContext } from '../store/StoreContext'

export function useAppStore() {
  return useContext(StoreContext)
}
