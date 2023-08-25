import IPerson from './IPerson';

interface IUser extends IPerson {
    email: string;
    background: string;
}

export default IUser;
