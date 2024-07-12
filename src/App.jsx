import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Student from './student/Student'
import AddStudent from './student/AddStudent'
import EditStudent from './student/EditStudent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error403 from './components/Error403'
import ViewStudent from './student/ViewStudent'

function App() {

  return (
    <>
    <ToastContainer theme='dark'/>
      <Routes>
          <Route path='/' element={<Student />}></Route>
          <Route path='/add-student' element={<AddStudent />}></Route>
          <Route path='/student/:id/edit' element={<EditStudent />}></Route>
          <Route path='/student/:id/delete' element={<EditStudent />}></Route>
          <Route path='/student/:id/' element={<ViewStudent />}></Route>
          <Route path='/error-403' element={<Error403 />}></Route>
      </Routes>
    </>
  )
}

export default App
