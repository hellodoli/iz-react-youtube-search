import React from 'react'

/* Skin themes */
export const themesColor = {
  default: {
    primaryLight: '#ee3364',
    primaryDark: '#c4103f',
    secondary: '#00bec5',
  },
  test: {
    primaryLight: '#333',
    primaryDark: '#444',
    secondary: 'green',
  },
}

/* Light/Dark themes */
export const themes = {
  light: {
    header: '#ffffff',
    text: '#606060',
    mainTitle: '#0a0a0a',
    background: '#ffffff',
  },
  dark: {
    header: '#272727',
    text: '#aaaaaa',
    mainTitle: '#ffffff',
    background: '#121212',
  },
}

export const SkinContext = React.createContext({
  themeColor: themesColor.default,
  theme: themes.light,
  toggleTheme: () => {},
  changeThemeColor: () => {},
})
