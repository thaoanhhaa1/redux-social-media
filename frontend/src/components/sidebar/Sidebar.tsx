import { useLocalStorage } from 'usehooks-ts';
import { v4 } from 'uuid';
import config from '../../config';
import Button from '../Button';
import { MoonIcon } from '../Icons';
import Image from '../Image';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
    const [, setDarkTheme] = useLocalStorage(config.THEME_KEY, true);

    return (
        <div className='sticky py-5 overflow-y-auto top-0 w-[var(--sidebar-left-mobile-width)] xl:w-[var(--sidebar-left-width)] flex-shrink-0 h-screen shadow-container dark:shadow-none dark:bg-dark-black-2'>
            <div className='px-2 xl:px-5'>
                <div className='flex justify-center xl:justify-start items-center gap-4'>
                    <Button
                        small
                        to={config.routes.home}
                        icon={<Image src='/Vector.svg' alt='' />}
                    />
                    <span className='hidden xl:inline-block font-medium text-sm text-dark-black-1 dark:text-white leading-sm'>
                        Hoque
                    </span>
                </div>
                <div className='mt-[41px]'>
                    {config.sidebar.map((sidebarItem) => (
                        <SidebarItem key={v4()} sidebarItem={sidebarItem} />
                    ))}
                </div>
                <Button
                    onClick={() => setDarkTheme((isDarkTheme) => !isDarkTheme)}
                    isWidthFull
                    className='mt-10 font-semibold bg-blue-white-2 text-sm text-white leading-sm'
                >
                    <MoonIcon className='text-white' />
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
