import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAllSelectedClass = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {refetch, data: selectedclases = []} = useQuery({
        queryKey: ['selectedclases', user?.email],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure(`https://kids-club-server-production.up.railway.app/selectedclases?email=${user?.email}`)
            return res.data;
        }
    })

    return [selectedclases, refetch]

}

export default useAllSelectedClass;
