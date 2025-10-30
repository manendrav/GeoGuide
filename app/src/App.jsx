import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  const [contentLoaded, setContentLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setContentLoaded(true);
    }, 2000);
    navigate("/", { replace: true });
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div data-theme="light">
      {contentLoaded ? (
        <div className="bg-img">
          <nav className="bg-gray-200">
            <Navbar />
          </nav>

          <div className="min-h-screen overflow-hidden">
            <Outlet />
          </div>

          <footer className="bg-black text-white">
            <Footer />
          </footer>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="leap-frog">
            <div className="leap-frog__dot"></div>
            <div className="leap-frog__dot"></div>
            <div className="leap-frog__dot"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
