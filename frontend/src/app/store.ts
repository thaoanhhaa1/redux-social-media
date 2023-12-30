import {
    Action,
    CombinedState,
    ThunkAction,
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import contactsReducer from '../features/contacts';
import followingTweetsReducer from '../features/followingTweets';
import gifsReducer from '../features/gifs';
import myTweetReducer from '../features/myTweet';
import notificationsReducer from '../features/notifications';
import pageReducer from '../features/page';
import popupMultiLevelReducer from '../features/popupMultiLevel';
import profileReducer from '../features/profile';
import searchReducer from '../features/search';
import socketReducer from '../features/socket';
import storiesReducer from '../features/stories';
import storiesDetailReducer from '../features/storiesDetail';
import userReducer from '../features/user';

const combinedReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    socket: socketReducer,
    contacts: contactsReducer,
    myTweet: myTweetReducer,
    followingTweets: followingTweetsReducer,
    stories: storiesReducer,
    profile: profileReducer,
    page: pageReducer,
    notifications: notificationsReducer,
    gifs: gifsReducer,
    popupMultiLevel: popupMultiLevelReducer,
    storiesDetail: storiesDetailReducer,
});

const rootReducer = (state: CombinedState<any> | undefined, action: Action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return combinedReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
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
