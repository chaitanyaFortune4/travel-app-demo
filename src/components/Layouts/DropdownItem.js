"use client";
import { useState, useRef, useEffect } from "react";

const DropdownItem = ({ value = 1 }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="" ref={dropdownRef} style={{width:'100%', cursor:'pointer', position:'relative'}}>
      <div className="">
        <div onClick={toggleDropdown} className="">
          {value}
        </div>
      </div>
      {isOpen && (
        <div className="" style={{height:'5rem'}}>
          <button onClick={applyChanges} className="">
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
