import IUser from './IUser';

interface IProfile {
    tweetCount: number;
    followerCount: number;
    followingCount: number;
    whoToFollow: IUser[];
    isLoading: boolean;
}

export default IProfile;
