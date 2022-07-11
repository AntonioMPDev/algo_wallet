
import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from "../../features/api";
import Storage from '../../utils/storage';

type ProtectedRoutesProps = {
    children: {}
}

const ProtectedRoute = ({ children }: ProtectedRoutesProps) => {
    if(new Storage().get("token") == null) return <Navigate to="/login" />

    return <CheckMe children={children}/>
};

export default ProtectedRoute


const CheckMe = ({ children }: ProtectedRoutesProps) => {
    const { data, isLoading, error } = useGetMeQuery("");
    
    if(isLoading) return <CircularProgress /> 
    if (!data || new Storage().get('token') === "") return <><Navigate to="/login" replace /></>;


    return <>{children}</>;
}

