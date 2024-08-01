import React, { KeyboardEvent, useState } from "react";

interface LabelledInputType {
  label: string;
  id: string;
  type?: "text" | "number" | "checkbox";
  placeholder?: string;
  value?: string | number;
  className?: string;
  ref?: HTMLDivElement;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function LabelledInput({
  label,
  id,
  type = "text",
  placeholder = "",
  value = "",
  className = "",
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
}: LabelledInputType) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur(event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="text-xs font-bold text-primaryText">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`rounded-full border px-3 py-2 text-xs font-medium outline-none transition-colors duration-300 ease-in-out placeholder:text-xs placeholder:font-bold ${isFocused ? "border-accentColor" : "border-secondaryBorder"} hover:border-accentColor ${className} `}
      />
    </div>
  );
}
