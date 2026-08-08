const FILTERS = ["all", "active", "inactive", "completed"];

function SearchFilterBar({ search, onSearchChange, filter, onFilterChange }) {

  return (
    <div className='search-filter-bar'>
      <input
        type='text'
        placeholder='Search tasks by title...'
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className='filter-buttons'>
        {FILTERS.map((filterOption) => (
          <button
            key={filterOption}
            className={filter === filterOption ? "filter-btn active" : "filter-btn"}
            onClick={() => onFilterChange(filterOption)}          
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchFilterBar;