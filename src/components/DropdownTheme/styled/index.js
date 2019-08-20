import styled from 'styled-components';

import { 
    Dropdown
} from 'react-bulma-components';

export const Dropdown = () => (
    <Dropdown>
        <Dropdown.Item value="item">Dropdown item</Dropdown.Item>
        <Dropdown.Item value="other">Other Dropdown item</Dropdown.Item>
        <Dropdown.Item value="active">Active Dropdown item</Dropdown.Item>
        <Dropdown.Item value="other 2">Other Dropdown item</Dropdown.Item>
    </Dropdown>
);

