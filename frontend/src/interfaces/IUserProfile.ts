import IUser from './IUser';

interface IUserProfile extends IUser {
    bio: string;
    website: string;
    birthday: string;
    createdAt: string;
}

export default IUserProfile;
