import React, { useState } from 'react';

export const Configs = ({ setConfigs }) => {

    const [price, setPrice] = useState(localStorage.getItem("sels-barcode-price"));
    const [serialNumber, setSerialNumber] = useState(localStorage.getItem("sels-barcode-serial-number"));
    const [model, setModel] = useState(localStorage.getItem("sels-barcode-model"));

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
            default:
                break;
        }
    }

    const handleSaveDefaults = () => {
        localStorage.setItem("sels-barcode-price", price);
        localStorage.setItem("sels-barcode-model", model)
        localStorage.setItem("sels-barcode-serial-number", serialNumber);
        localStorage.setItem("sels-barcode-sequence", [price, model, serialNumber].join("-"))
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
            </div>
            <div className="p-3 justify-content-center d-flex">
                <button className="blue-background text-white p-2" onClick={handleSaveDefaults}>Save</button>
            </div>
        </>
    )
}