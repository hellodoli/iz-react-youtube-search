import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Muli:400,600,700&display=swap');

	:root {
		${ ({ theme }) => `
			--color-header: ${theme.header};
			--color-background: ${theme.background};
			--color-main-title: ${theme.mainTitle};
			--color-text: ${theme.text};
		`}

		${ ({ themeColor }) => `
			--color-primary: ${themeColor.primaryLight};
			--color-primary-dark: ${themeColor.primaryDark};
			--color-secondary: ${themeColor.secondary};
		`}

		--default-font-size: 1rem;
		--default-line-height: 1.5;

		--font-family-title: 'Montserrat', sans-serif;
		--font-family-text: 'Muli', sans-serif;
		--font-weight-normal: 400;
		--font-weight-semi-bold: 600;
		--font-weight-bold: 700;
	}

	html {
		font-size: 100%;
	}

	body {
		font-family: var(--font-family-text);
		font-size: var(--default-font-size);
		font-weight: var(--font-weight-normal);
		color: var(--color-text);
		background: var(--color-background);
		line-height: var(--default-line-height);
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		overflow-x: hidden;
		padding: 0;
		margin: 0;
	}

	/* Custom Bulma Framework */
	/* Button */
	/* .iz-root .button {
		background-color: var(--color-primary-light);
		border-color: transparent;
		color: #fff;
	}

	.iz-root .button:hover,
	.iz-root .button:focus {
		background-color: var(--color-primary-dark);
		border-color: transparent;
		color: #fff;
	}

	.iz-root .button.is-outlined {
		background-color: transparent;
		border-color: var(--color-primary-light);
		color: var(--color-primary-light);
	}

	.iz-root .button.is-outlined:hover,
	.iz-root .button.is-outlined:focus {
		background-color: transparent;
		border-color: var(--color-primary-light);
		color: var(--color-primary-light);
	} */
`;

export default GlobalStyle;
