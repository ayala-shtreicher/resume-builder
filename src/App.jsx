import './App.css'
import Form from './components/Form'
import DownloadPdf from './components/DownloadPdf'
import Login from './pages/Login'
import LogOut from './pages/LogOut'
import SignUp from './pages/SignUp'
import Navbar from './pages/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyPage from './pages/ListResumes'
import Provider from './context/resumes'

function App() {
  return (
    <>
      <Provider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/logout' element={<LogOut />}></Route>
            <Route path='/list' element={<MyPage />}></Route>
            <Route path='/form' element={<Form />}></Route>
            <Route path='/resume/:index' element={<DownloadPdf />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
