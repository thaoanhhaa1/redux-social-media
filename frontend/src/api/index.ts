const api = {
    // FOLLOW ROUTES
    countFollow: () => '/private/follow/count',
    whoToFollow: () => '/private/follow/who-to-follow',
    countWhoToFollow: () => '/private/follow/count-who-to-follow',
    getFriends: () => '/private/follow/friends',
    follow: () => '/private/follow/follow',
    unfollow: () => '/private/follow/unfollow',
    block: () => '/private/follow/block',
    unblock: () => '/private/follow/unblock',
    getBlockedUsers: () => '/private/follow/blocks',

    // TWEET ROUTES
    createTweet: () => '/private/tweets',
    countTweet: () => '/private/tweets/count',
    getMyTweets: () => '/private/tweets/get-my-tweets',
    toggleLike: () => '/private/tweets/toggle-like',
    getFollowingTweets: () => '/private/tweets/get-following-tweets',
    countFollowingTweets: () => '/private/tweets/count-following-tweets',
    getComments: (tweetId: String) => `/private/tweets/${tweetId}/comments`,
    postComments: (tweetId: String) => `/private/tweets/${tweetId}/comments`,
    deleteComment: (tweetId: String, commentId: String) =>
        `/private/tweets/${tweetId}/comments/${commentId}`,
    editComment: (tweetId: String, commentId: String) =>
        `/private/tweets/${tweetId}/comments/${commentId}`,
    notInterestedTweet: (tweetId: string) =>
        `/private/tweets/${tweetId}/not-interested`,
    interestedTweet: (tweetId: string) =>
        `/private/tweets/${tweetId}/interested`,
    addReporterToTweet: (tweetId: string) =>
        `/private/tweets/${tweetId}/reporters`,
    removeReporterFromTweet: (tweetId: string) =>
        `/private/tweets/${tweetId}/reporters`,

    // COMMENT ROUTES
    getChildComments: (commentId: String) =>
        `/private/comments/${commentId}/comments`,
    toggleLikeComment: (commentId: string) =>
        `/private/comments/${commentId}/toggle-like`,

    // STORY ROUTES
    getStories: () => '/private/stories/get-stories',
    getStoriesDetail: () => '/private/stories/get-stories-group-user',
    createStory: () => '/private/stories',

    // USER ROUTES
    getUser: () => '/private/users/get-user',
    getUsersOnline: () => '/private/users/get-users-online',
    editProfile: () => '/private/users/edit-profile',
    getTweet: (userId: string, tweetId: string) =>
        `/private/users/${userId}/tweets/${tweetId}`,
    getTweetsByUserId: (userId: string) => `/private/users/${userId}/tweets`,
    countTweetsByUserId: (userId: string) =>
        `/private/users/${userId}/tweets/count`,

    // SEARCH ROUTES
    search: (param: String) => `/private/search/${param}`,
    getGifs: () => `/private/gifs/search`,

    // ONLINE STATUS ROUTES
    updateOnlineStatus: () => '/private/online-status',

    // LOCATION ROUTES
    getLocations: () => '/private/locations',

    // LIST ROUTES
    toggleList: (isAdd: boolean) =>
        `/private/lists/${isAdd ? 'add' : 'remove'}`,
    getUserList: () => '/private/lists/users',
    countListPages: () => '/private/lists/users/count',
    togglePin: (userId: string) => `/private/lists/users/${userId}/pin`,

    // AUTH ROUTES
    signUp: () => '/auth/sign-up',
    signIn: () => '/auth/sign-in',
    signOut: () => '/auth/sign-out',

    // NOTIFICATION ROUTES
    getNotifications: () => '/private/notifications',
    deleteNotification: (notificationId: number) =>
        `/private/notifications/${notificationId}`,

    // BOOKMARK ROUTES
    getBookmarks: () => `/private/bookmarks`,
};

export default api;
