import Home from "./Pages/Home/Home"
import UsersList from "./Pages/Users/UsersList"
import EditUser from "./Pages/EditUser/EditUser"
import NewUser from "./Pages/NewUser/NewUser"
import Products from "./Pages/Products/Products"


let routes = [
    { path: '/', element: <Home /> },
    { path: '/users', element: <UsersList /> },
    { path: '/user/:userID', element: <EditUser /> },
    { path: '/newUser', element: <NewUser /> },
    { path: '/products', element: <Products /> },
    // {path:'/product/:productID', element: <Products />},
]

export default routes