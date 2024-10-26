import "./App.css";
import Dashboard from "@/components/pages/Dashboard";
import { PrivateRoute } from "@/components/PrivateRoute";
import Login from "@/components/pages/Login";
import Signup from "@/components/pages/Signup";
import { AuthProvider } from "@/context/AuthContext";
import Logout from "@/components/pages/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/components/pages/ErrorPage";
import NotFound from "@/components/pages/PageNotFound";

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => {
        // Reset the state of your app here
        window.location.href = "/";
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
