import './App.css';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Logins';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';
import Transactions from './components/Transactions';
import Forgotpassword from './components/Forgotpassword';
import Note from './components/Note';
import Editnote from './components/Editnote';
import MyBlockNoteEditor from './components/MyBlockNoteEditor';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/Signup' element={<Signup></Signup>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/transactions' element={<Transactions></Transactions>}></Route>
          <Route path='/forgotpassword' element={<Forgotpassword></Forgotpassword>}></Route>
          <Route path='/addnote' element={<Note></Note>}></Route>
          <Route path='/editnote' element={<Editnote></Editnote>}></Route>
          <Route path='/ka' element={<MyBlockNoteEditor></MyBlockNoteEditor>}></Route>
          <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
