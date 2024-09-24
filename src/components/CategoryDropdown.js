import React from 'react';

const CategoryDropdown = ({ selectedCategory, onCategoryChange }) => {
    const categories = [
      { value: 'all', label: 'All Categories' },
      { value: '1', label: 'Arts & Entertainment' },
      { value: '2', label: 'Food & Beverage' },
      { value: '3', label: 'Retail' },
      { value: '4', label: 'Recreation' },
      { value: '5', label: 'Lodging' },
      { value: '6', label: 'Services' },
    ];
    
    return (
      <select 
        value={selectedCategory} 
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-dropdown"
      >
        {categories.map(category => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    );
  };

export default CategoryDropdown;