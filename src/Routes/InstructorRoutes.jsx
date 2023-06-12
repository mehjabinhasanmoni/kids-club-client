import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";

const InstructorRoutes = ({children}) => {
    const { user , loading} = useAuth();
    const location = useLocation();
    const [isInstructor, isInstructorLoading] = useInstructor();

    if (loading || isInstructorLoading  ) {
        return <progress className="progress w-56"></progress>
    }

    if(user && isInstructor  ) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default InstructorRoutes;