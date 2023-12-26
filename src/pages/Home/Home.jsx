import React, { useContext, useEffect, useState } from 'react';
import CountDown from '../../components/CountDown/CountDown';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';
import { UserProvider } from '../../context/AuthContext';


const Home = () => {
    const { user } = useContext(UserProvider)
    const navigate = useNavigate()
    const [seconds, setSeconds] = useState(100);
    const [reloade, setReloade] = useState(false)

    useEffect(() => {
        setSeconds(100)
        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(intervalId);
                    if (!localStorage.getItem('Token')) {
                        modalOn()
                    }
                }
                return Math.max(0, prevSeconds - 10);
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [reloade]);

    const modalOn = () => {
        document.getElementById('my_modal_3').showModal()
    }
    const handelModaloff = () => {
        document.getElementById('my_modal_3').close()
        navigate('/product')
    }
    const handelNavigate = () => {
        navigate('/product')
    }

    return (
        <div>
            {
                localStorage.getItem('Token') ? <div>
                    <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
                        <div class="absolute inset-0">
                            <img src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Background Image" class="object-cover object-center w-full h-full" />
                            <div class="absolute inset-0 bg-black opacity-50"></div>
                        </div>

                        <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
                            <h1 class="text-5xl font-bold leading-tight mb-4">Welcome to Our Awesome Website</h1>
                            <p className='w-1/2 font-bold'> {user?.firstName} {user?.lastName}</p>
                            <img className='w-20 h-20 pb-5 rounded-full' src={user?.image} alt="" />
                            <a onClick={handelNavigate} class="bg-yellow-400 cursor-pointer text-gray-900 font-semibold hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">See all products</a>
                        </div>
                    </div>
                </div> : <div>
                    <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
                        <div class="absolute inset-0">
                            <img src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Background Image" class="object-cover object-center w-full h-full" />
                            <div class="absolute inset-0 bg-black opacity-50"></div>
                        </div>

                        <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
                            <h1 class="text-5xl font-bold leading-tight mb-4">Welcome to Our Awesome Website</h1>
                            <p className='w-1/2 pb-5'>  <ProgressBar completed={seconds} /></p>
                            <a onClick={() => setReloade(!reloade)} class="bg-yellow-400 cursor-pointer text-gray-900 font-semibold hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Try again</a>
                        </div>
                    </div>

                    <dialog id="my_modal_3" className="modal">
                        <div className="w-11/12 max-w-5xl modal-box no-scrollbar">
                            <form method="dialog">
                                <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                            </form>
                            <div className='px-10'> <CountDown handelModaloff={handelModaloff} ></CountDown></div>
                        </div>
                    </dialog>

                </div >
            }
        </div>
    );
}


export default Home;