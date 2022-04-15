import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { saveConfiguration, getConfigurationService } from '../../services/ConfigurationService';

export const Configs = ({ isUserAllowed }) => {
    console.log('isUserAllowed', isUserAllowed);
    const [batch, setBatch] = useState('A01');
    const [serialNumber, setSerialNumber] = useState('100001');
    const [model, setModel] = useState('M01');
    const [year, setYear] = useState('22');
    const [month, setMonth] = useState('01');
    const [copies, setCopies] = useState(1);
    const [sequence, setSequence] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();

    useEffect(async () => {
        if (isUserAllowed) {
            const response = await getConfigurationService();
            if (response.status === 'OK') {
                mapConfigs(response.data);
            } else {
                errorMessage.push("Something went wrong. Try creating new configurations.");
            }
        } else {
            navigate("/")
        }
    }, []);

    const mapConfigs = (configs) => {
        setBatch(configs.batch);
        setYear(configs.year);
        setMonth(configs.month);
        setSerialNumber(configs.serialNumber);
        setSequence(configs.serialNumber);
        setCopies(configs.copies);
        setModel(configs.modelName);
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case "batch":
                setBatch(value);
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
            case "copies":
                setCopies(value);
                break;
            default:
                break;
        }
    }

    const handleSaveDefaults = async () => {
        const response = await saveConfiguration({
            modelName: model,
            serialNumber,
            year,
            month,
            batch,
            copies,
            sequence: [model, year, serialNumber, month].join("")
        });
        if (response.status !== 'OK') {
            const error = ["Error saving configs"]
            setErrorMessage(error)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <h3>Please Update your barcode configurations</h3>
            </div>
            {errorMessage.length > 0 && (
                <div className="d-flex justify-content-center mt-5">
                    <div className="border border-danger px-3">
                        <h6 className="text-danger">{errorMessage} </h6>
                    </div>
                </div>
            )}
            <div className="p-3 w-100 row">
                <div className="col">
                    Batch
            </div>
                <div className="col">
                    <input value={batch} name="batch" onChange={handleChange} type="text" id="batch" />
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
                    Copies
                </div>
                <div className="col">
                    <input value={copies} name="copies" onChange={handleChange} type="text" id="copies" />
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


