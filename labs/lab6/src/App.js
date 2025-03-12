import { Routes, Route } from "react-router-dom";
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from './components/Footer';
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

