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
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        max-height: 3.2rem;

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

export const VideoIframe = styled.iframe`
    width: 100%;
    height: 450px;
`;

export const VideoInfoWrapper = styled.div`
    margin-top: 1.25rem;
`;

export const VideoDes = styled.h2`
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 2.4rem;
    color: rgb(13,13,13);
`;