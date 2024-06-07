import React, { useState } from "react";
import ShippingMethodCard from "./ShippingMethodCard";
import StepNextButton from "../StepNextButton";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";


const PaymentStep2 = () => {
    const location = useLocation();
    const { cart, selectedAddress, totalPrice } = location.state || [];
    const [selectedShippingMethodId, setSelectedShippingMethodId] = useState(null);
    const navigate = useNavigate();
    const [shippingDates, setShippingDates] = useState({
        1: '',
        2: '',
        3: ''
    });

    const handleMethodSelect = (id) => {
        setSelectedShippingMethodId(id);
    };

    const handleDateChange = (id, date) => {
        setShippingDates(prevDates => ({
            ...prevDates,
            [id]: date
        }));
    };

    const shippingMethods = [
        { id: 1, name: 'Regulary shipment', shippingPrice: 'Free', dateSelected: false, dateName: '29 Oct, 2024' },
        { id: 2, name: 'Get your delivery as soon as possible', shippingPrice: '$8.50', dateSelected: false, dateName: '1 Oct, 2024' },
        { id: 3, name: 'Pick a date when you want to get your delivery', shippingPrice: 'Schedule', dateSelected: true },
    ];

    return (
        <div className="shipping-method">
            <div className="shipping-method-content">
                <div className="shipping-block">
                    <h3 style={{ fontWeight: "600", fontSize: "20px", lineHeight: "24px", color: "#17183B" }}>Shipping Method</h3>
                    <div className="shipping-radio-group">
                        {shippingMethods.map((method) => (
                            <ShippingMethodCard
                                key={method.id}
                                id={method.id}
                                selectedShippingMethodId={selectedShippingMethodId}
                                handleMethodSelect={handleMethodSelect}
                                handleDateChange={handleDateChange}
                                selectedDate={shippingDates[method.id]}
                                name={method.name}
                                shippingPrice={method.shippingPrice}
                                dateSelected={method.dateSelected}
                                dateName={method.dateName}
                            />
                        ))}
                    </div>
                </div>
                <div className="shipping-buttons">
                    <Link to="/payments/step-1">
                        <StepNextButton background="#fff" name="Back" />
                    </Link>
                    <StepNextButton background="#000" name="Next" onClick={() => navigate("/payments/step-3", { state: { cart: cart, selectedAddress: selectedAddress, selectedShippingMethodId: selectedShippingMethodId, totalPrice: totalPrice  } })} />
                </div>
            </div>
        </div>
    );
};

export default PaymentStep2;
