import IPerson from './IPerson';

interface IContact extends IPerson {
    offline: string | null;
}

export default IContact;
