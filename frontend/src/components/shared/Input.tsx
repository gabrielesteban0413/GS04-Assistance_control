import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, required, ...props }) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={props.id || props.name}>
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input className={`input-field ${error ? 'input-error' : ''}`} {...props} />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;