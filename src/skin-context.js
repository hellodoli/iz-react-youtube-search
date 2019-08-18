import React from 'react';

export const themes = {
    main: {
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
    theme: themes.main,
    toggleTheme: () => {}
});