import styled from 'styled-components';

export const HeaderWrapp = styled.div`
    position: fixed;
    height: 56px;
    padding: 0 16px;
    top: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 4px 8px -3px rgba(17, 17, 17, .06);
    transform: translateY(0);
    transition: transform 0.3s ease;
`;

export const HeaderWrappInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

export const HeaderWrappForSearch = styled.div`
    width: 60%;
`