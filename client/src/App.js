import React from "react";
import { Route, Routes } from "react-router";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ToDoList from "./pages/ToDo/ToDoList";
import ToDoListAdmin from "./pages/ToDoAdmin/ToDoListAdmin";
import UserLog from "./pages/UserLog/UserLog";
import UserManual from "./pages/UserManual/UserManual";
import "./App.css";
import "antd/dist/reset.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/to-do-list" element={<ToDoList />} />
      <Route path="/to-do-list-admin" element={<ToDoListAdmin />} />
      <Route path="/user-log" element={<UserLog />} />
      <Route path="/user-manual" element={<UserManual />} />
    </Routes>
  );
}

export default App;
