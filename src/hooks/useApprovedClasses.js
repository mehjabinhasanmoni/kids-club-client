import { useQuery } from "@tanstack/react-query";


const useApprovedClasses = () => {

    const {data: approvedclasses = [], isLoading: loading, refetch} = useQuery({
        queryKey: ['approvedclasses'],
        queryFn: async() => {
            const res = await fetch('https://kids-club-server-production.up.railway.app/approvedclasses');
            return res.json();
        }
    })

    return [approvedclasses, loading, refetch]

}

export default useApprovedClasses;