import { child, get, getDatabase, ref } from "firebase/database";
import app from "../firebaseIntegration";

const getAttempts = async(UUID)=>{

    const db = getDatabase(app);
    const dbRef = ref(db);

    const onion = await get(child(dbRef, "users/"+UUID));
    if(onion.exists()){
        return onion.val();
    }
    else{
        return "Does not Exist";
    }
}
export default getAttempts;