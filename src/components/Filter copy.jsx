import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { categoryList } from '../services/General-service';
import { productColor, productSize, occassionList, getReadyToShipProducts } from '../services/Product-service';
import { useSearchParams } from 'react-router-dom';
import ReactSlider from 'react-slider';

const Filter = ({ min = 0, max = 100000, onChange }) => {
    const [priceRange, setPriceRange] = useState([min, max]);
    const [categoryArr, setCategoryArr] = useState([]);
    const [colorArr, setColorArr] = useState([]);
    const [sizeArr, setSizeArr] = useState([]);
    const [occassionArr, setOccassionArr] = useState([]);
    const [categories, setcategories] = useState([]);
    const [readyProducts, setreadyProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColor, setSearchColor] = useState('');
    const [searchSize, setSearchSize] = useState('');
    const [searchOccassion, setSearchOccassion] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();


    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                categoryList('').then(data => setCategoryArr(data.data));
                productColor('').then(data => setColorArr(data.data));
                productSize('').then(data => setSizeArr(data.data));
                occassionList('').then(data => setOccassionArr(data.data));
                getReadyToShipProducts('').then(data => setreadyProducts(data?.data?.product_count));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Price handlers
    const handleInputChange = (index, value) => {
        const updated = [...priceRange];
        updated[index] = Number(value);
        if (index === 0 && updated[0] > updated[1]) updated[0] = updated[1];
        if (index === 1 && updated[1] < updated[0]) updated[1] = updated[0];
        setPriceRange(updated);
        onChange?.({ min: updated[0], max: updated[1] });
    };

    const handleSliderChange = values => {
        setPriceRange(values);
        onChange?.({ min: values[0], max: values[1] });
    };

    // useEffect(() => {
    //     const data = { 'min_price': priceRange[0], 'max_price': priceRange[1] }
    //     getProductOnPriceRange(data);
    // }, [priceRange]);

    // Search handlers
    const handleSearchChange = type => e => {
        const setters = {
            category: setSearchTerm,
            color: setSearchColor,
            size: setSearchSize,
            occasion: setSearchOccassion
        };
        setters[type](e.target.value);
    };

    // Filter data based on search
    const filteredCategories = categoryArr.filter(data =>
        data.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredColor = colorArr.filter(data =>
        data.title.toLowerCase().includes(searchColor.toLowerCase())
    );
    const filteredSize = sizeArr.filter(data =>
        data.size.toLowerCase().includes(searchSize.toLowerCase())
    );
    const filteredOccassion = occassionArr.filter(data =>
        data.title.toLowerCase().includes(searchOccassion.toLowerCase())
    );

    // Filter change handlers
    const handleFilterChange = (type, id, paramKey) => {
        const currentIds = searchParams.get(paramKey)?.split('-') || [];
        if (!currentIds.includes(String(id))) {
            searchParams.set(paramKey, [...currentIds, id].join('-'));
            if (type === 'category') setcategories([...categories, id]);
        } else {
            searchParams.set(paramKey, currentIds.filter(item => item !== String(id)).join('-'));
            if (type === 'category') setcategories(categories.filter(item => item !== id));
        }
        setSearchParams(searchParams);
    };

    const handleReadyToShip = () => {
        searchParams.set('ready_to_ship', searchParams.get('ready_to_ship') === '1' ? '0' : '1');
        setSearchParams(searchParams);
    };

    // Render checkbox list
    const renderCheckboxList = (title, items, type, search, paramKey) => (
        <div className="CheckboxList">
            <h5 className="CheckboxListTitle demi-bold">{title}</h5>
            {search !== undefined && (
                <div className="CheckboxListSearch">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange(type)}
                        placeholder="Search"
                    />
                </div>
            )}
            <div className="CheckboxListOptions layout row align-start wrap">
                {items.map(data => (
                    <div key={data.id} className="flex xs12 CheckboxColorOptions">
                        <div className="PslCheckbox flex">
                            <label>
                                <input
                                    type="checkbox"
                                    name={`${type}Ids`}
                                    className="PslCheckboxInput"
                                    checked={searchParams.get(paramKey)?.split('-').includes(String(data.id))}
                                    onChange={() => handleFilterChange(type, data.id, paramKey)}
                                />
                                <span
                                    className="PslCheckboxCheckmark"
                                    style={type === 'color' ? { background: data.color, borderColor: data.size } : {}}
                                />
                                <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">{data.title || data.size}</span>
                                <span className="PslCheckboxCount p2">({data.products_count})</span>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            <div className="CheckboxListFooter layout align-center">
                <button className="btn-icon orat-color" />
            </div>
        </div>
    );

    const shippingTimes = [
        '48 Hours', '7 Days', '10 Days', '1-2 Weeks',
        '2-3 Weeks', '3-4 Weeks', '4-5 Weeks', 'Above 5 Weeks'
    ];

    return (
        <div className="FilterContainer">
            <div className="Filter">
                <div className="Breadcrumbs layout align-center">
                    <a href="" className="orat-color-hover ellipsis">Home</a>
                    <MdOutlineKeyboardArrowRight className="m-l-5 m-r-5" />
                    <a href="" className="ellipsis">Sale</a>
                </div>
                <div className="FilterContent">
                    {/* Ready to Ship */}
                    <div className="CheckboxList">
                        <div className="CheckboxListOptions layout row align-start wrap">
                            <div className="flex xs12 CheckboxColorOptions">
                                <div className="PslCheckbox flex">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="ready_to_shipd"
                                            className="PslCheckboxInput"
                                            checked={searchParams.get('ready_to_ship') === '1'}
                                            onChange={handleReadyToShip}
                                        />
                                        <span className="PslCheckboxCheckmark" />
                                        <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">Ready To Ship</span>
                                        <span className="PslCheckboxCount p2">({readyProducts})</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Occasion Filter */}
                    <div className="CheckboxList">
                        <h3 className="demi-bold mt-3" style={{ fontWeight: '700' }}>NEW</h3>
                        {renderCheckboxList('SHOP BY OCCASSION', filteredOccassion, 'occasion', searchOccassion, 'occasion_ids')}
                    </div>

                    {/* Category Filter */}
                    {renderCheckboxList('Category', filteredCategories, 'category', searchTerm, 'category_ids')}

                    {/* Size Filter */}
                    {renderCheckboxList('Size', filteredSize, 'size', searchSize, 'size_ids')}

                    {/* Color Filter */}
                    {renderCheckboxList('Color', filteredColor, 'color', searchColor, 'color_ids')}

                    {/* Shipping Time */}
                    {/* <div className="CheckboxList">
                        <h5 className="CheckboxListTitle demi-bold">SHIPPING TIME</h5>
                        <div className="CheckboxListOptions layout row align-start wrap">
                            {shippingTimes.map((time, index) => (
                                <div key={index} className="flex xs12 CheckboxColorOptions">
                                    <div className="PslCheckbox flex">
                                        <label>
                                            <input type="checkbox" name="shipping" className="PslCheckboxInput" />
                                            <span className="PslCheckboxCheckmark" />
                                            <span className="PslCheckboxText m-l-5 m-r-5 ellipsis p2">{time}</span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* Price Filter */}
                    <div className="PriceFilterContainer CheckboxList my-4">
                        <h5 className="demi-bold mb-3">Price</h5>
                        <div className="layout">
                            <div className="flex xs5">
                                <p className="m-b-5">Min</p>
                                <div className="layout align-center">
                                    <i className="fa fa-inr" style={{ fontSize: '13px', marginRight: '5px' }} />
                                    <input
                                        type="text"
                                        value={priceRange[0]}
                                        onChange={e => handleInputChange(0, e.target.value)}
                                        min={min}
                                        max={priceRange[1]}
                                        className="full-width p2"
                                    />
                                </div>
                            </div>
                            <div className="flex xs6 offset-xs1">
                                <p className="m-b-5">Max</p>
                                <div className="layout align-center">
                                    <i className="fa fa-inr" style={{ fontSize: '13px', marginRight: '5px' }} />
                                    <input
                                        type="text"
                                        value={priceRange[1]}
                                        onChange={e => handleInputChange(1, e.target.value)}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;