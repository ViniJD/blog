import{BrowserRouter as Router} from "react-router-dom";
import AuthProvider from './contexts/auth';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import RoutesIndex from "./routes";

function App() {
  return (
    <AuthProvider>
      <ToastContainer/>
      <Router>
        <RoutesIndex/>
      </Router>
    </AuthProvider>
  );
}

export default App
