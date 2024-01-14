import { BrowserRouter as Router, Routes, Route, Navigate,  } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Register from "./components/accounts/Register";
import Login from "./components/accounts/Login";
import Profile from "./components/accounts/Profile";
import WithPrivateRoute from "./utils/WithPrivateRoute";
import ChatLayout from "./components/layouts/ChatLayout";
import Header from "./components/layouts/Header";
import ErrorMessage from "./components/layouts/ErrorMessage";

function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Header />
        <ErrorMessage />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <WithPrivateRoute>
                <Profile />
              </WithPrivateRoute>
            }
          />
          <Route
            path="/chathome"
            element={
              <WithPrivateRoute>
                <ChatLayout />
              </WithPrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
  
}

export default App;