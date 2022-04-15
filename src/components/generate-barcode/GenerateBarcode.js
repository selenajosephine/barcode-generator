import React, { useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { getConfigurationService } from '../../services/ConfigurationService';
import { useNavigate } from 'react-router-dom';

const zip = new JSZip();

export const GenerateBarcode = ({ isUserAllowed }) => {
    const [configs, setConfigs] = useState({});
    const [serialInitial, setSerialInitial] = useState();
    const [serialFinal, setSerialFinal] = useState();
    const [copyCount, setCopyCount] = useState(1);
    const [finalArray, setArrayCount] = useState(Array(20).fill("**"));
    const [isDownload, setDownload] = useState(false);
    const [sequence, setSequence] = useState("000000000");
    // const [serialInitial, setSerialInitial] = useState(configs?.serialNumber || 1);
    // const [serialFinal, setSerialFinal] = useState(+(configs?.serialNumber || 1) + +19);
    // const [copyCount, setCopyCount] = useState(1);
    // const [finalArray, setArrayCount] = useState(Array(20).fill("**"));
    // const [isDownload, setDownload] = useState(false)
    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();

    const mapConfigs = (configs) => {
        setConfigs(configs);
        setSerialInitial(configs.serialNumber);
        setSerialFinal(+configs.serialNumber + 19);
        // setBatch(configs.batch);
        // setCopies(configs.copies);
        // setModel(configs.modelName);
        // setMonth(configs.month);
        // setYear(configs.year);
        // setSerialInitial(configs.serialNumber);
        setSequence(configs.sequence);
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
            case 'copy-count':
                setCopyCount(value);
                break;
            default:
                break;
        }
    }

    const handleBlur = (e) => {
        const { value } = e.target;
        if (value > serialInitial) {
            const count = value - serialInitial + 1
            const ele = Array(count).fill("**")
            setArrayCount(ele);
        }
    }

    const handleGenerate = () => {
        const seq = sequence;
        setDownload(true);
        const count = serialFinal - serialInitial + 1;
        // var number = String(seq) + serialInitial;
        for (let i = 0; i <= count; i++) {
            const barcode = `#barcode_${i}`;
            const number = configs?.model + configs?.year + parseInt(+serialInitial + i, 10) + configs?.month + configs?.productHead
            JsBarcode(barcode,
                number, {
                text: number,
                width: 2,
                height: 50,
                fontSize: 15,
            });
        }
    }

    const handleDownload = () => {
        const con = { ...configs, serialNumber: serialFinal + 1 }
        localStorage.setItem('sels-barcode', JSON.stringify(con));
        finalArray.forEach((val, index) => {
            const element = document.getElementById(`barcode_${index}`);
            if (element) {
                const imgUri = element.toDataURL().split(';base64,')[1];
                var img = zip.folder(`barcode_${index}`);
                for (let i = 1; i <= copyCount; i++) {
                    img.file(`${i}.png`, imgUri, { base64: true });
                }
            }
        })
        zip.generateAsync({ type: 'blob' }).then((content) => { FileSaver.saveAs(content, `barcode_${serialInitial}_${serialFinal}`); })
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
            <div className="p-3 blue-font">Current Sequence is {sequence}</div>
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
                <div className="col">
                    How many copies do you want?
                    </div>
                <div className="col">
                    <input value={copyCount} name="copy-count" onChange={handleChange} type="number" id="copy-count" />
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
            {finalArray.map((val, i) => (<canvas id={`barcode_${i}`}></canvas>))}
        </>
    )
}

