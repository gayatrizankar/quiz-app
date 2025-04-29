import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './login';
import SignIn from './sigin';
import Home from './home';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={
            <Login

              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
            />
          }
        />
        <Route
          path="/signIn"
          element={
            <SignIn
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
            />
          }
        />
        <Route path="/home" element={<Home email={email} />} />
      </Routes>
    </Router>
  );
};

export default App;
