import React from 'react';

export const themesColor = {
    default: {
        primaryLight: '#00d1b2',
        primaryDark: '#00c4a7',
        focus: 'rgba(0, 209, 178, .2)'
    },
    green: {
        primaryLight: 'hsl(160, 79%, 46%)',
        primaryDark: 'hsl(160, 79%, 16%)',
        focus: 'rgba(0, 209, 178, .2)'
    },
    blue: {
        primaryLight: 'hsl(200, 79%, 46%)',
        primaryDark: 'hsl(200, 79%, 16%)',
        focus: 'rgba(25, 210, 148, 0.2)'
    },
    pink: {
        primaryLight: '#F7A1C4',
        primaryDark: '#CB84A1',
        focus: 'rgba(247, 161, 196, 0.2)'
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
    toggleTheme: () => {},
    changeThemeColor: () => {}
});