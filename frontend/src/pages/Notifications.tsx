import { useState } from 'react';
import { Live, Page, Trend, Wrapper } from '../components';
import {
    NotificationAll,
    NotificationMention,
} from '../components/notification';
import { classNames } from '../utils';

const Notifications = () => {
    const [isAllActive, setAllActive] = useState(true);

    return (
        <Page
            scrollChildren={
                <>
                    <Live />
                    <Trend />
                </>
            }
            scrollHeight='var(--scroll-height)'
            scrollWidth='335px'
        >
            <Wrapper className='p-5'>
                <div className='font-semibold text-blue-black-2'>
                    Notifications
                </div>
                <div className='flex'>
                    <button
                        onClick={() => setAllActive(true)}
                        className={classNames(
                            'flex-1 font-bold border-b pb-2',
                            isAllActive
                                ? 'text-blue dark:text-blue-black-1 border-blue-white-1'
                                : 'text-black-5 dark:text-white border-base-black dark:border-dark-black-1',
                        )}
                    >
                        ALL
                    </button>
                    <button
                        onClick={() => setAllActive(false)}
                        className={classNames(
                            'flex-1 font-bold border-b pb-2',
                            !isAllActive
                                ? 'text-blue dark:text-blue-black-1 border-blue-white-1'
                                : 'text-black-5 dark:text-white border-base-black dark:border-dark-black-1',
                        )}
                    >
                        Mentions
                    </button>
                </div>
                {(isAllActive && <NotificationAll />) || (
                    <NotificationMention />
                )}
            </Wrapper>
        </Page>
    );
};

export default Notifications;
