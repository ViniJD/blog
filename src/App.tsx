import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import "izitoast/dist/css/iziToast.min.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}
