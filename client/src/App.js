import './App.css';
import { useState } from 'react';
import Home from './Components/Home';
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn';
import Profile from './Components/Profile';
import Navigation from './Components/Navigation';
import AllServices from './Components/AllServices';
import BookingRequest from './Components/BookingRequest';
import AddService from './Components/AddService';
import BookService from './Components/BookService';
import { Switch, Route} from 'react-router-dom';
import { SignInContext, UserContext } from './Helper/Context';
import EditProfile from './Components/EditProfile';
import MakePayment from './Components/MakePayment';
import YourServices from './Components/YourServices';
import EditService from './Components/EditService';
import Chat from './Components/Chat';
import News from './Components/News';


// export const UserContext = createContext()

function App() {

  const [signedIn, isSignedIn] = useState (false);
  const [userId, setUserId] = useState ("");
  // const [serviceId, setServiceId] = useState ("");
  // const [userData, setUserData] = useState({
  //   token: undefined,
  //   user: undefined,
  // })


  return (
    <div className="App">

    <SignInContext.Provider value={ {signedIn, isSignedIn} }>
      <UserContext.Provider value={ {userId, setUserId}}>
    
      <Navigation />

      <br/>
      
      <Switch>
        <Route exact path = "/"><Home /></Route>
        <Route path = "/signup"><SignUp /></Route>
        <Route path = "/signin"><SignIn /></Route>

        <Route path = "/profile/:id"><Profile/></Route>
        <Route path = "/editprofile/:id"><EditProfile/></Route>
        <Route path = "/:id/allservices"><AllServices/></Route>
        <Route path = "/:id/yourservices"><YourServices/></Route>
        <Route path = "/bookingrequest/:id"><BookingRequest/></Route>
        <Route path = "/payment/:id"><MakePayment/></Route>
        <Route path = "/chat/:id"><Chat/></Route>
        <Route path = "/news/:id"><News/></Route>
        <Route path = "/addservice"><AddService/></Route>
        <Route path = "/editservice"><EditService/></Route>
        <Route path = "/bookservice/:id"><BookService/></Route>
      </Switch>
      
      </UserContext.Provider>
    </SignInContext.Provider>

    </div>
  );
}

export default App;