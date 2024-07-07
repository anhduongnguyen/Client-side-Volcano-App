import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./ui/Header";
import Footer from './ui/Footer';
import Home from "./pages/Home";
import VolcanoList from "./pages/VolcanoList";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import VolcanoInfo from './pages/VolcanoInfo';

// Handle the navigation of the pages
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/volcanolist" element={<VolcanoList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/volcano/:id" element={<VolcanoInfo />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

