import React from 'react';
import './text-input.css';

interface IProps {
  placeholder: string;
  style?: React.CSSProperties;
  className?: string;
  showSearch?: boolean;
  onSearch?: () => void;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput: React.FC<IProps> = ({ placeholder, style, className, showSearch, onSearch, value, onChange }) => {
  return (
    <div className={`text-input-container ${className}`} style={style}>
      <input className="text-input" placeholder={placeholder} value={value} onChange={onChange} />
      {showSearch && (
        <button type="button" className="text-input-icon-button" onClick={onSearch}><img alt="Search" src={require('../assets/search.svg')} /></button>
      )}
    </div>
  )
}

export default TextInput;
