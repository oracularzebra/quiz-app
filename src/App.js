import { Route, Routes } from "react-router-dom";
import Footer from "./Components/footer";
import Header from "./Components/header";
import Home from "./Components/home";
import TitleCard from "./Components/AbstractCard";

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/:category/:difficultyLevel" element={<TitleCard/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
