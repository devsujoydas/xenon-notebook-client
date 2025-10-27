import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./router/router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter>
         <Toaster />
          <Header />
          <main className="w-main min-h-[79dvh] py-6 ">
            <Router />
          </main>
          <Footer />
      
      </BrowserRouter>
    </div>
  );
}
