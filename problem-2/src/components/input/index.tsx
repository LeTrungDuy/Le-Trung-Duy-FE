import { ReactNode } from "react";
import "./index.css";

type InputProps = {
  placeholder?: string;
  value: string;
  icon?: ReactNode;
  size?: "small" | "large";
  type?: string;
  onChange: (value: string) => void;
};

export default function Input({
  placeholder,
  value,
  icon,
  size = "large",
  type = "text",
  onChange,
}: InputProps) {
  return (
    <div className={`input-container ${size}`}>
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
