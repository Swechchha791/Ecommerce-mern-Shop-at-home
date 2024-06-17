import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-16 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
