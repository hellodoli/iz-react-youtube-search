import styled, { keyframes } from 'styled-components'

/*
	Parameter:
	- isDisabled: true || false
	- isLoading: true || false
	- color: 'primary' || 'secondary' || 'transparent'
	- isOutlined: true || false
*/
export const Button = styled.button.attrs(({ isDisabled, isLoading }) => ({
  className: `button${isLoading ? ' is-loading' : ''}`, // style from button.button (Bulma library)
  disabled: isDisabled && true,
}))`
  ${({ color = 'primary', isOutlined = false }) => `
    border-color: ${isOutlined ? `var(--color-${color})` : 'transparent'};
    background-color:
      ${
        isOutlined
          ? 'transparent'
          : color === 'transparent'
          ? 'transparent'
          : `var(--color-${color})`
      };
    color:
      ${
        isOutlined
          ? `var(--color-${color})`
          : color === 'transparent'
          ? 'currentColor'
          : '#fff' // default color text as button normal - đa số trường hợp màu là đúng
      };
  `};

  &[disabled] {
    color: currentColor;
  }

  &[disabled]:hover {
    color: currentColor;
    background-color: #fff;
    border-color: #dbdbdb;
    box-shadow: none;
    opacity: 0.5;
  }

  &:hover,
  &:focus {
    ${({ color = 'primary', isOutlined = false }) => `
      border-color: ${isOutlined ? `var(--color-${color})` : 'transparent'};
      background-color: ${
        isOutlined
          ? `var(--color-${color})`
          : color === 'primary'
          ? 'var(--color-primary-dark)' // primary color hover is darker color
          : color === 'secondary'
          ? 'var(--color-primary)' // secondary color hover is primary color
          : 'transparent' // transparent color hover is transparent
      };
      color: ${color === 'transparent' ? 'currentColor' : '#fff'};
    `}
  }

  ${({ isRipple }) => `
		position: relative;
		overflow: hidden;
    transform: translate3d(0,0,0);
	`}
`

const ripple = keyframes`
	100% {
		opacity: 0;
		transform: scale(2.5);
	}
`

export const Ink = styled.span`
  display: block;
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  transform: scale(0);
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;

  &.animate {
    animation: ${ripple} 0.5s linear;
  }
`
