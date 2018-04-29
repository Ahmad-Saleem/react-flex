import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const FlexItem = ({order, grow, shrink, basis, align, width, height, tablet, mobile, children}) => { 
    const Item = styled.div`
    order: ${order};
    flex-grow: ${grow};  
    flex-shrink: ${shrink};
    flex-basis: ${basis}; // initial length
    align-self: ${align};
    flex: ${width};
    height: ${height};

    @media (max-width: 768px) {
        flex-basis: ${tablet};
    }

    @media (max-width: 440px) {
        flex-basis: ${mobile};
    }
    `;
    return(<Item className='flex-item'>{children}</Item>);
  
}

FlexItem.propTypes = {
    order: propTypes.number,
    grow: propTypes.number,
    shrink: propTypes.number,
    basis: propTypes.string,
    align: propTypes.string,
    width: propTypes.string,
    height: propTypes.string,
}
export default FlexItem;