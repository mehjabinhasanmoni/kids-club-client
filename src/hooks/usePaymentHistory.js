import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePaymentHistory = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {refetch, data: paymentshistory = []} = useQuery({
        queryKey: ['paymentshistory', user?.email],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure(`https://kids-club-server-production.up.railway.app/paymentshistory?email=${user?.email}`)
            return res.data;
        }
    })

    return [paymentshistory, refetch]

}

export default usePaymentHistory;
