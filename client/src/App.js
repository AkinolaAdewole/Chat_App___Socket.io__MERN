import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";

function App() {
  // Get user authentication data from Redux store
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div
      className="App"
      style={{
        height:
          window.location.href === "http://localhost:3000/chat"
            ? "calc(100vh - 2rem)"
            : "auto",
      }}
    >
      {/* Add background blur effects */}
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      {/* Define routes using React Router */}
      <Routes>
        {/* Default route based on user authentication status */}
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />

        {/* Home page */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />

        {/* Authentication page */}
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />

        {/* User profile page */}
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />

        {/* Catch-all route for undefined routes */}
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />

        {/* Chat page */}
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
