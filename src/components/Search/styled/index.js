import styled from 'styled-components';
import { 
    Button,
    Form
} from 'react-bulma-components';


export const SearchInput = styled(Form.Input)`
    border-top-right-radius: 0!important;
    border-bottom-right-radius: 0!important;
`;

export const SearchWrapp = styled(Form.Control)`
    display: flex;
`;

export const SearchButton = styled(Button)`
    border-top-left-radius: 0!important;
    border-bottom-left-radius: 0!important;
`;
