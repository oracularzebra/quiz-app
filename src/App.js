import { Route, Routes } from "react-router-dom";
import Footer from "./Components/footer";
import Header from "./Components/header";
import Home from "./Components/home";
import TitleCard from "./Components/AbstractCard";

function App() {
  return (
    <div className="grid h-full bg-slate-300">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/:categoryName" element={<TitleCard/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
