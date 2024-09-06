import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from "prop-types";

/**
 * The `ArrowTooltipComponent` component renders a alert notification with a provided message and a importance level
 *
 * @param {string} title - The tooltip message to be displayed
 * @param {string} placement - The tooltip placement relative to the title
 * @param {node} children - The children that this component surrounds
 *
 * @returns {JSX.Element} The JSX code for rendering the ArrowTooltipComponent component.
 */
const ArrowTooltipComponent = ({title, placement, children}) => {
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
