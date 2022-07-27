import React from 'react';
import error from './piffle-error.gif';
import './error-message.scss';

function ErrorMessage() {
  return <img alt="Error" src={error} />;
}

export default ErrorMessage;
