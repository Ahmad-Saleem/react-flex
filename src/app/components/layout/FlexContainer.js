import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const FlexContainer = ({dir, wrap, align, children}) => {
    const FlexBox = styled.div`
        display: flex !important;
        flex-direction: ${dir};
        flex-wrap: ${wrap};
        justify-content: ${align};
        align-items: ${align};
        align-content: ${align};
    `;
    return(<FlexBox className='flex-container'>{children}</FlexBox>);
}

export default FlexContainer;