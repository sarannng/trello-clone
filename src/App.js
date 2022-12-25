import logo from './logo.svg';
import './App.css';
import { db } from './Services/firebase-config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  getFirestore,
 onSnapshot,
 deleteDoc,
 
   
} from "firebase/firestore";
import { async } from '@firebase/util';
import BasicExample from './components/Navbar/navbar';
import { Container, Button } from 'react-bootstrap';
import MyboardList from './components/Navbar/myboardlist';
import {    Routes, Route } from 'react-router-dom';
import Notfound from './components/Navbar/notfound';
import LandingPage from './components/Navbar/landing';
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from './components/Navbar/main';
import Board from './components/Navbar/board';

function App() {



  async function testdata(){
    console.log("1") 
    await addDoc(collection(db, "testing"), {"name": "etst"})
    console.log("2")
  }
  return (
   <>

<Router>

<div>
  {/* <ul>
    <li>
      <Link to = '/'>Login</Link>
    </li>

    <li>
      <Link to = '/adh'>Admin-Home</Link>
    </li>

    <li>
      <Link to = 'big-screen'>Bs</Link>
    </li>

    <li>
    <Notfound/>
    </li>
  </ul> */}

  {/* <Navbar/> */}
 

  <Routes>
  
  <Route path= '/'  exact element ={<LandingPage/>}/>
  <Route path= '/:uid'  element ={<MainPage/>}/>
  <Route path= '/:uid/board-details/:bid'  element ={<Board/>}/>
   
  <Route path= '*'  element ={<Notfound/>}/>

</Routes>
</div>



</Router>
    {/* marker */}




   </>
  );
}

export default App;
