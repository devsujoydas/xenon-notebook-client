import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./router/router";
import Header from "./components/Header";
import Footer from "./components/Footer"; 


export default function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter> 
          <Header />
          <main className="">
            <Router />
          </main>
          <Footer />
      
      </BrowserRouter>
    </div>
  );
}
