import { useId } from 'react';

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  autoComplete,
  placeholder,
  disabled = false,
}) {
  const id = useId();

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        required
      />
    </div>
  );
}
