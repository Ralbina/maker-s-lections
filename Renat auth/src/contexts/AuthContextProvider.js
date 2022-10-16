import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';

export const authContext = createContext();

const API = 'http://35.239.251.89/';

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const register = async (user) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    let formData = new FormData();
    formData.append('username', user.email);
    formData.append('password', user.password);

    try {
      const res = await axios.post(`${API}register/`, formData, config);
      navigate('/login');
    } catch (e) {
      console.log(e);
      setError('error occured');
    }
  };

  async function login(username, password) {
    console.log(username, password);
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      let res = await axios.post(`${API}api/token/`, formData, config);
      localStorage.setItem('token', JSON.stringify(res.data));
      localStorage.setItem('username', username);
      setUser(username);
      navigate('/');
    } catch (error) {
      setError('error occured');
    }
  }

  async function checkAuth() {
    let token = JSON.parse(localStorage.getItem('token'));
    try {
      const Authorization = `Bearer ${token.access}`;

      let res = await axios.post(
        `${API}api/token/refresh/`,
        {
          refresh: token.refresh,
        },
        {
          headers: { Authorization },
        }
      );

      localStorage.setItem(
        'token',
        JSON.stringify({
          refresh: token.refresh,
          access: res.data.access,
        })
      );

      let userName = localStorage.getItem('username');
      setUser(userName);
    } catch (error) {
      logout();
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser('');
  }

  return (
    <authContext.Provider
      value={{
        register,
        login,
        user,
        error,
        checkAuth,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
