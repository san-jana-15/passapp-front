
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';


export default function ResetPassword() {
const { token } = useParams();
const navigate = useNavigate();
const [valid, setValid] = useState(null);
const [password, setPassword] = useState('');
const [msg, setMsg] = useState(null);
const [err, setErr] = useState(null);


useEffect(() => {
API.get(`/reset-password/${token}`)
.then(res => setValid(res.data.valid))
.catch(() => setValid(false));
}, [token]);


const handleSubmit = async (e) => {
e.preventDefault();
try {
const res = await API.post(`/reset-password/${token}`, { password });
setMsg(res.data.message);
setTimeout(() => navigate('/'), 2000);
} catch (error) {
setErr(error.response?.data?.message || 'Something went wrong');
}
};


if (valid === null) return <div className="container py-5">Checking token...</div>;
if (!valid) return <div className="container py-5"><div className="alert alert-danger">Invalid or expired link</div></div>;


return (
<div className="container py-5" style={{maxWidth:'480px'}}>
<h3>Reset Password</h3>
{msg && <div className="alert alert-success">{msg}</div>}
{err && <div className="alert alert-danger">{err}</div>}


<form onSubmit={handleSubmit}>
<div className="mb-3">
<label>New Password</label>
<input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
</div>
<button className="btn btn-primary">Change Password</button>
</form>
</div>
);
}