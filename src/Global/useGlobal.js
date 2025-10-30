import { createContext, useContext } from 'react'

// Global context (non-component exports only in this file)
export const GlobalContext = createContext()

// Custom hook to consume the context
export function useGlobal() {
  return useContext(GlobalContext)
}
