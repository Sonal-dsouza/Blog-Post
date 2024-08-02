import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import HomePage from './FrontEnd/HomePage';
import reportWebVitals from './reportWebVitals';
import Login from './FrontEnd/Login';
import Register from './FrontEnd/Register';
import AddPost from './FrontEnd/AddPost';
import UpdatePost from './FrontEnd/UpdatePost';
import DeletePost from './FrontEnd/DeletePost';
import RetrievePostById from './FrontEnd/RetrievePostById';

import Dashboard from './FrontEnd/Dashboard';
import BlogPostList from './FrontEnd/BlogPostList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<HomePage/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/register' element={<Register/>}></Route>
      <Route exact path='/addpost' element={<AddPost/>}></Route>
      <Route exact path='/update' element={<UpdatePost/>}></Route>
      <Route exact path='/delete' element={<DeletePost/>}></Route>
      <Route exact path='/getbyid' element={<RetrievePostById/>}></Route>
      <Route exact path='/listblogpost' element={<BlogPostList/>}></Route>
      <Route exact path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
