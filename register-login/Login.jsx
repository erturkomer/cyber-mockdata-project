import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userNameEmailInputValue, setUserNameEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const userNameEmailInputValueChange = (event) => {
    setUserNameEmailInputValue(event.target.value);
  };

  const passwordInputValueChange = (event) => {
    setPasswordInputValue(event.target.value);
  };

  const handleLogin = async () => {
    try {
      let requestParams = {};
      if (isValidEmail(userNameEmailInputValue)) {
        requestParams = { email: userNameEmailInputValue };
      } else {
        requestParams = { userName: userNameEmailInputValue };
      }

      const response = await axios.get('http://localhost:3000/users', {
        params: {
          ...requestParams,
          password: passwordInputValue
        }
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        if (user.password === passwordInputValue) {
          console.log('Giriş başarılı');
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('userDetails', JSON.stringify(user));
          window.location.href = '/';
        } else {
          setErrorMessage('Kullanıcı adı veya şifre hatalı');
        }
      } else {
        setErrorMessage('Kullanıcı adı veya şifre hatalı');
      }
    } catch (error) {
      console.error('Giriş işlemi sırasında bir hata oluştu:', error);
      setErrorMessage('Giriş işlemi sırasında bir hata oluştu');
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    !isLoggedIn ?
      <>

        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <div className="register-container" style={{ width: "25%", display: "flex", padding: "0px 50px", paddingBottom: "50px", background: "#ffff", border: "1px solid #dbdbdb", flexDirection: "column", alignItems: "center" }}>
            <svg width="200" height="200" viewBox="0 0 66 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="65.3996" height="22.872" transform="translate(0 0.563995)" fill="white" />
              <path d="M14.1826 16.644C13.1266 17.916 8.016 18.064 6.096 18.064C2.304 18.064 0 15.616 0 12.064C0 8.536 2.328 6.088 6.096 6.088C7.92 6.088 13.1746 7.284 14.2306 8.556L8.832 10.048C8.064 9.208 7.224 8.872 6.096 8.872C4.488 8.872 3.096 10.168 3.096 12.064C3.096 14.128 4.392 15.28 6.096 15.28C7.104 15.28 8.256 14.896 8.88 14.104L14.1826 16.644Z" fill="black" />
              <path d="M28.8035 6.876L21.8195 23.436H18.3875L20.6195 18.276L15.7955 6.876H19.2035L21.6035 12.972L22.2995 15.156L22.9715 12.972L25.3715 6.876H28.8035Z" fill="black" />
              <path d="M36.6494 9.42C34.9214 9.42 33.6734 10.74 33.6734 12.54C33.6734 14.316 34.9214 15.636 36.6494 15.636C38.3294 15.636 39.4814 14.388 39.4814 12.54C39.4814 10.668 38.3294 9.42 36.6494 9.42ZM30.6734 18.156V0.563995H33.7214V6.828L33.6734 7.644C34.1774 6.972 35.7134 6.588 36.7694 6.588C40.5374 6.588 42.6495 9.348 42.64956495 12.564C42.6495 16.14 40.4894 18.468 36.7694 18.468C35.8574 18.468 34.3934 18.036 33.7934 17.316L33.8174 17.964V18.156H30.6734Z" fill="black" />
              <path d="M55.3377 16.716C54.4497 17.868 52.4098 18.564 50.6578 18.564C46.8418 18.564 44.7058 15.948 44.7058 12.564C44.7058 9.108 46.8178 6.588 50.5378 6.588C54.2338 6.588 56.3457 9.108 56.3457 12.564C56.3457 12.948 56.3457 13.188 56.3217 13.524H47.8258C47.9938 14.94 49.0498 15.828 50.6578 15.828C51.8098 15.828 52.8897 15.444 53.5617 14.7L55.3377 16.716ZM47.8738 11.46H53.1537C53.0097 10.188 51.9538 9.324 50.5378 9.324C49.1218 9.324 47.9938 10.188 47.8738 11.46Z" fill="black" />
              <path d="M64.7516 9.708C64.1276 9.49199 63.5756 9.42 62.9276 9.42C62.4956 9.42 62.1356 9.444 61.7996 9.588V18.156H58.7036V7.38C59.6396 6.9 61.2476 6.564 62.8076 6.564C63.4796 6.564 64.6796 6.636 65.3996 6.9L64.7516 9.708Z" fill="black" />
            </svg>
            <span style={{ textAlign: "center", marginTop: "-50px", marginBottom: "50px", fontSize: "18px", fontWeight: "500", color: "#737373" }}>Sign up to buy enjoyable and discounted products.</span>
            <div className="register-input" style={{ display: "flex", flexDirection: "column" }}>
              <input type="text" placeholder="Username or email" onChange={userNameEmailInputValueChange} />
              <input type="password" placeholder="Password" onChange={passwordInputValueChange} />
            </div>
            <button onClick={handleLogin}>Sign in</button>
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
          </div>
          <div className="login-sReg">
            <span>Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "#0095f6" }}>Sign up</Link></span>
          </div>
        </div>
      </>
      : window.location.href = '/'
  );
};

export default Login;
