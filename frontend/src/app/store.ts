import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../features/contacts';
import followingTweetsReducer from '../features/followingTweets';
import myTweetReducer from '../features/myTweet';
import profileReducer from '../features/profile';
import searchReducer from '../features/search';
import socketReducer from '../features/socket';
import storiesReducer from '../features/stories';
import userReducer from '../features/user';

export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        socket: socketReducer,
        contacts: contactsReducer,
        myTweet: myTweetReducer,
        followingTweets: followingTweetsReducer,
        stories: storiesReducer,
        profile: profileReducer,
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
