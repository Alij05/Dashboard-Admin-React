import React, { useState } from "react";
import "./Form.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Form() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [isActive, setIsActive] = useState('Yes');

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // "error", "success", etc.

    const showAlert = (message, severity = 'success') => {
        setAlertMsg(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (username && fullName && email && password && phone && address && gender && isActive) {
            const newUserInfo = { username, fullName, email, password, phone, address, gender, isActive };

            fetch('https://dashboard-admin-react-91011-default-rtdb.firebaseio.com/users.json', {
                method: 'POST',
                body: JSON.stringify(newUserInfo)
            }).then(response => {
                if (response.ok) {
                    showAlert('New User Added', 'success');
                } else {
                    showAlert('Error :(', 'error');
                }
            });
        } else {
            showAlert("Fill all the blanks", 'warning');
        }

        // Clear fields
        setUsername('');
        setFullName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setAddress('');
        setGender('');
        setIsActive('Yes');
    };

    return (
        <div className="form-container">
            <h2 className="form-container__title">New User</h2>
            <form className="form-grid" onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <label>Username</label>
                    <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Full Name</label>
                    <input value={fullName} type="text" onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input value={phone} type="text" onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input value={address} type="text" onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Gender</label><br />
                    <label><input checked={gender === 'Male'} type="radio" value="Male" onChange={(e) => setGender(e.target.value)} /> Male</label>
                    <label><input checked={gender === 'Female'} type="radio" value="Female" onChange={(e) => setGender(e.target.value)} /> Female</label>
                    <label><input checked={gender === 'Other'} type="radio" value="Other" onChange={(e) => setGender(e.target.value)} /> Other</label>
                </div>
                <div className="form-group">
                    <label>Active</label>
                    <select value={isActive} onChange={(e) => setIsActive(e.target.value)}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className="form-group button-container">
                    <button type="submit">Create</button>
                </div>
            </form>

            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleAlertClose} severity={alertSeverity}>
                    {alertMsg}
                </Alert>
            </Snackbar>
        </div>
    );
}
