import React from 'react';
import { Link } from 'react-router-dom';


export default function App() {
return (
<div className="container py-5 text-center">
<h1>Password Reset App</h1>
<p><Link to="/forgot-password" className="btn btn-primary">Forgot Password</Link></p>
</div>
);
}