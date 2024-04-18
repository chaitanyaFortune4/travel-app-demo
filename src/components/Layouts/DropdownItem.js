"use client";
import { useState, useRef, useEffect } from "react";

const DropdownItem = ({ value = 1 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef(null);

  // Function to handle click outside dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Effect to add click event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const applyChanges = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="w-full  border border-gray-300 rounded-md">
        <div
          onClick={toggleDropdown}
          className="w-full  rounded-md px-4 py-2 text-left"
        >
          {value}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
          <button
            onClick={applyChanges}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
