import styled from 'styled-components';

// style from button.button
export const IZButton = styled.button.attrs(({ isDisabled }) => ({ 
  className: 'button',
  disabled: isDisabled && true
}))`
  ${ ({ color = 'primary', isOutlined = false }) => `
    border-color: ${ isOutlined ? `var(--color-${color})` : 'transparent' };
    background-color:
      ${ isOutlined
          ? 'transparent'
          : color === 'transparent'
            ? 'transparent'
            : `var(--color-${color})`
      };
    color:
      ${ isOutlined
          ? `var(--color-${color})`
          : '#fff' // default color text as button normal - đa số trường hợp màu là đúng
      };
  `}

  &[disabled] {
    color: currentColor;
  }

  &[disabled]:hover {
    color: currentColor;
    background-color: #fff;
    border-color: #dbdbdb;
    box-shadow: none;
    opacity: .5;
  }

  &:hover,
  &:focus {
    ${ ({ color = 'primary', isOutlined = false }) => `
      border-color: ${ isOutlined ? `var(--color-${color})` : 'transparent' };
      background-color: ${
        isOutlined
          ? `var(--color-${color})`
          : color === 'primary'
            ? 'var(--color-primary-dark)' // primary color hover is darker color
            : color === 'secondary'
              ? 'var(--color-primary)' // secondary color hover is primary color
              : 'transparent' // transparent color hover is transparent
      };
      color: #fff;
    `}
  }
`;
