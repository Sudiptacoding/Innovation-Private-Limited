import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useAllData = () => {
    const axiosData = useAxios();
    const { isPending, error, data:allproduct, refetch } = useQuery({
        queryKey: ['allproduct'],
        queryFn: () =>
            axiosData.get('/products')
                .then(res => {
                    return res.data.products
                })
    })
    return { isPending, error, allproduct, refetch }
};

export default useAllData;