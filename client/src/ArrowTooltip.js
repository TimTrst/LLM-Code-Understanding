import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from "prop-types";

const ArrowTooltipComponent = ({title,placement, children}) => {
    return (
        <Tooltip title={title} placement={placement} arrow>
            {children}
        </Tooltip>
    )
}

ArrowTooltipComponent.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    placement: PropTypes.string,
}

export default ArrowTooltipComponent
