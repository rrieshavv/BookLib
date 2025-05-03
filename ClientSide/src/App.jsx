import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { routeConfig } from "./routes/routeConfig";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {routeConfig.map(
          ({ path, component: Component, public: isPublic, allowedRoles }) => {
            const element = isPublic ? (
              <Component />
            ) : (
              <RoleProtectedRoute allowedRoles={allowedRoles}>
                <Component />
              </RoleProtectedRoute>
            );

            return <Route key={path} path={path} element={element} />;
          }
        )}
      </Routes>
    </>
  );
}

export default App;
