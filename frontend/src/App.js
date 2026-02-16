import {Routes,Route,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explorer from "./pages/Explorer";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){

  return(
    <Routes>

      <Route path="/" element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route path="/explorer"
        element={<ProtectedRoute><Explorer/></ProtectedRoute>}
      />

      <Route path="/dashboard"
        element={<ProtectedRoute><Dashboard/></ProtectedRoute>}
      />

    </Routes>
  );
}
