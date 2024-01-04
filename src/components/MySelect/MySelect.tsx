import React, { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: number;
}

interface MySelectProps {
  options: Option[];
  onChange: (value: number, userId: number) => void;
  placeholder: string;
  userId: number;
}

const MySelect: React.FC<MySelectProps> = ({ options, onChange, placeholder, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: number) => {
    onChange(value, userId);
    setSelectedOption(options.find((opt) => opt.value === value)?.label || placeholder);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div
        onClick={handleToggle}
        className="block w-full px-4 py-2 text-base border border-gray-300 rounded-md cursor-pointer relative"
      >
        {selectedOption}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className={`w-5 h-5 text-gray-700 ${isOpen ? "transform rotate-180" : ""}`}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul
          className="absolute left-0 w-60 p-2 border border-gray-300 rounded-md my-select-options"
          style={{
            background: "white",
            opacity: 1,
            zIndex: 50,
          }}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MySelect;
