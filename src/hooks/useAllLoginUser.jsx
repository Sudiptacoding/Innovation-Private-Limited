import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useAllLoginUser = () => {
    const axiosData = useAxios();
    const { isPending, error, data: loginUser, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            axiosData.get('/users')
                .then(res => {
                    return res.data.users
                })
    })
    return { isPending, error, loginUser, refetch }
};

export default useAllLoginUser;