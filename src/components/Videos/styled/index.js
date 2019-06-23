import styled from 'styled-components';

export const VideoThumbWrapp = styled.div `
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    & + & {
        margin-top: ${ props => props.isVideoSearchThumb ? '.5rem' : '1rem' }
    }
`;

export const VideoThumbImage = styled.div `
    width: 40%;
    margin-right: .5rem;
    & img {
        max-width: 100%;
        height: auto;
    }
`;

export const VideoThumbContent = styled.div `
    width: 60%;
    display: flex;
    flex-direction: column;

    & h3 {
        font-size: .875rem;
        font-weight: 500;
        line-height: 1rem;
        margin-bottom: .25rem;
        color: #0a0a0a;
    }

    & p {
        font-size: .8125rem;
        font-weight: 400;
        line-height: 1.125rem;
        color: #606060;
    }
`;