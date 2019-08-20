import React from 'react';

export const themesColor = {
    default: {
        primaryLight: '#00d1b2',
        primaryDark: '#00c4a7'
    },
    green: {
        primaryLight: 'hsl(160, 79%, 46%)',
        primaryDark: 'hsl(160, 79%, 16%)'
    },
    blue: {
        primaryLight: 'hsl(200, 79%, 46%)',
        primaryDark: 'hsl(200, 79%, 16%)'
    }
}

export const themes = {
    light: {
        background: '#ffffff',
        mainTitle: '#0a0a0a',
        text: '#606060',
        header: '#ffffff'
    },
    dark: {
        background: '#121212',
        mainTitle: '#ffffff',
        text: '#aaaaaa',
        header: '#272727'
    }
}

export const SkinContext = React.createContext({
    themeColor: themesColor.default,
    theme: themes.light,
    toggleTheme: () => {}
});