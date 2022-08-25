import { Route, Routes } from "react-router-dom";
// local
import { PrivateRoute } from "components/Routes/PrivateRoute";
import { PublicRoute } from "components/Routes/PublicRoute";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<PublicRoute restricted>{<LoginPage />}</PublicRoute>}
      />

      <Route
        path="/chat"
        element={<PrivateRoute>{<HomePage />}</PrivateRoute>}
      />
    </Routes>
  );
}

export default App;
