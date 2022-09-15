import { Route, Routes } from "react-router-dom";
import Footer from "./Components/footer";
import Header from "./Components/header";
import Home from "./Components/home";
import TitleCard from "./Components/AbstractCard";
import LoginPage from "./Components/LoginPage/login";
import { useEffect, useState, React } from "react";
import app from "./Components/firebaseIntegration";
import { child, get, getDatabase, ref, set } from "firebase/database";
function App() {
  
  const [UUID, setUUID] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const database = getDatabase(app);

  useEffect(()=>{
      //We will retrieve all the data of the user
      if(UUID != null && !isNewUser){
        function checkIfUUIDExists(){
          const dbRef = ref(database);
          get(child(dbRef, `/users/${UUID}`)).then(snapshot=>{
            if(snapshot.exists()){
              setLoggedIn(true);
            }
            else{
              setLoggedIn(false);
            }
          })
      }
      checkIfUUIDExists();
    }
    else if(isNewUser){
      function addNewUser(){
        set(ref(database, "users/"+UUID), {
          first_login_date:`${new Date()}`
        })
        setLoggedIn(true);
      }
      addNewUser();
    }
  }, [UUID]);

  return (
    <div className="overflow-scroll">
      <Header/>
      <Routes>
        <Route path="/" element={<LoginPage setUUID={setUUID} loggedIn={loggedIn} setIsNewUser={setIsNewUser}/>}></Route>
        <Route path="/home" element={<Home category={category} isLoggedIn={loggedIn} difficulty={difficulty} setCategory={setCategory} setDifficulty={setDifficulty} UUID={UUID}/>}></Route>
        <Route path="home/:category/:difficultyLevel" element={<TitleCard UUID={UUID}/>}></Route>
        <Route path="/*" element={<LoginPage setUUID={setUUID} loggedIn={loggedIn} setIsNewUser={setIsNewUser}/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
