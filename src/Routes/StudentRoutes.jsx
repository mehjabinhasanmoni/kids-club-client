import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useStudent from "../hooks/useStudent";

const StudentRoutes = ({children}) => {
    const { user , loading} = useAuth();
    const location = useLocation();
    const [isStudent, isStudentLoading] = useStudent();

    if (loading || isStudentLoading  ) {
        return <progress className="progress w-56"></progress>
    }

    if(user && isStudent  ) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default StudentRoutes;