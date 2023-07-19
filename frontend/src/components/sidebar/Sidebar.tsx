import { useLocalStorage } from 'usehooks-ts';
import { v4 } from 'uuid';
import config from '../../config';
import Button from '../Button';
import Image from '../Image';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
    const [, setDarkTheme] = useLocalStorage(config.THEME_KEY, true);

    return (
        <div className='sticky top-0 h-fit w-[var(--sidebar-left-width)] flex-shrink-0 p-5 min-h-screen shadow-container dark:shadow-none dark:bg-dark-black-2'>
            <div className='flex items-center gap-4'>
                <Button
                    small
                    to={config.routes.home}
                    icon={<Image src='Vector.svg' alt='' />}
                />
                <span className='font-medium text-sm text-dark-black-1 dark:text-white leading-sm'>
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
                Theme
            </Button>
        </div>
    );
};

export default Sidebar;
