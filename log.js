import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link  } from 'react-router-dom';
 

const Text2 = () => { 
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // State variable to hold the error message

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/log', values)
      .then(res => {
        if(res.data.Login){
          navigate('/Formulaireprofil')
        }else{
          setErrorMessage("Email ou Mot de passe incorrect");

         }
        console.log(res);
        
      })
      .catch(err => console.log(err));
  };
     
  

  return( 
    <body className="bodys">
      <div className="card">
      <div className="card-content">
        <div className="card-title">
          <h2>LOGIN</h2>
          <div className="underline-title"></div>
        </div>
        <form method="post" className="form" onSubmit={handleSubmit}>
          <label for="user-email"  > Email </label>
          <input
            id="user-email"
            className="form-content"
            name="email"
            autocomplete="on"
            onChange={handleInput}
            required
          />
          <div className="form-border "></div>
          <label for="user-password"  >Password </label>
          <input
            id="user-password"
            className="form-content"
            name="password"
            onChange={handleInput}
            required
          />
          {errorMessage && (
              <p style={{ color: "red" }}>{errorMessage}</p>
            )}
          <div className="form-border"></div>
          <button className="submit-btn" name="submit" value="LOGIN">LOGIN</button>
          <Link to="/sign" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>

        </form>
      </div>      </div>

    </body>
  );
}
 
export default Text2;
