import React, {useEffect} from 'react'
import Alert from '@mui/material/Alert'
import PropTypes from "prop-types";

/**
 * The `AlertNotification` component renders a alert notification with a provided message and a importance level
 *
 * @param {string} message - The message to be shown in the alert notification
 * @param {string} severity - The importance level for the notification (warning, error, info)
 *
 * @returns {JSX.Element} The JSX code for rendering the AlertNotification component.
 */
const AlertNotification = ({ message, severity }) => {

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }, []);

  return (
    <Alert severity={severity} sx={{marginBottom:2}}>
        {message}
    </Alert>
  );
}

AlertNotification.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.string,
}

export default AlertNotification