import type {FC} from 'react';
import './CitySelector.css';

interface CitySelectorProps {
  onSelectCity: (city: string) => void;
}

const CitySelector: FC<CitySelectorProps> = ({ onSelectCity }) => {
  const cities = ['Bengaluru', 'Mangaluru', 'Delhi', 'Chennai'];

  return (
    <div className="city-selector-overlay">
      <div className="city-selector-modal">
        <h2>Select Your City</h2>
        <p>Choose a city to book movie tickets</p>
        <div className="cities-grid">
          {cities.map((city) => (
            <button
              key={city}
              className="city-btn"
              onClick={() => onSelectCity(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
