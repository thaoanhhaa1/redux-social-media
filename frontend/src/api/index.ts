const api = {
    countTweet: () => '/private/tweet/count',
    countFollow: () => '/private/follow/count',
    whoToFollow: () => '/private/follow/who-to-follow',
    getMyTweets: () => '/private/tweet/get-my-tweets',
    search: (param: String) => `/private/search/${param}`,
    signUp: () => '/auth/sign-up',
    signIn: () => '/auth/sign-in',
    getUser: () => '/private/users/get-user',
};

export default api;
