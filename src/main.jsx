import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';


ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Routes>
<Route path="/" element={<App />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
</Routes>
</BrowserRouter>
);