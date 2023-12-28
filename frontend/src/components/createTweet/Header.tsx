import { ReactNode } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { popSub } from '../../features/popupMultiLevel';
import Button from '../Button';
import { ArrowLeftIcon, CloseIcon } from '../Icons';

const Header = ({
    children,
    isSub = false,
    handleClose = () => {},
}: {
    children: ReactNode;
    isSub?: boolean;
    handleClose?: () => void;
}) => {
    const dispatch = useAppDispatch();

    const handleBack = () => dispatch(popSub());

    return (
        <div className='relative flex justify-center items-center h-[60px] px-2 xxs:px-3.75 border-b border-black-opacity-10 dark:border-white-opacity-05'>
            <h2 className='font-semibold text-xl leading-xl'>{children}</h2>
            {(isSub && (
                <Button
                    onClick={handleBack}
                    className='absolute left-2 xxs:left-4 w-9 h-9 rounded-full dark:hover:bg-white-opacity-10 hover:bg-black-opacity-05 transition-all'
                    icon={<ArrowLeftIcon />}
                />
            )) || (
                <Button
                    onClick={handleClose}
                    className='absolute right-2 xxs:right-3.75 transition-colors duration-300 text-stroke-icon hover:text-red dark:hover:text-red dark:text-white'
                    icon={<CloseIcon />}
                />
            )}
        </div>
    );
};

export default Header;
