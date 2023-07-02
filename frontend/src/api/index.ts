const api = {
    countFollow: () => '/private/follow/count',
    whoToFollow: () => '/private/follow/who-to-follow',
    follow: () => '/private/follow/follow',
    unfollow: () => '/private/follow/unfollow',
    countTweet: () => '/private/tweets/count',
    getMyTweets: () => '/private/tweets/get-my-tweets',
    getMyStories: () => '/private/stories/get-my-stories',
    getUser: () => '/private/users/get-user',
    editProfile: () => '/private/users/edit-profile',
    search: (param: String) => `/private/search/${param}`,
    signUp: () => '/auth/sign-up',
    signIn: () => '/auth/sign-in',
};

export default api;
