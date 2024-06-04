import { BlockIcon, Setting, SettingItem } from '../components';

const SettingDetail = () => {
    return (
        <div className='px-5 pb-5 flex flex-col gap-5'>
            <Setting showBack title='Display & accessibility'>
                <SettingItem
                    to={'/settings/display/blocking'}
                    title='Blocking'
                    icon={<BlockIcon />}
                />
            </Setting>
        </div>
    );
};

export default SettingDetail;
