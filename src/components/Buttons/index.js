import styled from 'styled-components';

// style from button.button
export const IZButton = styled.button.attrs(() => ({ className: 'button' }))`
  /* #fff: default color text as button normal - đa số trường hợp màu là đúng */
  ${ ({ color = 'primary', isOutlined = false }) => `
    border-color: ${ isOutlined ? `var(--color-${color})` : 'transparent' };
    background-color: ${ isOutlined ? 'transparent' : `var(--color-${color})` };
    color: ${ isOutlined ? `var(--color-${color})` : '#fff' };
  `}

  &:hover,
  &:focus {
    ${ ({ color = 'primary', isOutlined = false }) => `
      border-color: ${ isOutlined ? `var(--color-${color})` : 'transparent' };
      background-color: ${
        isOutlined
          ? `var(--color-${color})`
          : color === 'primary'
            ? 'var(--color-primary-dark)' // primary color hover is darker
            : 'var(--color-primary)' // secondary color hover is primary color
      };
      color: #fff;
    `}
  }
`;