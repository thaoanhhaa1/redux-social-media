import {
    DangerCircleIcon,
    DeleteIcon,
    MoreCircleIcon,
    VolumeOffIcon,
} from '../../Icons';
import SidebarButton from './SidebarButton';

const Sidebar = () => {
    return (
        <div className='my-8 flex flex-col justify-between'>
            <SidebarButton>
                <MoreCircleIcon />
            </SidebarButton>
            <div className='flex flex-col gap-4'>
                <SidebarButton>
                    <VolumeOffIcon />
                </SidebarButton>
                <SidebarButton>
                    <DeleteIcon />
                </SidebarButton>
                <SidebarButton>
                    <DangerCircleIcon />
                </SidebarButton>
            </div>
        </div>
    );
};

export default Sidebar;
