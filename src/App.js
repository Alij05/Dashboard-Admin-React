import './App.css';
import { useRoutes } from 'react-router';
import routes from './Routes';
import TopBar from './Components/TopBar/TopBar';
import SideBar from './Components/SideBar/SideBar';

function App() {
  let router = useRoutes(routes)

  return (
    <>
      <TopBar />
      <div className='container'>
        <SideBar />
        {router}
      </div>
    </>
  )
}

export default App;
