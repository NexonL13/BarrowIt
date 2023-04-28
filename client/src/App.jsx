import './App.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'

function App() {
  return (
    <div className="flex flex-col justify-center align-middle w-full h-full">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<Add/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
