import React from 'react';

import { 
    Spinner,
    SpinnerIRotate,
    SpinnerContainer
} from './styled';

export const SpinnerCircle = ({ size, colorParent, colorChild }) => {
    return(
        <SpinnerContainer>
            <Spinner size={size} colorParent={colorParent} colorChild={colorChild}>
                <SpinnerIRotate></SpinnerIRotate>
            </Spinner>
        </SpinnerContainer>
    );
}