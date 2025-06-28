import React, { useEffect, useState } from 'react'
import './UsersList.css'
import { Link } from 'react-router'
import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'

export default function UsersList() {
  const [users, setUsers] = useState([])
  const [selectedUserKey, setSelectedUserKey] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [getData, setGetData] = useState(false)

  useEffect(() => {
    fetch('https://dashboard-admin-react-91011-default-rtdb.firebaseio.com/users.json')
      .then(response => response.json())
      .then(data => {
        if (data) {
          const loadedUsers = Object.entries(data).map(([key, value]) => ({
            ...value,
            firebaseKey: key
          }))
          setUsers(loadedUsers)
        } else {
          setUsers([])
        }
      })
  }, [getData])

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
    },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => {
        return (
          <Link to="/" className="link">
            <div className='userListUser'>
              <img src='./images/profile.jfif' className="userListImg" alt="profile" />
              {params.row.username}
            </div>
          </Link>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200
    },
    {
      field: 'isActive',
      headerName: 'Active',
      width: 120
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 160
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/user/${params.row.firebaseKey}`} className="link">
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="userListDelete"
              onClick={() => {
                setOpenDialog(true)
                setSelectedUserKey(params.row.firebaseKey)
              }}
            />
          </div>
        )
      }
    }
  ]

  const deleteUserHandler = () => {
    fetch(`https://dashboard-admin-react-91011-default-rtdb.firebaseio.com/users/${selectedUserKey}.json`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          setGetData(prev => !prev)
        }
      })
      .catch(err => {
        console.error("Failed to delete user:", err)
      })

    setOpenDialog(false)
  }

  const closeDialogHandler = () => {
    setOpenDialog(false)
  }

  return (
    <div className='userList'>
      <DataGrid
        rows={users}
        columns={columns}
        disableSelectionOnClick
        pageSize={4}
        getRowId={(row) => row.firebaseKey} //  * Unique ID for each Row *
      />

      <Dialog
        open={openDialog}
        onClose={closeDialogHandler}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogHandler} color="primary">
            No
          </Button>
          <Button onClick={deleteUserHandler} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
