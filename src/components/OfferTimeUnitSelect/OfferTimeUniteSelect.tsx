import React, { useState } from "react";

interface OfferTimeUnitSelectProps {
  onSelectTimeUnit: (selectedTimeUnit: number) => void;
}

export const OfferTimeUnitSelect: React.FC<OfferTimeUnitSelectProps> = ({ onSelectTimeUnit }) => {
  const [selectedTimeUnit, setSelectedTimeUnit] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (timeUnit: string, value: number) => {
    setSelectedTimeUnit(timeUnit);
    onSelectTimeUnit(value);
    setIsOpen(false);
  };

  const timeUnits = [
    { name: "Hour", value: 0 },
    { name: "Day", value: 1 },
    { name: "Week", value: 2 },
    { name: "Month", value: 3 },
    { name: "Year", value: 4 },
    { name: "Service", value: 5 },
  ];

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex w-full justify-between rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {selectedTimeUnit ? selectedTimeUnit : "Select time unit..."}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {timeUnits.map((timeUnit) => (
              <button
                key={timeUnit.name}
                onClick={() => handleSelect(timeUnit.name, timeUnit.value)}
                className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                {timeUnit.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
