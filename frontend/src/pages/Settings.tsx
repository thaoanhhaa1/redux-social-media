import {
    AccountIcon,
    ChangePasswordIcon,
    CopyIcon,
    FilterIcon,
    HideIcon,
    LanguageIcon,
    MuteIcon,
    SecurityIcon,
    SettingFillIcon,
} from '../components/Icons';
import SettingGroup from '../components/setting/SettingGroup';
import SettingItem from '../components/setting/SettingItem';

const Settings = () => {
    return (
        <div className="px-5 pb-5 flex flex-col gap-5">
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
            <SettingGroup title="Security and account access">
                <SettingItem
                    title="Security"
                    description="Manage your account’s security."
                    icon={<SecurityIcon />}
                />
                <SettingItem
                    title="Connected accounts"
                    description="Manage Google or Apple accounts connected to Twitter to log in."
                    icon={<CopyIcon />}
                />
            </SettingGroup>
            <SettingGroup title="Privacy and safety">
                <SettingItem
                    title="Audience and tagging"
                    description="Manage what information you allow other people on Twitter to see."
                    icon={<SecurityIcon />}
                />
                <SettingItem
                    title="Mute and block"
                    description="the accounts, words, and notifications that you’ve muted or blocked."
                    icon={<MuteIcon />}
                />
            </SettingGroup>
            <SettingGroup title="Notifications">
                <SettingItem
                    title="Filters"
                    description="Choose the notifications you’d like to see — and those you don’t."
                    icon={<FilterIcon />}
                />
                <SettingItem
                    title="Preferences"
                    description="Select your preferences by notification type."
                    icon={<SettingFillIcon />}
                />
            </SettingGroup>
            <SettingGroup title="Accessibility, display, and languages">
                <SettingItem
                    title="Display & accessibility"
                    description="Manage aspects of your Twitter experience color contrast and motion."
                    icon={<HideIcon />}
                />
                <SettingItem
                    title="Languages"
                    description="which languages are used to personalize your Twitter experience."
                    icon={<LanguageIcon />}
                />
            </SettingGroup>
        </div>
    );
};

export default Settings;
