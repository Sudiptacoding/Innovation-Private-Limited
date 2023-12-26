import React, { useContext } from 'react';
import { IoArrowRedoOutline, IoArrowUndoOutline } from "react-icons/io5";
import useAllLoginUser from '../../hooks/useAllLoginUser';
import useAxios from '../../hooks/useAxios';
import { UserProvider } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
const CountDown = ({ handelModaloff }) => {

    const { isPending, error, loginUser, refetch } = useAllLoginUser()
    const axiosData = useAxios()
    const { user, setUser, setLoader, } = useContext(UserProvider)
    const handelSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const password = e.target.password.value;
        const data = {
            username: name,
            password: password,
        }
        axiosData.post(`/auth/login`, data)
            .then(res => {
                if (res.data.token) {
                    setUser(res.data)
                    setLoader(false)
                    handelModaloff()
                    localStorage.setItem('Token', res.data.token)
                    localStorage.setItem('userData', JSON.stringify(res.data));
                    Swal.fire({
                        title: "Good job!",
                        text: "Login successfully",
                        icon: "success"
                    });
                }

            }).catch((error) => {
                toast.error("Login failed . Please Show ( Demo Email and Password ) and use this.")
                localStorage.removeItem('Token')
            })
    }

    return (
        <div>
            <div class="bg-white rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 sm:p-7">
                    <div class="text-center">
                        <h2 class="block text-2xl font-bold text-gray-800 dark:text-gray-200">Sign in</h2>
                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account yet?
                            <a class="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="../examples/html/modal-signup.html">
                                Sign up here
                            </a>
                        </p>
                    </div>

                    <div class="mt-5">
                        <a class="w-full cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-task-created-alert">
                            <IoArrowRedoOutline />
                            Show Demo Email and Password
                            <IoArrowUndoOutline />

                        </a>

                        <div class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>


                        <form onSubmit={handelSubmit}>
                            <div class="grid gap-y-4">
                                <div>
                                    <label for="email" class="block text-sm mb-2 dark:text-white">User Name</label>
                                    <div class="relative">
                                        <input type="text" placeholder='Enter your name' name="name" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="email-error" />
                                        <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                            <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                </div>

                                <div>
                                    <div class="flex justify-between items-center">
                                        <label for="password" class="block text-sm mb-2 dark:text-white">Password</label>
                                        <a class="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="../examples/html/modal-recover-account.html">Forgot password?</a>
                                    </div>
                                    <div class="relative">
                                        <input type="text" id="text" placeholder='Input your password' name="password" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" required aria-describedby="password-error" />
                                        <div class="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                                            <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Sign in</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>



            <div id="hs-task-created-alert" class="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div class="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">
                        <div class="absolute top-2 end-2">
                            <button type="button" class="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-task-created-alert">
                                <span class="sr-only">Close</span>
                                <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>
                        <div class="p-4 sm:p-10 text-center overflow-y-auto">
                            <span class="mb-4 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border-4 border-green-50 bg-green-100 text-green-500 dark:bg-green-700 dark:border-green-600 dark:text-green-100">
                                <svg class="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                                </svg>
                            </span>

                            <h3 class="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                                Your login Email and Password
                            </h3>
                            <p class="text-gray-500">
                                {
                                    loginUser?.map((item, i) => {
                                        return <div key={i} className="collapse collapse-plus ">
                                            <input type="radio" name="my-accordion-3" />
                                            <div className="font-semibold text-gray-700 collapse-title">
                                                Parson number {i}
                                            </div>
                                            <div className="collapse-content">
                                                <p><span className='font-bold text-black'>Username</span>: &nbsp; {item?.username} </p>
                                                <p><span className='font-bold text-black'>Password</span>: &nbsp; {item?.password}</p>
                                            </div>
                                        </div>
                                    })
                                }
                            </p>
                            <div class="mt-6 flex justify-center gap-x-4">
                                <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-task-created-alert">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountDown;