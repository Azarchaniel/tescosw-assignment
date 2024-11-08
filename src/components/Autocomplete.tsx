import React, { useState, useRef, useEffect } from "react";
import "../App.scss";

interface AutocompleteProps<T> {
    data: T[];
    onSelect: (item: T | null) => void;
    getDisplayValue: (item: T) => string;
    placeholder?: string;
    maxResults?: number;
    useLocalization?: () => void;
    initialValue?: string;
}

const Autocomplete =
    <T extends { id: number | string }>({
		data,
		onSelect,
		getDisplayValue,
		placeholder = "Vyhledat",
		maxResults = 10,
		useLocalization,
		initialValue = ""
	}: AutocompleteProps<T>) => {
    	const [inputValue, setInputValue] = useState(initialValue);
    	const [filteredSuggestions, setFilteredSuggestions] = useState<T[]>([]);
    	const [isOpen, setIsOpen] = useState(false);
    	const wrapperRef = useRef<HTMLDivElement>(null);

    	useEffect(() => {
    		if (initialValue) {
    			setInputValue(initialValue); //city details are already in parent component, here I need only show the name
    		}
    	}, [initialValue, data, getDisplayValue, onSelect]);

    	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    		const value = e.target.value;
    		setInputValue(value);

    		const filtered = data.filter(item =>
    			getDisplayValue(item).toLowerCase().includes(value.toLowerCase())
    		).slice(0, maxResults);

    		setFilteredSuggestions(filtered);
    		setIsOpen(true);

    		if (value === "") {
    			onSelect(null);
    		}
    	};

    	useEffect(() => {
    		const handleClickOutside = (event: MouseEvent) => {
    			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
    				setIsOpen(false);
    			}
    		};

    		document.addEventListener("mousedown", handleClickOutside);
    		return () => {
    			document.removeEventListener("mousedown", handleClickOutside);
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
    			className="autocompleteWrapper"
    		>
    			<div className="autocompleteInputWrapper">
    				<input
    					className="autocompleteInput"
    					type="text"
    					value={inputValue}
    					onChange={handleInputChange}
    					placeholder={placeholder}
    				/>
    				{useLocalization ? <span onClick={useLocalization}>
                    ⌖
    				</span> : null}
    			</div>


    			{isOpen && filteredSuggestions.length > 0 && (
    				<ul className="autocompleteSuggestions">
    					{filteredSuggestions.map((suggestion) => (
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