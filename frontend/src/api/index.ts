const api = {
    countFollow: () => '/private/follow/count',
    whoToFollow: () => '/private/follow/who-to-follow',
    follow: () => '/private/follow/follow',
    unfollow: () => '/private/follow/unfollow',
    createTweet: () => '/private/tweets',
    countTweet: () => '/private/tweets/count',
    getMyTweets: () => '/private/tweets/get-my-tweets',
    toggleLike: () => '/private/tweets/toggle-like',
    getFollowingTweets: () => '/private/tweets/get-following-tweets',
    getStories: () => '/private/stories/get-stories',
    createStory: () => '/private/stories',
    getUser: () => '/private/users/get-user',
    getUsersOnline: () => '/private/users/get-users-online',
    editProfile: () => '/private/users/edit-profile',
    search: (param: String) => `/private/search/${param}`,
    updateOnlineStatus: () => '/private/online-status',
    getLocations: () => '/private/locations',
    signUp: () => '/auth/sign-up',
    signIn: () => '/auth/sign-in',
};

export default api;
