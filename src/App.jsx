import { Routes, Route } from 'react-router-dom'

import Navigation from './components/routes/navigation/navigation.component'
import Home from './components/routes/home/home.component'
import Authentication from './components/routes/authentication/authentication.component'
import ReadRecords from './components/routes/read-records/read-records.component'
import AddRecords from './components/routes/add-records/add-records.component'

import './App.css'

function App() {

  return (
    <Routes>
      {/* every route is rendered inside of the navigation route  */}
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/read-records' element={<ReadRecords />} />
        <Route path='/add-records' element={<AddRecords />} />
      </Route>
    </Routes>

  )
}
export default App
