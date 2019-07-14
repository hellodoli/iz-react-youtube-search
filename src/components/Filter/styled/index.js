import styled from 'styled-components';

export const FilterButtonWrapp = styled.div`
    display: inline-flex;
    margin-bottom: 2rem;
`;

export const FilterSectInner = styled.div`
    padding: .625rem 0;
`;

export const SectWrapp = styled.div`

`;

export const SectTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: .007px;
    text-transform: uppercase;
    padding-bottom: .9375rem;
    border-bottom: 1px solid #0000001a;
`;

export const SectBody = styled.div`
    padding: .9375rem 0;
`;

export const SectItem = styled.div`
    display: flex;

    &:not(:last-child) {
        margin-bottom: .625rem;
    }

    &.active {
        & > .text{
            font-weight: 700;
        }
    }

    & > .text{
        cursor: pointer;
    }
`;   