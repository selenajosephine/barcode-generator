import React, { useState } from 'react';

export const Configs = ({ setConfigs }) => {
    const configs = JSON.parse(localStorage.getItem("sels-barcode"));
    const [price, setPrice] = useState(configs?.price || 1);
    const [serialNumber, setSerialNumber] = useState(configs?.serialNumber || '100001');
    const [model, setModel] = useState(configs?.model || 'M01');
    const [year, setYear] = useState(configs?.year || '22');
    const [month, setMonth] = useState(configs?.month || '01');
    const [productHead, setProductHead] = useState(configs?.productHead || 'A');

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case "price":
                setPrice(value);
                break;
            case "model-number":
                setModel(value);
                break;
            case "serial-number":
                setSerialNumber(value);
                break;
            case "year":
                setYear(value);
                break;
            case "month":
                setMonth(value);
                break;
            case "product-head":
                setProductHead(value);
                break;
            default:
                break;
        }
    }

    const handleSaveDefaults = () => {
        const configs = {
            price, 
            model,
            serialNumber,
            year, 
            month, 
            productHead,
            sequence: [model, year, serialNumber, month, productHead].join(""),
        }
        localStorage.setItem("sels-barcode", JSON.stringify(configs));
        setConfigs(false);
    }

    return (
        <>
            <div className="p-3 w-100 row">
                <div className="col">
                    Price
            </div>
                <div className="col">
                    <input value={price} name="price" onChange={handleChange} type="text" id="price" />
                </div>
                <div className="w-100"></div>
                <br />

                <div className="col">
                    Model
                </div>
                <div className="col">
                    <input value={model} name="model-number" onChange={handleChange} type="text" id="model-number" />
                </div>
                <div className="w-100"></div>
                <br />

                <div className="col">
                    Serial Number
                </div>
                <div className="col">
                    <input value={serialNumber} name="serial-number" onChange={handleChange} type="text" id="serial-number" />
                </div>
                <div className="w-100"></div>
                <br />

                <div className="col">
                    Year
                </div>
                <div className="col">
                    <input value={year} name="year" onChange={handleChange} type="number" id="year" />
                </div>
                <div className="w-100"></div>
                <br />

                <div className="col">
                    Month
                </div>
                <div className="col">
                    <input value={month} name="month" onChange={handleChange} type="number" id="month" />
                </div>
                <div className="w-100"></div>
                <br />

                <div className="col">
                    Product Head
                </div>
                <div className="col">
                    <input value={productHead} name="product-head" onChange={handleChange} type="text" id="product-head" />
                </div>
                <div className="w-100"></div>
                <br />

            </div>
            <div className="p-3 justify-content-center d-flex">
                <button className="blue-background text-white p-2" onClick={handleSaveDefaults}>Save</button>
            </div>
        </>
    )
}