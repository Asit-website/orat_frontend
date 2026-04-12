import  { useState } from 'react';
import ReactSlider from 'react-slider';

const PriceFilter = ({ min = 0, max = 100000, onChange }) => {
  const [priceRange, setPriceRange] = useState([min, max]);

  const handleInputChange = (index, value) => {
    const updated = [...priceRange];
    updated[index] = Number(value);
    if (index === 0 && updated[0] > updated[1]) updated[0] = updated[1]; 
    if (index === 1 && updated[1] < updated[0]) updated[1] = updated[0]; 
    setPriceRange(updated);
    if (onChange) onChange({ min: updated[0], max: updated[1] });
  };

  const handleSliderChange = (values) => {
    setPriceRange(values);
    if (onChange) onChange({ min: values[0], max: values[1] });
  };

  return (
    <div className="PriceFilterContainer CheckboxList my-4">
      <h5 className="demi-bold mb-3">Price</h5>

      <div className="layout">
        <div className="flex xs5">
          <p className="m-b-5">Min</p>
          <div className="layout align-center">
            <i className="fa fa-inr" style={{ fontSize: '13px', marginRight: '5px' }}></i>
            <input
              type="text"
              value={priceRange[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              min={min}
              max={priceRange[1]}
              className="full-width p2"
            />
          </div>
        </div>

        <div className="flex xs6 offset-xs1">
          <p className="m-b-5">Max</p>
          <div className="layout align-center">
            <i className="fa fa-inr" style={{ fontSize: '13px', marginRight: '5px' }}></i>
            <input
              type="text"
              value={priceRange[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              min={priceRange[0]}
              max={max}
              className="full-width p2"
            />
          </div>
        </div>
      </div>

      <div className="m-t-10">
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          value={priceRange}
          min={min}
          max={max}
          onChange={handleSliderChange}
          ariaLabel={['Lower thumb', 'Upper thumb']}
          pearling
          minDistance={1}
        />
        {/* <div className="layout justify-space-between p2">
          <span><i className="fa fa-inr"></i> {priceRange[0]}</span>
          <span><i className="fa fa-inr"></i> {priceRange[1]}</span>
        </div> */}
      </div>
    </div>
  );
};

export default PriceFilter;
