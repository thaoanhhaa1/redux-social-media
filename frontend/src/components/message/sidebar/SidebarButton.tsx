import Button from '../../Button';

const SidebarButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <Button className="w-11 h-11 text-black dark:text-white bg-white-3 dark:bg-dark-black-3">
            {children}
        </Button>
    );
};

export default SidebarButton;
