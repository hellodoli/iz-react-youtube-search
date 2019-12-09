import styled from 'styled-components';

export const FilterWrapper = styled.div`
  border-bottom: 1px solid #0000001a;
  margin-bottom: 2rem;
  @media(max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const FilterButtonWrapp = styled.div`
  display: inline-flex;
  margin-bottom: 1.25rem;
  @media(max-width: 768px) {
    margin-bottom: .5rem;
  }
`;

export const FilterSectInner = styled.div`
  padding-top: .625rem;
  padding-bottom: 2rem;
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

  & > div {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }

  .close {
    margin-left: 1rem;
    background-color: #4a4a4a;
    display: none;
  }

  &.ignore {
    span{
      font-weight: 300;
      color: #b5b5b5;
    }
  }

  &.active {
    span {
      font-weight: 700;
    }
    .close {
      display: block;
    }
  }
`;