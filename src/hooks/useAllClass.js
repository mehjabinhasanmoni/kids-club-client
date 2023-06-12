import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAllClass = () => {
    const { loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: allClass = [] } = useQuery({
        queryKey: ['classes'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure('/allClasses')
            console.log('res from axios-- admin manage classes', res)
            return res.data;
        },
    })

    return [allClass, refetch]

};

export default useAllClass;