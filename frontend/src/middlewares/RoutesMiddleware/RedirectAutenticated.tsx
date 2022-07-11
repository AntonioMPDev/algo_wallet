
import { CircularProgress } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from "../../features/api";
import Storage from '../../utils/storage';

type ProtectedRoutesProps = {
    children: {}
}

const RedirectAutenticated = ({ children }: ProtectedRoutesProps) => {
    if(new Storage().get("token") == null) return <Navigate to="/" />

    return <CheckMe children={children}/>;
};

export default RedirectAutenticated


const CheckMe = ({ children }: ProtectedRoutesProps) => {
    const { data, isLoading, error } = useGetMeQuery("");

    if(isLoading) return <CircularProgress /> 

    if (data) return <><Navigate to="/" replace /></>;


    return <>{children}</>;
}


