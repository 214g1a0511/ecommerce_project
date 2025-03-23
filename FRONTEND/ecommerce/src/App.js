import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { AllRoutes } from "./AllRoutes/AllRoutes";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <AllRoutes/>
      <Footer/>
    </>
  );
}

export default App;
