import { Route, Routes } from "react-router-dom";
// local
import { PrivateRoute } from "components/Routes/PrivateRoute";
import { PublicRoute } from "components/Routes/PublicRoute";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute>{<HomePage />}</PrivateRoute>} />

      <Route
        path="/login"
        element={<PublicRoute restricted>{<LoginPage />}</PublicRoute>}
      />
    </Routes>
  );
}

export default App;
