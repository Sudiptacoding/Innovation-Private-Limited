import React from 'react';
import ReactPaginate from 'react-paginate';
import useAxios from '../../hooks/useAxios'

const Pagenate = ({ setProduct }) => {
    const axiosData = useAxios();
    const handlePageClick = (e) => {
        axiosData.get(`https://dummyjson.com/products?limit=6&skip=${e.selected * 6}`)
            .then(res => {
                setProduct(res.data.products)
            })
    }

    return (
        <div>
            <div className='join flex items-end justify-center'>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={17}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    pageLinkClassName="join-item btn"
                    containerClassName="join-item btn"
                    activeLinkClassName=''

                />
            </div>
        </div>
    );
};

export default Pagenate;