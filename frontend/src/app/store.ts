import {
    Action,
    CombinedState,
    ThunkAction,
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit';
import bookmarksReducer from '../features/bookmarks';
import commentsReducer from '../features/comments';
import contactsReducer from '../features/contacts';
import gifsReducer from '../features/gifs';
import listsReducer from '../features/lists';
import myTweetReducer from '../features/myTweet';
import notificationsReducer from '../features/notifications';
import pageReducer from '../features/page';
import popupMultiLevelReducer from '../features/popupMultiLevel';
import profileReducer from '../features/profile';
import searchReducer from '../features/search';
import socketReducer from '../features/socket';
import storiesReducer from '../features/stories';
import storiesDetailReducer from '../features/storiesDetail';
import trendingReducer from '../features/trending';
import tweetReducer from '../features/tweet';
import tweetsReducer from '../features/tweets';
import userReducer from '../features/user';
import userProfilesReducer from '../features/userProfile';
import userRelationsReducer from '../features/userRelations';

const combinedReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    socket: socketReducer,
    contacts: contactsReducer,
    myTweet: myTweetReducer,
    tweets: tweetsReducer,
    stories: storiesReducer,
    profile: profileReducer,
    page: pageReducer,
    notifications: notificationsReducer,
    gifs: gifsReducer,
    popupMultiLevel: popupMultiLevelReducer,
    storiesDetail: storiesDetailReducer,
    bookmarks: bookmarksReducer,
    tweet: tweetReducer,
    userRelations: userRelationsReducer,
    lists: listsReducer,
    userProfiles: userProfilesReducer,
    trending: trendingReducer,
    comments: commentsReducer,
});

const rootReducer = (state: CombinedState<any> | undefined, action: Action) => {
    if (action.type === 'LOGOUT') state = undefined;

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
