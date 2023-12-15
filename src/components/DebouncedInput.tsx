import { useState, useEffect } from 'react';
import { useDebounce } from '@/hook/useDebounce';
import SearchIcon from '@/assets/icons/SearchIcon';
export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue || '');
  const debouncedInput = useDebounce(value, 1000); // Debounce with a 1000ms delay

  useEffect(() => {
    // This effect will run when debouncedInput changes
    onChange(debouncedInput)
  }, [debouncedInput]);

  return (
    <div className="pt-2 relative mr-auto text-gray-600">
      <button type="submit" className="absolute left-0 top-0 mt-5 ml-4">
        <SearchIcon />
      </button>
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pl-10 rounded-lg  text-sm focus:outline-none"
        type="search"
        name="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
       
        }}
        placeholder="Search"
        {...props}
      />
    </div>
  );
};
