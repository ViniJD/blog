import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}
