import "./index.css";

type InputProps = {
  placeholder?: string;
  value: string;
  size?: "small" | "large";
  type?: string;
  onChange: (value: string) => void;
};

export default function Input({
  placeholder,
  value,
  size = "large",
  type = "text",
  onChange,
}: InputProps) {
  return (
    <div className={`input-container ${size}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
