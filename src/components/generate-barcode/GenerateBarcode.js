import React, { useState } from 'react';
import JsBarcode from 'jsbarcode';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

const zip = new JSZip();

export const GenerateBarcode = () => {
    const configs = JSON.parse(localStorage.getItem("sels-barcode"));
    const [serialInitial, setSerialInitial] = useState(configs?.serialNumber || 1);
    const [serialFinal, setSerialFinal] = useState(+(configs?.serialNumber || 1) + +19);
    const [copyCount, setCopyCount] = useState(1);
    const [finalArray, setArrayCount] = useState(Array(20).fill("**"));
    const [isDownload, setDownload] = useState(false)
    const [sequence] = useState(configs?.sequence || "000000000");

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

