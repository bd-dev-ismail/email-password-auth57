
import {getAuth} from 'firebase/auth';
import './App.css';
import app from './firebase/firebase.init';

const auth = getAuth(app);
function App() {
  return (
    <div className="App">
      <form>
        <input type="email" name="" id="" placeholder='Enter Your Email'/> <br />
        <input type="password" name="" id="" placeholder='Enter Your Password'/>
      </form>
    
    </div>
  );
}

export default App;
