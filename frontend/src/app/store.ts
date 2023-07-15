import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../features/contacts';
import followingTweetsReducer from '../features/followingTweets';
import myTweetReducer from '../features/myTweet';
import searchReducer from '../features/search';
import socketReducer from '../features/socket';
import themeReducer from '../features/theme';
import userReducer from '../features/user';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        user: userReducer,
        search: searchReducer,
        socket: socketReducer,
        contacts: contactsReducer,
        myTweet: myTweetReducer,
        followingTweets: followingTweetsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
