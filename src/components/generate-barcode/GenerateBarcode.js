import React, { useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { getConfigurationService, saveConfiguration } from '../../services/ConfigurationService';
import { useNavigate } from 'react-router-dom';

const zip = new JSZip();

export const GenerateBarcode = ({ isUserAllowed }) => {
    const [configs, setConfigs] = useState({});
    const [serialInitial, setSerialInitial] = useState();
    const [serialFinal, setSerialFinal] = useState();
    const [finalArray, setArrayCount] = useState(Array(20).fill("**"));
    const [isDownload, setDownload] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();

    const mapConfigs = (configs) => {
        setConfigs(configs);
        setSerialInitial(configs.serialNumber);
        setSerialFinal(+configs.serialNumber + 19);
        setArrayCount(Array(20 * (+configs.copies)).fill("**"));
    }

    useEffect(async () => {
        if (isUserAllowed) {
            const response = await getConfigurationService();
            if (response.status === 'OK') {
                mapConfigs(response.data);
            } else {
                const error = ["Error retrieving configs"]
                setErrorMessage(error)
            }
        } else {
            navigate("/")
        }
    }, []);

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case 'serial-initial':
                setSerialInitial(value);
                break;
            case 'serial-final':
                setSerialFinal(value);
                break;
            default:
                break;
        }
    }

    const handleBlur = (e) => {
        const { value } = e.target;
        if (value > serialInitial) {
            const count = value - serialInitial + 1
            const ele = Array(count * (+configs.copies)).fill("**")
            setArrayCount(ele);
        }
    }

    const handleGenerate = () => {
        setDownload(true);
        let counter = 0;
        for (let i = 0; i <= (serialFinal - serialInitial + 1); i++) {
            const number = configs?.modelName + configs?.year + parseInt(+serialInitial + i, 10) + configs?.month
            for (let j = 1; j <= configs?.copies; j++) {
                const barcode = `#barcode_${counter}`;
                JsBarcode(barcode,
                    number, {
                    text: `${number}_${j}`,
                    width: 2,
                    height: 50,
                    fontSize: 15,
                });
                counter++;
            }
        }
    }

    const handleDownload = () => {
        let counter = 0;
        for (let i = 0; i < (serialFinal - serialInitial + 1); i++) {
            var img = zip.folder(`barcode_${(+serialInitial + i)}`);
            for (let j = 1; j <= configs?.copies; j++) {
                const element = document.getElementById(`barcode_${counter}`);
                const imgUri = element.toDataURL().split(';base64,')[1];
                img.file(`${j}.png`, imgUri, { base64: true });
                counter++;
            }
        }
        zip.generateAsync({ type: 'blob' }).then((content) => { FileSaver.saveAs(content, `barcode_${serialInitial}_${serialFinal}`); })
        saveConfiguration({
            ...configs,
            serialNumber: `${+serialFinal + 1}`
        });
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <h3>Generate barcode here</h3>
            </div>
            {errorMessage.length > 0 && (
                <div className="d-flex justify-content-center mt-5">
                    <div className="border border-danger px-3">
                        <h6 className="text-danger">{errorMessage} </h6>
                    </div>
                </div>
            )}
            <div className="p-3 blue-font">Current Sequence is {configs?.sequence || "00000000"}</div>
            <div className="p-3 w-100 row">
                <div className="col">
                    Barcode first serial number
                </div>
                <div className="col">
                    <input value={serialInitial} name="serial-initial" onChange={handleChange} type="number" id="serial-initial" />
                </div>
                <div className="w-100"></div>
                <br />
                <div className="col">
                    Barcode last serial number
                </div>
                <div className="col">
                    <input value={serialFinal} name="serial-final" onChange={handleChange} onBlur={handleBlur} type="number" id="serial-final" />
                </div>
                <div className="w-100"></div>
                <br />
            </div>
            <div>
                <div className="p-3 justify-content-center d-flex">
                    <button className="blue-background text-white p-2" onClick={handleGenerate}>Generate</button>
                </div>
                {
                    isDownload && (
                        <div className="p-3 justify-content-center d-flex">
                            <button className="blue-background text-white p-2" onClick={handleDownload}>Download</button>
                        </div>
                    )
                }
            </div>
            <div>
                {finalArray.map((val, i) => (<canvas id={`barcode_${i}`}></canvas>))}
            </div>
        </>
    )
}

