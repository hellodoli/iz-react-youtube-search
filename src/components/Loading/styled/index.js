import styled from 'styled-components';
import { keyframes } from 'styled-components';

const spinnerClip = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
`;

const spinnerCircle = keyframes`
    0% { transform: rotate(-180deg); }
    100% { transform: rotate(180deg); }
`;

export const Spinner = styled.div`

    display: block;
    font-size: ${props => props.size ? `${props.size}px` : '20px'};
    width: 1em;
    height: 1em;
    border-radius: 50%;
    box-shadow: inset 0 0 0 .1em var(--color-focus);
`;

export const SpinnerIRotate = styled.i`
    position: absolute;
    clip: rect(0,1em,1em,.5em);
    width: 1em;
    height: 1em;
    animation: ${spinnerClip} 1s ease-in-out infinite;

    &::after{
        content: '';
        position: absolute;
        clip: rect(0,1em,1em,.5em);
        width: 1em;
        height: 1em;
        border-radius: 50%;
        box-shadow: inset 0 0 0 .1em var(--color-primary-light);
        animation: ${spinnerCircle} 1s ease-in-out infinite;
    }
`;

export const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem 0;
`;