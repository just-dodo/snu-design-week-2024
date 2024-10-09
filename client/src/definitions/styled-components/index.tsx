'use client'
export * from './common'
export * from './dark'
export * from './light'

import React from 'react'
import { ThemeProvider } from 'styled-components'

import { dark } from './dark'
import { light } from './light'

export const ThemeContext = React.createContext({
  theme: 'light',
  toggle: () => undefined,
})

export const useTheme = () => {
  const { theme, toggle } = React.useContext(ThemeContext)

  return { theme: theme === 'light' ? light : dark, toggle, themeName: theme }
}

interface Props {
  children: React.ReactNode
}

export const StyledThemeProvider: React.FC<Props> = ({ children }: Props) => {
  const [theme, setTheme] = React.useState('light')

  const toggle = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
  }
  const values = React.useMemo(
    () => ({
      theme,
      toggle,
    }),
    [toggle, theme],
  )

  return (
    // @ts-ignore
    <ThemeContext.Provider value={values}>
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        {/* @ts-ignore */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
