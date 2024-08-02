import React from 'react'
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage=()=> {
  return (
   
    <div className="homepage">
        <h1> WELCOME TO THE BLOGGING PLATFORM</h1>
        <p> Share your thoughts, idea, and stories with the world. </p>
        <div className="cta-buttons">
        <Link to="/login" className="cta-button">Login</Link>
        <Link to="/register" className="cta-button">Register</Link>
        </div>
    </div>
  )
}

export default HomePage