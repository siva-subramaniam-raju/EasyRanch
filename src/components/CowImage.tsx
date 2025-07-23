import React from 'react';

const CowImage = ({ breed, size = 'medium', className = '' }) => {
  const getCowImage = (breed) => {
    switch (breed?.toLowerCase()) {
      case 'holstein':
        return '/cow-holstein.svg';
      case 'jersey':
        return '/cow-jersey.svg';
      case 'guernsey':
        return '/cow-guernsey.svg';
      default:
        return '/cow-icon.svg';
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'small':
        return 'w-8 h-8';
      case 'medium':
        return 'w-12 h-12';
      case 'large':
        return 'w-16 h-16';
      case 'xl':
        return 'w-20 h-20';
      default:
        return 'w-12 h-12';
    }
  };

  return (
    <img
      src={getCowImage(breed)}
      alt={`${breed || 'Cow'} illustration`}
      className={`${getSizeClasses(size)} ${className}`}
    />
  );
};

export default CowImage; 