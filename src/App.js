import { Routes, Route } from "react-router-dom";
import Footer from "./Components/footer";
import Header from "./Components/header";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header/>}>
        </Route>
        <Route path="/" element={<Footer/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
