import { Link, useNavigate } from 'react-router-dom';
import { PermissionIcon } from './Icons';

const Forbidden = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col justify-center items-center gap-1.5 max-w-[500px] mx-auto h-[calc(100vh_-_var(--top-bar-height))] mt-[-8px] xxs:mt-[-20px]'>
            <PermissionIcon className='w-[112px] aspect-square' />
            <h4 className='text-xl font-bold text-center mt-4'>
                This content isn't available right now
            </h4>
            <p className='text-center font-medium text-black-8 dark:text-white'>
                When this happens, it's usually because the owner only shared it
                with a small group of people, changed who can see it or it's
                been deleted.
            </p>
            <Link
                to='/'
                className='text-white mt-4 rounded-xl overflow-hidden py-[10px] inline-block px-5 bg-blue-white-2'
            >
                Go to Home
            </Link>
            <button
                onClick={() => navigate(-1)}
                className='text-blue-white-2 rounded-xl overflow-hidden py-[10px] inline-block px-5'
            >
                Back
            </button>
        </div>
    );
};

export default Forbidden;
