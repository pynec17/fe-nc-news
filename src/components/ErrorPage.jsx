import React from 'react';

const ErrorPage = (props) => {
  return (
    <div>
      <h1>ERROR</h1>
      <p> The URL you have entered is invalid </p>
      <p>{props.message}</p>
    </div>
  );
};

export default ErrorPage;