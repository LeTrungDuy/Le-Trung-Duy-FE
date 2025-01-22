import { useEffect, useRef, useState } from "react";
import Icon from "@/components/icon";
import "./index.css";

type DropdownProps = {
  options: string[];
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const Dropdown = ({
  options,
  label,
  value,
  placeholder,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const filteredOptions =
    searchTerm.trim() === ""
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(searchTerm.toLowerCase())
        );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <label className="dropdown-label">{label}</label>
      <div className="dropdown-content">
        <div className="dropdown-selected" onClick={toggleDropdown}>
          <span className="dropdown-selected-text">
            {options.find((option) => option === value)}
            <img
              src={`../../../public/icons/${value}.svg`}
              alt={value}
              className="dropdown-selected-icon"
            />
          </span>
          <div className={`dropdown-icon ${isOpen ? "open" : ""}`}>
            <Icon name="chevron-gray-down" />
          </div>
        </div>

        <ul className={`dropdown-options ${isOpen ? "open" : ""}`}>
          <li className="dropdown-option input">
            <input
              ref={inputRef}
              type="text"
              className="dropdown-search"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </li>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`dropdown-option ${
                  option === value ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
                <img
                  src={`../../../public/icons/${option}.svg`}
                  alt={value}
                  className="dropdown-selected-icon"
                />
              </li>
            ))
          ) : (
            <li className="dropdown-no-options">No options found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
