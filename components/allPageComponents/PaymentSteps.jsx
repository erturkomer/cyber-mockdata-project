import React from "react";
import { useLocation } from 'react-router-dom';

const PaymentSteps = () => {
  const location = useLocation();
  return (
    <>
      <div className="payments-steps">
        <div className="step-1p steps">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill={location.pathname == "/payments/step-1" ? "#000" : "#B2B2B2"} />
            <path d="M11.6953 4.5C10.945 4.50031 10.2022 4.64878 9.50951 4.93691C8.81679 5.22503 8.1878 5.64712 7.65864 6.17896C7.12948 6.7108 6.71056 7.34191 6.42594 8.03607C6.14131 8.73023 5.99658 9.47376 6.00006 10.224C6.00006 14.1792 10.0801 17.8056 11.3353 18.7656C11.4406 18.8526 11.573 18.9002 11.7097 18.9002C11.8463 18.9002 11.9787 18.8526 12.0841 18.7656C13.3417 17.7768 17.3881 14.1792 17.3881 10.224C17.3915 9.47397 17.2469 8.73063 16.9624 8.03662C16.6779 7.34262 16.2592 6.71162 15.7303 6.17981C15.2014 5.648 14.5727 5.22586 13.8803 4.9376C13.1878 4.64933 12.4453 4.50062 11.6953 4.5ZM11.6953 12.5904C11.2206 12.5904 10.7566 12.4496 10.3619 12.1859C9.96721 11.9222 9.6596 11.5474 9.47795 11.1088C9.2963 10.6703 9.24877 10.1877 9.34138 9.72218C9.43398 9.25663 9.66256 8.82899 9.9982 8.49334C10.3339 8.1577 10.7615 7.92912 11.227 7.83652C11.6926 7.74391 12.1752 7.79144 12.6137 7.97309C13.0522 8.15474 13.4271 8.46235 13.6908 8.85703C13.9545 9.25171 14.0953 9.71573 14.0953 10.1904C14.0953 10.8269 13.8424 11.4374 13.3923 11.8875C12.9422 12.3375 12.3318 12.5904 11.6953 12.5904Z" fill="white" />
          </svg>
          <div className="step-text">
            <span style={location.pathname == "/payments/step-1" ? { color: "#000" } : { color: "#B2B2B2" }}>Step 1</span>
            <span style={location.pathname == "/payments/step-1" ? { color: "#000" } : { color: "#B2B2B2" }}>Address</span>
          </div>
        </div>
        <div className="step-2p steps">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill={location.pathname == "/payments/step-2" ? "#000" : "#B2B2B2"} />
            <path d="M11.2778 16.6127C11.0212 16.3697 10.722 16.1829 10.3952 16.0665L9.71006 13.3986L17.8697 11.1159L18.7438 14.5224L11.2778 16.6127ZM8.68012 9.38794L14.1201 7.86638L14.9948 11.274L9.55537 12.7956L8.68012 9.38794ZM8.92425 16.0153C8.77237 16.0581 8.63119 16.1188 8.49394 16.1858L6.09544 6.83981H5.19319C5.10263 7.03725 4.91306 7.17619 4.68919 7.17619H3.56306C3.252 7.17619 3 6.91237 3 6.58781C3 6.26325 3.252 6 3.56306 6H4.68919C4.87819 6 5.03681 6.1035 5.13919 6.25144H6.87169V6.28012L6.89756 6.27225L9.37819 15.9377C9.22688 15.9517 9.07556 15.9737 8.92425 16.0153ZM9.06994 16.5834C10.1213 16.2893 11.2018 16.9406 11.4836 18.0392C11.7654 19.1366 11.1416 20.265 10.0898 20.5592C9.03844 20.8523 7.95787 20.2009 7.67606 19.1034C7.39425 18.006 8.01863 16.8776 9.06994 16.5834ZM8.7735 18.8351C8.89388 19.3054 9.35738 19.5844 9.80794 19.4578C10.2585 19.3312 10.5257 18.8481 10.4053 18.3778C10.2849 17.9076 9.82144 17.6286 9.37088 17.754C8.91975 17.8806 8.65256 18.3643 8.7735 18.8351ZM18.6735 16.5216L12.1012 18.3598C12.0894 18.2029 12.0675 18.0443 12.027 17.8862C11.9871 17.7281 11.9291 17.5796 11.8644 17.4367L18.4024 15.6086L18.6735 16.5216Z" fill="white" />
          </svg>
          <div className="step-text">
            <span style={location.pathname == "/payments/step-2" ? { color: "#000" } : { color: "#B2B2B2" }}>Step 2</span>
            <span style={location.pathname == "/payments/step-2" ? { color: "#000" } : { color: "#B2B2B2" }}>Shipping</span>
          </div>
        </div>
        <div className="step-3p steps">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="12" fill={(location.pathname == "/payments/step-3" || location.pathname === "/payments/step-3/paypal" || location.pathname === "/payments/step-3/paypal-credit") ? "#000" : "#B2B2B2"} />
            <path d="M17.2229 13.9801C17.0473 13.8418 15.4969 12.1345 14.6189 11.3387C14.6152 11.335 14.6152 11.335 14.6152 11.3313V7.65504C14.6152 6.74346 13.8717 6 12.9601 6H7.53923C6.69116 6 6 6.69489 6 7.53923V16.1619C6 17.0735 6.74346 17.8169 7.65504 17.8169H9.23163H9.63138C9.69863 17.8169 9.75467 17.7572 9.7472 17.6899L9.66127 16.9577C9.6538 16.8979 9.60523 16.8568 9.54545 16.8568H9.39975H9.31009C9.24658 16.8568 9.19427 16.8045 9.19427 16.741V6.94521C9.19427 6.88169 9.24658 6.82939 9.31009 6.82939H12.9714C13.3412 6.82939 13.6438 7.132 13.6438 7.50187V15.5044V16.2927C13.6438 16.5467 13.4682 16.7634 13.2329 16.8306C13.2291 16.8306 13.2291 16.8306 13.2254 16.8306C12.8257 16.6139 12.3549 15.6874 12.2839 15.5417C12.2765 15.5305 12.2727 15.5156 12.2727 15.5044C12.2466 15.269 11.9813 12.99 10.7671 12.99C10.7335 12.99 10.6999 12.99 10.6663 12.9938C10.6663 12.9938 9.69489 13.076 10.4981 15.8443C10.4981 15.8518 10.5019 15.8555 10.5019 15.863L10.8568 18.9303C10.8568 18.934 10.8568 18.9377 10.8605 18.9452C10.8904 19.061 11.2939 20.6264 12.3362 21.736C12.3549 21.7584 12.3661 21.7846 12.3661 21.8144V22.0797C12.3661 22.0872 12.3624 22.0909 12.3549 22.0909H12.2615C12.0336 22.0909 11.8468 22.2777 11.8468 22.5056V23.5853C11.8468 23.8132 12.0336 24 12.2615 24H16.6588C16.8867 24 17.0735 23.8132 17.0735 23.5853V22.5131C17.0735 22.2852 16.8867 22.0984 16.6588 22.0984C16.6513 22.0984 16.6476 22.0946 16.6476 22.0872C16.7933 20.7347 17.3163 16.1096 17.5965 15.7472C17.604 15.736 17.6115 15.7248 17.6152 15.7098C17.6638 15.5417 17.9066 14.5143 17.2229 13.9801ZM7.72976 16.7484C7.72976 16.8082 7.6812 16.8531 7.62516 16.8531C7.25903 16.8531 6.96015 16.5542 6.96015 16.188V7.4944C6.96015 7.12827 7.25903 6.82939 7.62516 6.82939C7.68493 6.82939 7.72976 6.87796 7.72976 6.934V16.7484Z" fill="white" />
          </svg>
          <div className="step-text">
            <span style={{ color: (location.pathname === "/payments/step-3" || location.pathname === "/payments/step-3/paypal" || location.pathname === "/payments/step-3/paypal-credit") ? "#000" : "#B2B2B2" }}>Step 3</span>
            <span style={{ color: (location.pathname === "/payments/step-3" || location.pathname === "/payments/step-3/paypal" || location.pathname === "/payments/step-3/paypal-credit") ? "#000" : "#B2B2B2" }}>Payment</span>
          </div>
        </div>
      </div>
    </>
  )
};

export default PaymentSteps;
