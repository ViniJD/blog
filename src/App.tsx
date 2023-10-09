import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Routes from "./routes";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}
