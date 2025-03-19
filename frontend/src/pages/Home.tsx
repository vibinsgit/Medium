import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='h-screen flex flex-col'>
            <div className='w-full shadow bg-slate-300 flex justify-between items-center px-2 py-2'>
                <div className=' font-bold text-slate-800 text-xl'>
                    Medium App
                </div>
                <div className='flex justify-between items-center space-x-2'>
                    <button onClick={() => {
                        navigate('/signup');
                    }}
                    className='rounded-md bg-slate-800 hover:bg-blue-600 text-white border border-blue-700 py-2 font-medium px-5 hover:cursor-pointer focus:outline-none'>Signup</button>
                    <button onClick={() => {
                        navigate('/signin');
                    }}
                    className='rounded-md bg-slate-800 hover:bg-blue-600 text-white border border-blue-700 py-2 font-medium px-5 hover:cursor-pointer focus:outline-none'>Signin</button>
                </div>
            </div>
            <div className='flex flex-col flex-grow justify-center items-center px-4 '>
                <h1 className='font-semibold text-xl mb-2'>
                    Welcome to Medium Application
                </h1>
                <p className='text-lg mb-4'>
                    Share your thoughts effortlessly with our simple and intuitive blog app!
                </p>
                <p className="text-base mb-4">
                    Write, share, and inspire with our seamless blogging app!
                </p>
            </div>
            <div className='w-full shadow-inner bg-slate-300 py-4 flex justify-center items-center'>
                <p className='font-medium text-gray-800'>Medium App done by V.Vibins</p>
            </div>
        </div>
    )
}