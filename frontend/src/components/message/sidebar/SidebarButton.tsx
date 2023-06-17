import Button from '../../Button';

const SidebarButton = ({ children }: { children: React.ReactNode }) => {
    return <Button className="w-11 h-11 bg-white-3">{children}</Button>;
};

export default SidebarButton;
