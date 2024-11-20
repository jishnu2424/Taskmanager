import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from '../Components/Landing';
import Controllpanel from '../Components/Controllpanel';
import Login from '../Components/Login';
import Register from '../Components/Register';
import User from '../Components/User';
import AddTasks from '../Components/AddTasks';
import TaskDetail from '../Components/TaskDetail';

function Router() {

  return (
    <div>
      <BrowserRouter>
      <Controllpanel/>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/user' element={<User />} />
          <Route path='/addtask' element={<AddTasks />} />
          <Route path="/user/task/:id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
