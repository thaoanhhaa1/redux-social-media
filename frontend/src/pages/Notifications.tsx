import { useState } from 'react';
import Live from '../components/Live';
import Page from '../components/Page';
import Trend from '../components/trend/Trend';
import Wrapper from '../components/wrapper/Wrapper';
import { classNames } from '../utils';
import NotificationAll from '../components/notification/NotificationAll';

const Notifications = () => {
    const [isAllActive] = useState(true);

    return (
        <Page
            scrollChildren={
                <>
                    <Live />
                    <Trend></Trend>
                </>
            }
            scrollWidth="335px"
        >
            <Wrapper className="p-5">
                <div className="font-semibold text-blue-black-2">
                    Notifications
                </div>
                <div className="flex">
                    <button
                        className={classNames(
                            'flex-1 font-bold border-b pb-2',
                            isAllActive
                                ? 'text-blue dark:text-blue-black-1 border-blue-white-1'
                                : 'text-black-5 dark:text-white border-base-black',
                        )}
                    >
                        ALL
                    </button>
                    <button
                        className={classNames(
                            'flex-1 font-bold border-b pb-2',
                            !isAllActive
                                ? 'text-blue dark:text-blue-black-1 border-blue-white-1'
                                : 'text-black-5 dark:text-white border-base-black',
                        )}
                    >
                        Mentions
                    </button>
                </div>
                {isAllActive && <NotificationAll />}
            </Wrapper>
        </Page>
    );
};

export default Notifications;
