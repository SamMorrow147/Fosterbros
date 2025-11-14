'use client'
import { useEffect, useRef } from 'react'

export default function FilterDropdown({ 
  label, 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select...',
  name 
}) {
  const selectRef = useRef(null);
  const niceSelectInstance = useRef(null);

  useEffect(() => {
    // Clean up previous instance
    if (niceSelectInstance.current && niceSelectInstance.current.destroy) {
      try {
        niceSelectInstance.current.destroy();
        niceSelectInstance.current = null;
      } catch (e) {
        // Ignore errors
      }
    }

    // Initialize nice-select if available
    if (typeof window !== 'undefined' && window.NiceSelect && selectRef.current) {
      try {
        niceSelectInstance.current = new window.NiceSelect(selectRef.current, {
          searchable: options.length > 10
        });
      } catch (e) {
        // Fallback to native select
        console.log('Nice-select not available, using native select');
      }
    }

    return () => {
      if (niceSelectInstance.current && niceSelectInstance.current.destroy) {
        try {
          niceSelectInstance.current.destroy();
          niceSelectInstance.current = null;
        } catch (e) {
          // Ignore errors
        }
      }
    };
  }, [options.length]);

  return (
    <div className="form-group">
      {label && <label className="body-2">{label}</label>}
      <div className="group-select">
        <select
          ref={selectRef}
          className="nice-select"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          name={name}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => {
            // Handle both string arrays and object arrays
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            
            return (
              <option key={index} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}


