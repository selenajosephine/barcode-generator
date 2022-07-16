import React, { useState } from 'react';
import { createContact } from '../../services/ContactsService';

export const ContactsComponent = (props) => {
    const [addressLineOne, setAddressLineOne] = useState('');
    const [addressLineTwo, setAddressLineTwo] = useState('');
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [city, setCity] = useState('');
    const [errorMessage, setErrorMessage] = useState([]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "address-line-one":
                setAddressLineOne(value);
                break;
            case "address-line-two":
                setAddressLineTwo(value);
                break;
            case "city":
                setCity(value);
                break;
            case "contact-number":
                setContactNumber(value);
                break;
            default:
                break;
        }
    }

    const handleSaveContact = () => {
        setErrorMessage([]);
        if (name && city && addressLineOne && addressLineTwo && contactNumber) {
            createContact({ name, city, addressLineOne, addressLineTwo, contactNumber })
        } else {
            if (!name) errorMessage.push("Invalid Name");
            if (!city) errorMessage.push("Invalid City");
            if (!contactNumber) errorMessage.push("Invalid Contact number");
            if (!addressLineOne || !addressLineTwo) errorMessage.push("Invalid Address");
        }

    }
    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <h3>Create New Contact</h3>
            </div>

            {errorMessage.length > 0 && (
                <div className="d-flex justify-content-center mt-5">
                    <div className="border border-danger px-3">
                        <h6 className="text-danger">{errorMessage.map(err => (<div>{err} <br /></div>))} </h6>
                    </div>
                </div>
            )}
            <div className="p-3 w-100 row">
                <div className="col">
                    Name
                </div>
                <div className="col">
                    <input value={name} name="name" onChange={handleChange} type="text" id="name" />
                </div>
                <div className="w-100" />
                <br />

                <div className="col">
                    Address (Line One)
                </div>
                <div className="col">
                    <input value={addressLineOne} name="address-line-one" onChange={handleChange} type="text" id="address-line-one" />
                </div>
                <div className="w-100" />
                <br />

                <div className="col">
                    Address (Line Two)
                </div>
                <div className="col d-flex">
                    <input value={addressLineTwo} name="address-line-two" onChange={handleChange} type="text" id="address-line-two" />
                </div>
                <div className="w-100" />
                <br />
                <div className="col">
                    City
                </div>
                <div className="col">
                    <input value={city} name="city" onChange={handleChange} type="text" id="city" />
                </div>
                <div className="w-100" />
                <br />
                <div className="col">
                    Contact Number
                </div>
                <div className="col">
                    <input value={contactNumber} name="contact-number" onChange={handleChange} type="text" id="contact-number" />
                </div>
                <div className="w-100" />
                <br />
            </div>
            <div className="p-3 justify-content-center d-flex">
                <button className="blue-background text-white p-2" onClick={handleSaveContact}>Save</button>
            </div>
        </>
    )
}