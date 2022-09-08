import React, { useState } from 'react'
import JsBarcode from 'jsbarcode';
import JSZip from 'jszip';
import FileSaver from 'file-saver';


const zip = new JSZip();

export const GenerateUniqueBarcode = () => {
    const [code, setCode] = useState('');
    const [copies, setCopies] = useState(20);
    const [isUpc, setUpc] = useState(false);
    const [finalArray, setArrayCount] = useState(Array(20).fill("**"));

    const handleBlur = (e) => {
        const { value } = e.target;
        if (+value > copies) {
            const ele = Array(+value).fill("**");
            setArrayCount(ele);
        }
    }

    const handleGenerate = () => {
        for (let j = 0; j < copies; j++) {
            const barcode = `#barcode_${j}`;
            if (isUpc) {
                JsBarcode(barcode, code, {
                    format: 'EAN13',
                    text: code,
                    width: 3,
                    height: 62,
                    fontSize: 40,
                    displayValue: true,
                    marginBottom: 20,
                    marginTop: 20
                })
            } else {
                JsBarcode(barcode,
                    code, {
                    text: code,
                    width: 3,
                    height: 62,
                    fontSize: 40,
                    displayValue: true,
                    marginBottom: 20,
                    marginTop: 20
                })
            }

        }
    }

    const handleDownload = (e) => {
        const canvas = document.createElement("canvas");
        const svg = document.getElementById("barcode_0")
        const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
        const w = parseInt(svg.getAttribute('width'));
        const h = parseInt(svg.getAttribute('height'));
        const img_to_download = document.createElement('img');
        img_to_download.src = 'data:image/svg+xml;base64,' + base64doc;
        img_to_download.onload = function () {
            canvas.setAttribute('width', w);
            canvas.setAttribute('height', h);
            const context = canvas.getContext("2d");
            //context.clearRect(0, 0, w, h);
            context.drawImage(img_to_download, 0, 0, w, h);
            const dataURL = canvas.toDataURL('image/png');
            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(canvas.msToBlob(), "download.png");
                e.preventDefault();
            } else {
                const a = document.createElement('a');
                const my_evt = new MouseEvent('click');
                a.download = 'download.png';
                a.href = dataURL;
                a.dispatchEvent(my_evt);
            }
            //canvas.parentNode.removeChild(canvas);
        }
    }

    return (
        <>
            <span className="no-print">
                <div className="d-flex justify-content-center mt-3">
                    <h3>Generate a Unique Barcode here</h3>
                </div>
                <div className="p-3 w-100 row">
                    <div className="col">
                        Enter your unique barcode
                    </div>
                    <div className="col">
                        <input value={code} name="unique-barcode" onChange={(e) => setCode(e.target.value)} type="text" id="unique-barcode" />
                    </div>
                    <div className="w-100"></div>
                    <br />
                    <div className="col">
                    </div>
                    <div className="col">
                        <input type="checkbox" onChange={(e) => { setUpc(!isUpc) }} checked={isUpc} />
                        &nbsp; Is EAN?
                    </div>
                    <div className="w-100"></div>
                    <br />
                    <div className="col">
                        Number of copies
                    </div>
                    <div className="col">
                        <input value={copies} name="copy-count" onChange={(e) => setCopies(e.target.value)} onBlur={handleBlur} type="number" id="copy-count" />
                    </div>
                    <div className="w-100"></div>
                    <div className="p-3 justify-content-center d-flex">
                        <button className="blue-background text-white p-2" onClick={handleGenerate}>Generate</button>
                    </div>
                    <div className="p-3 justify-content-center d-flex">
                        <button className="blue-background text-white p-2" onClick={handleDownload}>Download</button>
                    </div>
                </div>
            </span>
            <div id="canvas">
                {finalArray.map((val, i) => (<><svg id={`barcode_${i}`}></svg></>))}
            </div>
        </>
    )
}
