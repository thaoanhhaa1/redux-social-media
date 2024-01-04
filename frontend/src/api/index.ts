const api = {
    countFollow: () => '/private/follow/count',
    whoToFollow: () => '/private/follow/who-to-follow',
    countWhoToFollow: () => '/private/follow/count-who-to-follow',
    getFriends: () => '/private/follow/friends',
    follow: () => '/private/follow/follow',
    unfollow: () => '/private/follow/unfollow',
    createTweet: () => '/private/tweets',
    countTweet: () => '/private/tweets/count',
    getMyTweets: () => '/private/tweets/get-my-tweets',
    toggleLike: () => '/private/tweets/toggle-like',
    getFollowingTweets: () => '/private/tweets/get-following-tweets',
    countFollowingTweets: () => '/private/tweets/count-following-tweets',
    getComments: (tweetId: String) => `/private/tweets/${tweetId}/comments`,
    getChildComments: (commentId: String) =>
        `/private/comments/${commentId}/comments`,
    postComments: (tweetId: String) => `/private/tweets/${tweetId}/comments`,
    deleteComment: (tweetId: String, commentId: String) =>
        `/private/tweets/${tweetId}/comments/${commentId}`,
    editComment: (tweetId: String, commentId: String) =>
        `/private/tweets/${tweetId}/comments/${commentId}`,
    toggleLikeComment: (commentId: string) =>
        `/private/comments/${commentId}/toggle-like`,
    getStories: () => '/private/stories/get-stories',
    getStoriesDetail: () => '/private/stories/get-stories-group-user',
    createStory: () => '/private/stories',
    getUser: () => '/private/users/get-user',
    getUsersOnline: () => '/private/users/get-users-online',
    editProfile: () => '/private/users/edit-profile',
    search: (param: String) => `/private/search/${param}`,
    updateOnlineStatus: () => '/private/online-status',
    getLocations: () => '/private/locations',
    toggleList: (isAdd: boolean) =>
        `/private/lists/${isAdd ? 'add' : 'remove'}`,
    signUp: () => '/auth/sign-up',
    signIn: () => '/auth/sign-in',
    signOut: () => '/auth/sign-out',
    getNotifications: () => '/private/notifications',
    deleteNotification: (notificationId: number) =>
        `/private/notifications/${notificationId}`,
    getGifs: () => `/private/gifs/search`,
    notInterestedTweet: (tweetId: string) =>
        `/private/tweets/${tweetId}/not-interested`,
    interestedTweet: (tweetId: string) =>
        `/private/tweets/${tweetId}/interested`,
    getTweet: (tweetId: string) => `/private/tweets/${tweetId}`,
};

export default api;
