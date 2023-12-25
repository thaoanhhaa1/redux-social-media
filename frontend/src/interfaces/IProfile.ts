import IUser from './IUserProfile';

interface IProfile {
    tweetCount: number;
    followerCount: number;
    followingCount: number;
    whoToFollow: IUser[];
    isLoading: boolean;
    whoToFollowPages: number;
    whoToFollowPage: number;
}

export default IProfile;
