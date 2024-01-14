import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserProfile, setError ,deactivateAccount } = useAuth();
  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(currentUser.age);
  const [email, setEmail] = useState(currentUser.email);
  //const [password, setPassword] = useState(currentUser.password);
  
  const clearForm = () => {
    setName("");
    setAge(0);
    setEmail("");
    navigate("/chathome");
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const user = currentUser;
      const profile = {
        name,
        age,
        email,
      };
     const isUpdated =  await updateUserProfile(currentUser.userName, profile);
     if(isUpdated){
      navigate("/chathome");
     }
    } catch (e) {
      setError("Failed to update profile");
    }

    setLoading(false);
  };
  const handleDeactivate = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
     const isdeactivated =  await deactivateAccount(currentUser.userName);
     if(isdeactivated){
      navigate("/");
     }
    } catch (e) {
      setError("Failed to deactivate your profile");
    }

    setLoading(false);
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="user-name"
                name="userName"
                type="text"
                value={currentUser.userName}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                disabled
              />
            </div>
            <br />
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <input
                id="age"
                name="age"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <br />
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
          </div>
          {/* <div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              disabled
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              value={password}
            />
          </div>
          <br /> */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900"
            >
              Update
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={clearForm}
              className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-800 hover:bg-sky-900"
            >
              Go to chats
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between">
            <button
              onClick={handleDeactivate}
              disabled={loading}
              className=" w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-800 hover:bg-sky-900"
            >
              Deactivate your Account
            </button>
          </div>
      </div>
    </div>
  );
}
