import React, { useState } from 'react';
import FilterSearch from './FilterSearch';
import BlackCheckbox from './BlackCheckbox';

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(props.isFirstOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='accordion' style={{ width: '256px', overflow: 'hidden' }}>
      <div
        className='accordion-header'
        onClick={toggleAccordion}
        style={{
          cursor: 'pointer',
          height: '48px',
          transition: 'height 0.3s ease-in-out',
          background: 'white',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className='accordion-top'>
          <p>{props.name}</p>
          <p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease-in-out' }}
            >
              <path
                d="M16.59 8.29498L12 12.875L7.41 8.29498L6 9.70498L12 15.705L18 9.70498L16.59 8.29498Z"
                fill="black"
              />
            </svg>
          </p>
        </div>
      </div>
      <div className='accordion-content' style={{ padding: isOpen ? "16px 0px" : "0px", height: isOpen ? 'calc(300px - 48px)' : '0', overflow: 'hidden', transition: 'all 0.3s ease-in-out' }}>
        {props.name === "Brand" && (
          <>
            <FilterSearch handle={props.handleSearch} />
            <div className="accordion-brands-container">
              <BlackCheckbox name="Apple" count={props.Apple} onChange={() => props.onCheckboxChange("Apple")} />
              <BlackCheckbox name="Samsung" count={props.Samsung} onChange={() => props.onCheckboxChange("Samsung")} />
              <BlackCheckbox name="Xiaomi" count={props.Xiaomi} onChange={() => props.onCheckboxChange("Xiaomi")} />
              <BlackCheckbox name="Poco" count={props.Poco} onChange={() => props.onCheckboxChange("Poco")} />
              <BlackCheckbox name="Realme" count={props.Realme} onChange={() => props.onCheckboxChange("Realme")} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Accordion;