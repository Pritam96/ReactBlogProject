import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { authService } from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (!userData) {
          console.log("Current user not exist");
          return dispatch(logout());
        }
        dispatch(login({ userData }));
      })
      .catch((error) => console.log(`Error: ${error}`))
      .finally(() => setIsLoading(false));
  }, []);

  return !isLoading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
};

export default App;
