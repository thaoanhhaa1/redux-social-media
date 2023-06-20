import { AccountIcon, ChangePasswordIcon } from '../components/Icons';
import SettingGroup from '../components/setting/SettingGroup';
import SettingItem from '../components/setting/SettingItem';

const Settings = () => {
    return (
        <div className="px-5 flex flex-col gap-5">
            <SettingGroup title="Your account">
                <SettingItem
                    title="Account information"
                    description="See your account information like your phone number and email."
                    icon={<AccountIcon />}
                />
                <SettingItem
                    title="Change your password"
                    description="Change your password at any time."
                    icon={<ChangePasswordIcon />}
                />
            </SettingGroup>
        </div>
    );
};

export default Settings;
