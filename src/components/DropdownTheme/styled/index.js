import styled from 'styled-components'
import { Dropdown } from 'react-bulma-components'

export const DropdownThemeWrapp = styled(Dropdown)`
  .dropdown-trigger {
    .button {
      border-color: transparent;
      background-color: ${(props) => props.value};
      border-radius: 0.25rem;
      &:hover,
      &:focus {
        background-color: ${(props) => props.value};
      }
    }
  }

  .dropdown-menu {
    left: auto;
    right: -0.5rem;
  }

  .dropdown-content {
    display: flex;
    justify-content: space-evenly;
  }

  .dropdown-item {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    cursor: pointer;
  }
`
