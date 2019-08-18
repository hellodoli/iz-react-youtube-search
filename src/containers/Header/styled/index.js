import styled from 'styled-components';

export const HeaderWrapp = styled.div`
    position: fixed;
    height: 56px;
    top: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.header };
    box-shadow: 0px 4px 8px -3px rgba(17, 17, 17, .06);
    transform: translateY(0);
    transition: transform 0.3s ease;
    z-index: 9999;

    & > .container{
        height: 100%;
    }
`;

export const HeaderWrappInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    .btn-adjust {
        margin-left: .5rem;
        .icons{
            display: none;
        }
        @media(max-width: 768px){
            .text{ display: none; }
            .icons{ display: block; }
        }
    }
`;

export const HeaderWrappForSearch = styled.div`
    width: 100%;
    @media(min-width: 1024px) {
        width: 60%;
    }
`