import React, {useState} from 'react';


const SearchBar = ({query, suggestions, handleInputChange, handleSuggestionClick, handleSearchSubmit}) => {


    // https://flowbite.com/docs/forms/search-input/#search-bar-example
    return (

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <form className="min-w-full mx-auto" onSubmit={handleSearchSubmit}>
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input
                            value={query}
                            onChange={handleInputChange}
                            type="search"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Search for a company or ticker..."
                            required
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {suggestion.name} <span className="ticker-background">{suggestion.ticker}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-light-gray  hover:bg-gray focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 "
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SearchBar;
