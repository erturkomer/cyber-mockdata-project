import React, { useState, useEffect } from "react";
import ShippingMethodCard from "./ShippingMethodCard";
import StepNextButton from "../StepNextButton";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentStep2 = () => {
    const [selectedShippingMethodId, setSelectedShippingMethodId] = useState(null);
    const [shippingDates, setShippingDates] = useState({});
    const location = useLocation();
    const { cart, totalPrice, selectedAddress } = location.state || [];
    const navigate = useNavigate();


    useEffect(() => {
        if (!cart || !totalPrice) {
            navigate("/shoppingcart", { replace: true });
        }
    }, [cart, totalPrice, selectedAddress, navigate]);

    const handleMethodSelect = (id) => {
        setSelectedShippingMethodId(id);
    };

    const handleDateChange = (id, date) => {
        setShippingDates(prevDates => ({
            ...prevDates,
            [id]: date
        }));
    };

    const handleNextClick = () => {
        if (!selectedShippingMethodId) {
            toast.error("Lütfen bir nakliye yöntemi seçin.");
            return;
        }

        if (selectedShippingMethodId === 3 && !shippingDates[selectedShippingMethodId]) {
            toast.error("Lütfen bir teslimat tarihi seçin.");
            return;
        }

        let selectedMethod;
        if (selectedShippingMethodId === 1) {
            selectedMethod = 'Free';
        } else if (selectedShippingMethodId === 2) {
            selectedMethod = '$8.50';
        } else {
            selectedMethod = 'Schedule';
        }

        navigate("/payments/step-3", {
            state: {
                shippingDates: shippingDates,
                selectedMethod: selectedMethod,
                cart: cart,
                selectedAddress: selectedAddress,
                totalPrice: totalPrice,
            }
        });
    };
    const handleStepBack = () => {
        navigate("/payments/step-1", {
            state: {
                cart: cart,
                selectedAddress: selectedAddress,
                totalPrice: totalPrice,
                shippingDates: shippingDates,
            },
        });
        console.log("state aktarıldı");
    }

    return (
        <div className="shipping-method">
            <div className="shipping-method-content">
                <div className="shipping-block">
                    <h3 style={{ fontWeight: "600", fontSize: "20px", lineHeight: "24px", color: "#17183B" }}>Shipping Method</h3>
                    <div className="shipping-radio-group">
                        <ShippingMethodCard
                            id={1}
                            selectedShippingMethodId={selectedShippingMethodId}
                            handleMethodSelect={handleMethodSelect}
                            handleDateChange={handleDateChange}
                            selectedDate={shippingDates[1]}
                            name='Regulary shipment'
                            shippingPrice='Free'
                            dateName='23 Haz, 2024'
                        />
                        <ShippingMethodCard
                            id={2}
                            selectedShippingMethodId={selectedShippingMethodId}
                            handleMethodSelect={handleMethodSelect}
                            handleDateChange={handleDateChange}
                            selectedDate={shippingDates[2]}
                            name='Get your delivery as soon as possible'
                            shippingPrice='$8.50'
                            dateName={`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'short' })}, ${new Date().getFullYear()}`}
                        />
                        <ShippingMethodCard
                            id={3}
                            selectedShippingMethodId={selectedShippingMethodId}
                            handleMethodSelect={handleMethodSelect}
                            handleDateChange={handleDateChange}
                            selectedDate={shippingDates[3]}
                            name='Pick a date when you want to get your delivery'
                            shippingPrice='Schedule'
                            dateSelected={true}
                            dateName={shippingDates[3]}
                        />
                    </div>
                </div>
                <div className="shipping-buttons">
                    <StepNextButton background="#fff" name="Back" width="244.5px" onClick={handleStepBack} />
                    <StepNextButton background="#000" name="Next" onClick={handleNextClick} />
                </div>
            </div>
        </div>
    );
};

export default PaymentStep2;
