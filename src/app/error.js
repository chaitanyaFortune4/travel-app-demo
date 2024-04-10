"use client";

const ErrorBoundary = ({ error, reset }) => {
  return (
    <div>
      Error : {error.message}
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

export default ErrorBoundary;
