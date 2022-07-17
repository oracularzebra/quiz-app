import { Route, Routes } from "react-router-dom";
import Footer from "./Components/footer";
import Header from "./Components/header";
import Home from "./Components/home";

function App() {
  return (
    <div className="grid h-full ">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
