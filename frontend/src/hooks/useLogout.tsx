import { useNavigate } from "react-router-dom"
import Storage from "../utils/storage";

// handle logout
const useLogout = () =>{
    const navigate = useNavigate()
    
    
    const logout = () => {
        new Storage().clear();
        navigate("/login")
    }
    
    return {
        logout
    }
}

export default useLogout

