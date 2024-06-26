const routes = {
    home: '/',
    explore: '/explore',
    notifications: '/notifications',
    messages: '/messages',
    bookmarks: '/bookmarks',
    lists: '/lists',
    profile: '/profile',
    settings: '/settings',
    settingDetail: '/settings/:setting',
    blocking: '/settings/display/blocking',
    signUp: '/sign-up',
    signIn: '/sign-in',
    search: '/search',
    liveVideo: '/live-video',
    stories: '/stories',
    tweetDetail: '/:user_id/tweets/:tweet_id',
    userProfile: '/:username',
    notFound: '*',
};

export default routes;
