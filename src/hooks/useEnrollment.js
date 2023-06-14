import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useEnrollment = () => {
    
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: enrollment = [] } = useQuery({
        queryKey: ['enrollment', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/enrollment?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [enrollment, refetch]

    
};

export default useEnrollment;