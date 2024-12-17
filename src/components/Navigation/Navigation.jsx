import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import './Navigation.module.css'; 

const Navigation = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="navigation-container">
      <button className="back-button" onClick={handleBack}>
        <ArrowBackIcon />
      </button>
    </div>
  );
};

export default Navigation;
