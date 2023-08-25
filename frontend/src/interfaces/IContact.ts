import IPerson from './IUser';

interface IContact extends IPerson {
    offline: string | null;
}

export default IContact;
