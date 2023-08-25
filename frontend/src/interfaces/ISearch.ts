import IUser from './IUserProfile';

interface ISearch {
    results: IUser[];
    isLoading: boolean;
    count: number;
}

export default ISearch;
