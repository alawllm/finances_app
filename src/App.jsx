import { Routes, Route } from 'react-router-dom'

import Navigation from './components/routes/navigation/navigation.component'
import Home from './components/routes/home/home.component'
import Authentication from './components/routes/authentication/authentication.component'
import Records from './components/routes/records/records.component'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/records' element={<Records />} />
      </Route>
    </Routes>

  )
}

export default App
