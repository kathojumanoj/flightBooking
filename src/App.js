import Home from './Home';
import './App.css';
import { Routes, NavLink, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Avail from './Avail';
import MyTickets from './MyTickets';
import BookForm from './BookForm';
import { BrowserRouter } from 'react-router-dom';
import Head from './Head';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Home/>
       </BrowserRouter>
    </div>
  );
}

export default App;
