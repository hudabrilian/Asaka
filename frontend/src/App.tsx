import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { AddBotPage } from "./pages/AddBotPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PluginPage } from "./pages/PluginPage";
import Header from "./sections/Header";
import { getUserDetails } from "./utils/api";
import { AuthContext } from "./utils/context/AuthContext";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getUserDetails().then(({ data }) => {
      setUser(data);
      setLoggedIn(true);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loggedIn: loggedIn,
        updateUser: setUser,
        updateLoggedIn: setLoggedIn,
      }}
    >
      <div className="bg-stone-800 min-h-screen max-w-screen select-none">
        <Header />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {loggedIn && (
            <>
              <Route path="/add/:id" element={<AddBotPage />} />
              <Route path="/dashboard" element={<MenuPage />} />
              <Route path="/dashboard/:id" element={<DashboardPage />}>
                <Route path=":plugin" element={<PluginPage />} />
              </Route>
            </>
          )}
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
