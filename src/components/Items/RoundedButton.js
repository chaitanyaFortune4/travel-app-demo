"use client";
const RoundedButton = ({ onClick, children, disabled }) => {
  return (
    <button className="roundedButton" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default RoundedButton;
