import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { Live, Page, Trend, Wrapper } from '../components';
import TabButton from '../components/TabButton';
import {
    NotificationAll,
    NotificationMention,
} from '../components/notification';
import { getNotifications } from '../features/notifications';
import { setLoading } from '../features/page';

const Notifications = () => {
    const [isAllActive, setAllActive] = useState(true);
    const user = useAppSelector((state: RootState) => state.user);
    const { notifications, page } = useAppSelector(
        (state: RootState) => state.notifications,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user._id) dispatch(setLoading(false));
    }, [dispatch, user._id]);

    useEffect(() => {
        if (!user._id || notifications.length || page) return;

        dispatch(
            getNotifications({
                skip: 0,
                pages: 0,
            }),
        );
    }, [dispatch, notifications.length, page, user._id]);

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
            <Wrapper className='p-2 xxs:p-3 xs:p-4 dl:p-5'>
                <div className='font-semibold text-blue-black-2 dark:text-white'>
                    Notifications
                </div>
                <div className='flex'>
                    <TabButton
                        active={isAllActive}
                        onClick={() => setAllActive(true)}
                    >
                        ALL
                    </TabButton>
                    <TabButton
                        active={!isAllActive}
                        onClick={() => setAllActive(false)}
                    >
                        Mentions
                    </TabButton>
                </div>
                {(isAllActive && <NotificationAll />) || (
                    <NotificationMention />
                )}
            </Wrapper>
        </Page>
    );
};

export default Notifications;
