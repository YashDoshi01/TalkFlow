import Register from "./components/Register";
import Login from "./components/Login";
import Chats from "./components/Chats";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PrivateRoutes from "./components/PrivateRoute";

function App() {
  // Check local storage for userLogged state
  const [userLogged, setUserLogged] = useState(() => {
    return localStorage.getItem('userLogged') === 'true'; // Initial state based on local storage
  });

  useEffect(() => {
    // Store userLogged state in local storage
    localStorage.setItem('userLogged', userLogged);
  }, [userLogged]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<PrivateRoutes auth={userLogged} />}>
          <Route path="/chats" element={<Chats handleLoggedin={setUserLogged} userLogged={userLogged} />} exact />

        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login handleLoggedin={setUserLogged} userLogged={userLogged} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
