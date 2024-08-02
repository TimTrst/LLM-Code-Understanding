import React, {useEffect} from 'react'
import Alert from '@mui/material/Alert'
import PropTypes from "prop-types";

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