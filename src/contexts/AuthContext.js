import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const SERVER_URL = "http://localhost:5000";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function register(username, name, password, email, age) {
    try {
      const response = await axios.post(`${SERVER_URL}/auth/register`, {
        username,
        name,
        password,
        email,
        age,
      });
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
      return false;
    }
  }
  async function login(username, password) {
    try {
      const response = await axios.post(`${SERVER_URL}/auth/login`, {
        username,
        password,
      });
      if (!response.data.success) {
        setError("Login failed. Please try again.");
        return false;
      }
      setToken(response.data.token);
      setCurrentUser(response.data.user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
      return false;
    }
  }

  async function logout(username) {
    try {
      const response = await axios.put(
        `${SERVER_URL}/auth/logout/${username}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        setError("Successfully logged out.");
        return false;
      }
      setCurrentUser({});
      setToken("")
      return true;
    } catch (error) {
      console.error("logged out failed:", error);
      setError("Registration failed. Please try again.");
      return false;
    }
  }

  async function updateUserProfile(username, bodyData) {
    try {
      const response = await axios.put(
        `${SERVER_URL}/profile/update/${username}`,
        bodyData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        setError("Registration failed. Please try again.");
        return false;
      }
      setCurrentUser(response.data.Profile);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
      return false;
    }
  }
  async function deactivateAccount(username) {
    try {
      const response = await axios.put(
        `${SERVER_URL}/profile/deactivate/${username}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        setError("Deactivation failed. Please try again.");
        return false;
      }
      setCurrentUser({});
      setToken("")
      return true;
    } catch (error) {
      console.error("Deactivation failed:", error);
      setError("Deactivation failed. Please try again.");
      return false;
    }
  }
  // Simulate the effect of a loading state while fetching user data
  useEffect(() => {
    const fakeUser = {
      email: "sample@example.com",
      password: "sample",
      name: "newuser",
      userName: "user",
      age: 1,
    };
    setTimeout(() => {
      setCurrentUser(fakeUser);
      setLoading(false);
    }, 1000);

    return () => {
      setToken();
      setError("");
      setCurrentUser();
      setLoading(true);
    };
  }, []);

  const value = {
    currentUser,
    error,
    token,
    setToken,
    setError,
    login,
    register,
    logout,
    updateUserProfile,
    deactivateAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
