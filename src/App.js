
import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import ManageUsers from './components/ManageUsers'
import Config from './components/Config';
import Crone from './components/Crone';
import Events from './components/Events'
import ManageCustomers from './components/ManageCustomers'
import Logout from './components/Logout'
import ManageTags from './components/ManageTags'
import Sidebar from './components/Sidebar';




function App() {
  return (
    <>
    <div className="App">
    <Sidebar />
    <div className="content">
    <Routes>
    
    <Route path="/manageusers" element={<ManageUsers/>} />
    <Route path="/config" element={<Config />} />
    <Route path="/crone" element={<Crone/>} />
    <Route path="/events" element={<Events />} />
    <Route path="/managecustomers" element={<ManageCustomers />} />
    <Route path="/managetags" element={<ManageTags />} />
    <Route path="/logout" element={<Logout />} />
   </Routes>
   </div>
   </div>
   </>
  );
}

export default App;
