import {
    AccountIcon,
    ChangePasswordIcon,
    CopyIcon,
    FilterIcon,
    HideIcon,
    LanguageIcon,
    MuteIcon,
    SecurityIcon,
    Setting,
    SettingFillIcon,
    SettingItem,
} from '../components';

const Settings = () => {
    return (
        <div className='px-5 pb-5 flex flex-col gap-5'>
            <Setting title='Your account'>
                <SettingItem
                    title='Account information'
                    description='See your account information like your phone number and email.'
                    icon={<AccountIcon />}
                />
                <SettingItem
                    title='Change your password'
                    description='Change your password at any time.'
                    icon={<ChangePasswordIcon />}
                />
            </Setting>
            <Setting title='Security and account access'>
                <SettingItem
                    title='Security'
                    description='Manage your account’s security.'
                    icon={<SecurityIcon />}
                />
                <SettingItem
                    title='Connected accounts'
                    description='Manage Google or Apple accounts connected to Twitter to log in.'
                    icon={<CopyIcon />}
                />
            </Setting>
            <Setting title='Privacy and safety'>
                <SettingItem
                    title='Audience and tagging'
                    description='Manage what information you allow other people on Twitter to see.'
                    icon={<SecurityIcon />}
                />
                <SettingItem
                    title='Mute and block'
                    description='the accounts, words, and notifications that you’ve muted or blocked.'
                    icon={<MuteIcon />}
                />
            </Setting>
            <Setting title='Notifications'>
                <SettingItem
                    title='Filters'
                    description='Choose the notifications you’d like to see — and those you don’t.'
                    icon={<FilterIcon />}
                />
                <SettingItem
                    title='Preferences'
                    description='Select your preferences by notification type.'
                    icon={<SettingFillIcon />}
                />
            </Setting>
            <Setting title='Accessibility, display, and languages'>
                <SettingItem
                    title='Display & accessibility'
                    description='Manage aspects of your Twitter experience color contrast and motion.'
                    icon={<HideIcon />}
                />
                <SettingItem
                    title='Languages'
                    description='which languages are used to personalize your Twitter experience.'
                    icon={<LanguageIcon />}
                />
            </Setting>
        </div>
    );
};

export default Settings;
