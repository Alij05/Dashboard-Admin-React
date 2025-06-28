import React, { useState } from "react";
import "./Form.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Form() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [isActive, setIsActive] = useState('Yes');

    // Alert & Snackbar
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('success'); // 'success', 'error', 'warning'

    
    const handleClose = () => {
        setOpen(false);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (username && fullName && email && password && phone && address && gender && isActive) {
            const newUser = { username, fullName, email, password, phone, address, gender, isActive };

            fetch('https://dashboard-admin-react-91011-default-rtdb.firebaseio.com/users.json', {
                method: 'POST',
                body: JSON.stringify(newUser)
            }).then(res => {
                if (res.ok) {
                    setMsg("New User Added");
                    setType("success");
                } else {
                    setMsg("Error :(");
                    setType("error");
                }
                setOpen(true);
            });

            setUsername('');
            setFullName('');
            setEmail('');
            setPassword('');
            setPhone('');
            setAddress('');
            setGender('');
            setIsActive('Yes');

        } else {
            setMsg("Fill all the blanks");
            setType("warning");
            setOpen(true);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-container__title">New User</h2>
            <form className="form-grid" onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <label>Username</label>
                    <input value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Full Name</label>
                    <input value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input value={email} type="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Gender</label><br />
                    <label><input type="radio" value="Male" checked={gender === "Male"} onChange={e => setGender(e.target.value)} /> Male</label>
                    <label><input type="radio" value="Female" checked={gender === "Female"} onChange={e => setGender(e.target.value)} /> Female</label>
                    <label><input type="radio" value="Other" checked={gender === "Other"} onChange={e => setGender(e.target.value)} /> Other</label>
                </div>
                <div className="form-group">
                    <label>Active</label>
                    <select value={isActive} onChange={e => setIsActive(e.target.value)}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group button-container">
                    <button type="submit">Create</button>
                </div>
            </form>

            {/* Snackbar + Alert */}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity={type} onClose={handleClose}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
