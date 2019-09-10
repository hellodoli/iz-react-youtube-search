import styled from 'styled-components';

export const MainWrapp = styled.main`
    min-height: calc(100vh - 56px);
    margin-top: 56px;
    padding: 2.5rem 0;

    @media(max-width: 768px) {
        padding: 1.25rem 0;
    }
`;

export const MainWrappContainer = styled.div`

    .container{
        padding: 0 15px;

        @media screen and (min-width: 576px) and (max-width: 767px)  {
            max-width: 540px;
        }

        @media screen and (min-width: 768px) and (max-width: 991px){
            max-width: 720px;
        }

        @media screen and (min-width: 992px) and (max-width: 1023px){
            max-width: 960px;
        }
    }
`;
/* Some custom CSS */