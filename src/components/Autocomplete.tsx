import React, { useState, useRef, useEffect } from 'react';

interface AutocompleteProps<T> {
    data: T[];
    onSelect: (item: T | null) => void;
    getDisplayValue: (item: T) => string;
    placeholder?: string;
    maxResults?: number;
}

const Autocomplete =
    <T extends { id: number | string }>({
         data,
         onSelect,
         getDisplayValue,
         placeholder = "Vyhledat",
         maxResults = 10
     }: AutocompleteProps<T>) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState<T[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const filtered = data.filter(item =>
            getDisplayValue(item).toLowerCase().includes(value.toLowerCase())
        ).slice(0, maxResults);

        setFilteredSuggestions(filtered);
        setIsOpen(true);

        if (value === '') {
            onSelect(null);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSuggestionClick = (suggestion: T) => {
        setInputValue(getDisplayValue(suggestion));
        onSelect(suggestion);
        setIsOpen(false);
    };

    return (
        <div
            ref={wrapperRef}
            className={`relative`}
        >
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
            />

            {isOpen && filteredSuggestions.length > 0 && (
                <ul>
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {getDisplayValue(suggestion)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;