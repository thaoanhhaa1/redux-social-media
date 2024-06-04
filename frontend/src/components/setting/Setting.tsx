import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { ArrowLeftIcon } from '../Icons';

const Setting = ({
    title,
    children,
    showBack,
}: {
    title: string;
    children: ReactNode;
    showBack?: boolean;
}) => {
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);

    return (
        <div>
            <div className='flex items-center gap-3 h-10'>
                {showBack && (
                    <Button onClick={handleBack} icon={<ArrowLeftIcon />} />
                )}
                <div className='font-semibold text-xl leading-xl dark:text-white'>
                    {title}
                </div>
            </div>
            <div className='mt-6 grid dl:grid-cols-2 grid-cols-1 gap-5'>
                {children}
            </div>
        </div>
    );
};

export default Setting;
