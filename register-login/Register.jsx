import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [emailInputValue, setEmailInputValue] = useState('');
  const [fullNameInputValue, setFullNameInputValue] = useState('');
  const [userNameInputValue, setUserNameInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();


  const emailInputValueChange = (event) => {
    setEmailInputValue(event.target.value);
  };
  const fullNameInputValueChange = (event) => {
    setFullNameInputValue(event.target.value);
  };
  const userNameInputValueChange = (event) => {
    setUserNameInputValue(event.target.value);
  };
  const passwordInputValueChange = (event) => {
    setPasswordInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailInputValue)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(passwordInputValue)) {
      setErrorMessage('Password must contain at least one letter, one number, and one special character. It must be at least 8 characters long.');
      return;
    }

    const currentDate = new Date();
    const options = { timeZone: "Europe/Istanbul" };

    const registrationDate = {
      year: currentDate.toLocaleString("tr-TR", { year: "numeric", timeZone: options.timeZone }),
      month: currentDate.toLocaleString("tr-TR", { month: "2-digit", timeZone: options.timeZone }),
      day: currentDate.toLocaleString("tr-TR", { day: "2-digit", timeZone: options.timeZone }),
      hour: currentDate.toLocaleString("tr-TR", { hour: "2-digit", hour12: false, timeZone: options.timeZone }),
      minute: currentDate.toLocaleString("tr-TR", { minute: "2-digit", timeZone: options.timeZone }),
      second: currentDate.toLocaleString("tr-TR", { second: "2-digit", timeZone: options.timeZone }),
    };

    const userData = {
      email: emailInputValue,
      fullName: fullNameInputValue,
      userName: userNameInputValue,
      password: passwordInputValue,
      avatarUrl: generateDefaultAvatarUrl(fullNameInputValue),
      registrationDate: {
        year: registrationDate.year,
        month: registrationDate.month,
        day: registrationDate.day,
        hour: registrationDate.hour,
        minute: registrationDate.minute,
        second: registrationDate.second
      },
      favoriteProducts: [],
      registeredAddresses: [],
      cart: [],
    };

    try {
      const existingUsersResponse = await axios.get(`${import.meta.env.VITE_API_URL}users`);

      const userExists = existingUsersResponse.data.some(user =>
        user.email === userData.email || user.userName === userData.userName
      );

      if (userExists) {
        setErrorMessage('This email or username is already in use.');
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}users`, userData);
      setSuccessMessage('Registration successful!');
      navigate("/login");
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('An error occurred during the registration process.');
      setSuccessMessage('');
    }
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const generateDefaultAvatarUrl = (fullName) => {
    if (!fullName) return '';
    const initials = getInitials(fullName);
    const avatarInitials = placeInitialsToCenter(initials);
    return `https://ui-avatars.com/api/?name=${avatarInitials}&background=eeeeee&color=525252`;
  };

  const getInitials = (fullName) => {
    const parts = fullName.split(' ');
    if (parts.length === 1) return parts[0].charAt(0);
    return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
  };

  const placeInitialsToCenter = (initials) => {
    const maxLength = 2;
    const spaceCount = Math.floor((maxLength - initials.length) / 2);
    return ' '.repeat(spaceCount) + initials + ' '.repeat(spaceCount);
  };

  return (
    !isLoggedIn ?
      <>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <form onSubmit={handleSubmit} className="register-container" style={{ width: "25%", height: "89vh", display: "flex", padding: "12px 50px", background: "#ffff", border: "1px solid #dbdbdb", flexDirection: "column", alignItems: "center" }}>
            <svg width="200" height="200" viewBox="0 0 66 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="65.3996" height="22.872" transform="translate(0 0.563995)" fill="white" />
              <path d="M14.1826 16.644C13.1266 17.916 8.016 18.064 6.096 18.064C2.304 18.064 0 15.616 0 12.064C0 8.536 2.328 6.088 6.096 6.088C7.92 6.088 13.1746 7.284 14.2306 8.556L8.832 10.048C8.064 9.208 7.224 8.872 6.096 8.872C4.488 8.872 3.096 10.168 3.096 12.064C3.096 14.128 4.392 15.28 6.096 15.28C7.104 15.28 8.256 14.896 8.88 14.104L14.1826 16.644Z" fill="black" />
              <path d="M28.8035 6.876L21.8195 23.436H18.3875L20.6195 18.276L15.7955 6.876H19.2035L21.6035 12.972L22.2995 15.156L22.9715 12.972L25.3715 6.876H28.8035Z" fill="black" />
              <path d="M36.6494 9.42C34.9214 9.42 33.6734 10.74 33.6734 12.54C33.6734 14.316 34.9214 15.636 36.6494 15.636C38.3294 15.636 39.4814 14.388 39.4814 12.54C39.4814 10.668 38.3294 9.42 36.6494 9.42ZM30.6734 18.156V0.563995H33.7214V6.828L33.6734 7.644C34.1774 6.972 35.7134 6.588 36.7694 6.588C40.5374 6.588 42.6495 9.348 42.64956495 12.564C42.6495 16.14 40.4894 18.468 36.7694 18.468C35.8574 18.468 34.3934 18.036 33.7934 17.316L33.8174 17.964V18.156H30.6734Z" fill="black" />
              <path d="M55.3377 16.716C
55.3377 16.716C54.4497 17.868 52.4098 18.564 50.6578 18.564C46.8418 18.564 44.7058 15.948 44.7058 12.564C44.7058 9.108 46.8178 6.588 50.5378 6.588C54.2338 6.588 56.3457 9.108 56.3457 12.564C56.3457 12.948 56.3457 13.188 56.3217 13.524H47.8258C47.9938 14.94 49.0498 15.828 50.6578 15.828C51.8098 15.828 52.8897 15.444 53.5617 14.7L55.3377 16.716ZM47.8738 11.46H53.1537C53.0097 10.188 51.9538 9.324 50.5378 9.324C49.1218 9.324 47.9938 10.188 47.8738 11.46Z" fill="black" />
              <path d="M64.7516 9.708C64.1276 9.49199 63.5756 9.42 62.9276 9.42C62.4956 9.42 62.1356 9.444 61.7996 9.588V18.156H58.7036V7.38C59.6396 6.9 61.2476 6.564 62.8076 6.564C63.4796 6.564 64.6796 6.636 65.3996 6.9L64.7516 9.708Z" fill="black" />
            </svg>
            <span style={{ textAlign: "center", marginTop: "-50px", marginBottom: "50px", fontSize: "18px", fontWeight: "500", color: "#737373" }}>Sign up to buy enjoyable and discounted products.</span>
            <div className="register-input" style={{ display: "flex", flexDirection: "column" }}>
              <input type="text" placeholder="Email" value={emailInputValue} onChange={emailInputValueChange} />
              <input type="text" placeholder="Full Name" value={fullNameInputValue} onChange={fullNameInputValueChange} />
              <input type="text" placeholder="Username" value={userNameInputValue} onChange={userNameInputValueChange} />
              <input type="password" placeholder="Password" value={passwordInputValue} onChange={passwordInputValueChange} />
            </div>
            <div className="register-text">
              <span>People using our Service may have uploaded your contact information to Cyber. <a style={{ textDecoration: "none", color: "#385898" }} href="#"> Get More Information</a></span>
              <span>By registering, you agree to our <a style={{ textDecoration: "none", color: "#385898" }} href="#">Terms, Privacy Policy</a>  and <a style={{ textDecoration: "none", color: "#385898" }} href="#">Cookies Policy.</a></span>
            </div>
            <button type="submit" style={{ margin: "10px" }}>Sign up</button>
            {errorMessage && <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>}
            {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
          </form>
          <div className="login-sReg">
            <span>Have an account? <Link to="/login" style={{ textDecoration: "none", color: "#0095f6" }}>Sign in</Link></span>
          </div>
        </div>
      </>
      : window.location.href = '/'
  );
};

export default Register;
