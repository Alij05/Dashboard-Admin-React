import React, { useEffect, useState } from "react";
import "./EditForm.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useLocation, useNavigate, useParams } from "react-router";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EditForm() {

    const [userNumber, setUserNumber] = useState(0)
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

    const userID = useParams().userID
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://dashboard-admin-react-91011-default-rtdb.firebaseio.com/users.json')
            .then(response => response.json())
            .then(data => {
                let editUser = Object.entries(data).find(([key, value]) => key == userID)
                setUserNumber(editUser[1].id)
                setUsername(editUser[1].username)
                setFullName(editUser[1].fullName)
                setEmail(editUser[1].email)
                setPassword(editUser[1].password)
                setPhone(editUser[1].phone)
                setAddress(editUser[1].address)
                setGender(editUser[1].gender)
                setIsActive(editUser[1].isActive)

            })
    }, [])

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
            const newUserInfo = { id: userNumber, username, fullName, email, password, phone, address, gender, isActive };

            fetch(`https://dashboard-admin-react-91011-default-rtdb.firebaseio.com/users/${userID}.json`, {
                method: 'PUT',
                body: JSON.stringify(newUserInfo)
            }).then(response => {
                if (response.ok) {
                    showAlert('Edit User Successfully', 'success');
                    navigate('/users')
                } else {
                    showAlert('Error :(', 'error');
                }
            });
        } else {
            showAlert("Fill all the blanks", 'warning');
        }

    };

    return (
        <div className="form-container">
            <h2 className="form-container__title">Edit User</h2>
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
