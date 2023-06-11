import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const useClass = () => {
    
    const {user} = useContext(AuthContext);
    
};

export default useClass;