import IPerson from './IPerson';

interface IUser extends IPerson {
    bio: string;
    website: string;
    birthday: string;
    createdAt: string;
}

export default IUser;
