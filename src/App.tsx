import "./App.scss";
import { Route, Routes } from "react-router";
import Welcome from "./pages/welcome/Welcome";
import Home from "./pages/home/Home";
import PrivateRoute from "./router/privateRoute";
import Game from "./pages/game/Game";

function App() {
  return (
    <>
      <Routes>
        <Route path="welcome" element={<Welcome />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="game">
            <Route index element={<Game />} />
            <Route path="secret-santa" element={<Game />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
