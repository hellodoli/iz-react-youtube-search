import styled from "styled-components";

export const FilterWrapper = styled.div`
  border-bottom: 1px solid #0000001a;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const FilterButtonWrapp = styled.div`
  display: inline-flex;
  margin-bottom: 1.25rem;
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

export const FilterSectInner = styled.div`
  padding-top: 0.625rem;
  padding-bottom: 2rem;
`;

export const SectWrapp = styled.div``;

export const SectTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.007px;
  text-transform: uppercase;
  padding-bottom: 0.9375rem;
  border-bottom: 1px solid #0000001a;
`;

export const SectBody = styled.div`
  padding: 0.9375rem 0;
`;

export const SectItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 0.625rem;
  }

  .close {
    margin-left: 1rem;
    background-color: #4a4a4a;
    display: none;
  }

  /* Ignore */
  ${({ isIgnore }) =>
    isIgnore &&
    `
    span {
      font-weight: 300;
      color: ${({ theme, themes }) =>
        theme.background === themes.light.background ? `#b5b5b5` : `#171717`}
    }
  `};

  /* Active */
  ${({ isActive }) =>
    isActive &&
    `
    span { font-weight: 700; }
    .close { display: block; }
  `};
`;
