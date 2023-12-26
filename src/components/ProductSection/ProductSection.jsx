import React, { useContext, useEffect, useState } from 'react';
import { UserProvider } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import useAllData from '../../hooks/useAllData';
import useAllCategory from '../../hooks/useAllCategory';

import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaSitemap } from "react-icons/fa";
import useAxios from '../../hooks/useAxios';
import Loader from '../../common/Loader';
import Pagenate from '../Pagenate/Pagenate';
import SearchData from '../../common/SearchData';
import toast from 'react-hot-toast';

const ProductSection = () => {
    const { allproduct } = useAllData();
    const { allCategory } = useAllCategory()
    const { user, addToCard, setAddToCard, addToLove, setAddToLove } = useContext(UserProvider)
    const navigate = useNavigate()
    const axiosData = useAxios()
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axiosData.get(`/products`)
            .then(res => {
                setProduct(res.data.products)
            })
    }, [])
    const [count, setCount] = useState(1706)
    const handelLogOut = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('Token')
        navigate('/')
        toast.success('Logout Successfully !')
    }
    const handelChange = (e) => {
        const priceFind = allproduct?.filter(item => item.price > e)
        setProduct(priceFind)
    }
    const handelCategory = (category) => {
        axiosData.get(`/products/category/${category}`)
            .then(res => {
                setProduct(res.data.products)
            })
    }

    const handelPhoneSearch = (phone) => {
        axiosData.get(`/products/search?q=${phone}`)
            .then(res => {
                setProduct(res.data.products)
            })
    }
    const handelAllProduct = () => {
        setProduct(allproduct)
    }
    const totalAddCard = addToCard.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.price;
    }, 0);

    const totalAddLove = addToLove.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.price;
    }, 0);


    return (
        <div>
            <body className="bg-gray-50 dark:bg-slate-900">

                <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-gray-800 dark:border-gray-700">
                    <nav className="flex items-center w-full px-4 mx-auto basis-full sm:px-6 md:px-8" aria-label="Global">
                        <div className="me-5 lg:me-0 lg:hidden">
                            <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">BD SHOP</a>
                        </div>

                        <div className="flex items-center justify-end w-full ms-auto sm:justify-between sm:gap-x-3 sm:order-3">

                            <div className="">
                                <label className="sr-only">Search</label>
                                <div className="relative">
                                    <SearchData allproduct={allproduct}></SearchData>
                                </div>
                            </div>

                            <div className="flex flex-row items-center justify-end gap-2">
                                <div className="flex-none">
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                            <div className="indicator">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                <span className="badge badge-sm indicator-item">{addToCard?.length}</span>
                                            </div>
                                        </div>
                                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow">
                                            <div className="card-body">
                                                <span className="font-bold text-lg">{addToCard?.length} Items</span>
                                                {
                                                    addToCard?.map((item, i) => {
                                                        return <Link to={`/details/${item.id}`} key={i} className="text-gray-900 font-semibold cursor-pointer hover:bg-gray-100 px-5 rounded-sm py-1">{item?.title}</Link>
                                                    })
                                                }
                                                <div className="card-actions">
                                                    <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-md">Total amount :  $ {totalAddCard}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-none">
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                            <div className="indicator">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                                <span className="badge badge-sm indicator-item">{addToLove.length}</span>
                                            </div>
                                        </div>
                                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-72 bg-base-100 shadow">
                                            <div className="card-body">
                                                <span className="font-bold text-lg">{addToLove.length} Items</span>
                                                {
                                                    addToLove?.map((item, i) => {
                                                        return <Link to={`/details/${item.id}`} key={i} className="text-gray-900 font-semibold cursor-pointer hover:bg-gray-100 px-5 rounded-sm py-1">{item?.title}</Link>
                                                    })
                                                }
                                                <div className="card-actions">
                                                    <button className="w-full bg-gray-900 text-white font-bold py-3 rounded-md">Total amount :  $ {totalAddLove}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                                    <button id="hs-dropdown-with-header" type="button" className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        <img className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800" src={user?.image} alt="Image Description" />
                                    </button>

                                    <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700" aria-labelledby="hs-dropdown-with-header">
                                        <div className="px-5 py-3 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-300">{user?.firstName} {user?.lastName}</p>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-300">{user?.email}</p>
                                        </div>
                                        <div className="py-2 mt-2 first:pt-0 last:pb-0">
                                            <a onClick={handelLogOut} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                                                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                                Logout
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <div className="sticky inset-x-0 top-0 z-20 px-4 bg-white border-y sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center py-4">

                        <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
                            <span className="sr-only">Toggle Navigation</span>
                            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                        </button>

                        <ol className="flex items-center ms-3 whitespace-nowrap" aria-label="Breadcrumb">
                            <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
                                Product Dashboard
                                <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </li>
                            <li className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400" aria-current="page">
                                Dashboard
                            </li>
                        </ol>

                    </div>
                </div>

                <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
                    <div className="px-6">
                        <a className="flex-none text-xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" aria-label="Brand">BD SHOP</a>
                    </div>

                    <nav className="flex flex-col flex-wrap w-full p-6 hs-accordion-group" data-hs-accordion-always-open>
                        <ul className="space-y-1.5">
                            <a onClick={handelAllProduct} className="flex cursor-pointer items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >
                                <BiSolidCategoryAlt />
                                All Product
                            </a>

                            {
                                allCategory?.map((item, i) => {
                                    return <li key={i}>
                                        <a onClick={() => handelCategory(item)} className="flex cursor-pointer items-center gap-x-3.5 py-2 px-2.5  text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                            <BiSolidCategoryAlt />
                                            {item}
                                        </a>
                                    </li>
                                })
                            }

                            <li className="hs-accordion" id="account-accordion">
                                <button type="button" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                    <FaSitemap />
                                    All Phon List

                                    <svg className="hidden w-4 h-4 hs-accordion-active:block ms-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>

                                    <svg className="block w-4 h-4 hs-accordion-active:hidden ms-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </button>

                                <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                                    <ul className="pt-2 ps-2">

                                        {
                                            allproduct?.map((item, i) => {
                                                return <li key={i}>
                                                    <a onClick={() => handelPhoneSearch(item.title)} className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                                                        {item?.title}
                                                    </a>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>

                            <li><div className='pb-10'>
                                <h1 className='py-3 text-sm font-medium text-gray-900 hover:text-gray-500 dark:text-white'>Price</h1>
                                <input type="range" min={0} max={count} onChange={(e) => handelChange(e.target.value)} className="range-xs range dark:bg-white " />
                                <div className="flex justify-between w-full px-2 text-xs">
                                    <span className='dark:text-white'>0</span>
                                    <span className='dark:text-white'>500</span>
                                    <span className='dark:text-white'>1000</span>
                                    <span className='dark:text-white'>1500</span>
                                    <span className='dark:text-white'>2000</span>
                                </div>
                            </div></li>
                        </ul>
                    </nav>
                </div>

                <div className="w-full px-4 pt-10 sm:px-6 md:px-8 lg:ps-72">
                    <header>
                        {
                            product?.length > 0 ? <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 2xl:px-40'>
                                {
                                    product?.slice(0, 6)?.map((item, i) => {
                                        return <div key={i} class="group my-10 flex w-full  flex-col overflow-hidden bg-white">
                                            <a class="relative flex h-80 w-full overflow-hidden">


                                                <img class="absolute top-0 right-0 h-full w-full object-cover" src={item?.thumbnail} alt="product image" />
                                                <div class="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
                                                    <Link to={`/details/${item.id}`} class="mt-4 inline-flex items-center gap-x-1 text-white decoration-2 px-5 py-1 rounded-md bg-black hover:underline font-medium">
                                                        Read more
                                                        <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                                    </Link>
                                                </div>


                                                <div class="absolute -right-16 bottom-0 mr-2 mb-4 space-y-2 transition-all duration-300 group-hover:right-0">
                                                    <button onClick={() => setAddToLove([...addToLove, item])} class="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                                                        </svg>
                                                    </button>
                                                    <button onClick={() => setAddToCard([...addToCard, item])} class="flex h-10 w-10 items-center justify-center bg-gray-900 text-white transition hover:bg-gray-700">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </a>
                                            <div class="mt-4 pb-5 px-5">
                                                <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">{item?.title}</h2>
                                                <p class="mb-2 text-base dark:text-gray-300 text-gray-700">{item?.description.slice(0, 50)}</p>
                                                <div class="flex items-center">
                                                    <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">${item?.price}</p>
                                                    <p class="text-base font-medium bg-green-500 text-white px-2 rounded-full">{item?.stock} stock</p>
                                                    <p class="ml-auto text-base font-medium line-through text-green-500">{item?.discountPercentage}% off</p>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div> : <Loader></Loader>
                        }

                        <div>
                            {
                                product?.length > 5 && <Pagenate setProduct={setProduct} product={allproduct}></Pagenate>
                            }

                        </div>
                    </header>

                </div>

            </body>
        </div>
    );
};

export default ProductSection;