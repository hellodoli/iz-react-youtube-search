import styled from 'styled-components';

import { Dropdown } from 'react-bulma-components';

export const DropdownThemeWrapp = styled(Dropdown)`

    .dropdown-trigger{
        .button{
            background: ${ props => props.value };
            border-radius: .25rem;
            &:hover, &:focus{
                background: ${ props => props.value };
            }
        }
    }

    .dropdown-menu{
        left: auto;
        right: -.5rem;
    }

    .dropdown-content{
        display: flex;
        justify-content: space-evenly;
    }

    .dropdown-item{
        display: inline-block;
        width: 2rem;
        height: 2rem;
        border-radius: .25rem;
        cursor: pointer;
    }
`;