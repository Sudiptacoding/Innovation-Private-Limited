import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

const useAllCategory = () => {
    const axiosData = useAxios();
    const { isPending, error, data: allCategory, refetch } = useQuery({
        queryKey: ['allCategory'],
        queryFn: () =>
            axiosData.get('/products/categories')
                .then(res => {
                    return res.data
                })
    })
    return { isPending, error, allCategory, refetch }
};

export default useAllCategory;