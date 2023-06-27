import IUser from './IUser';

interface ISearch {
    results: IUser[];
    isLoading: boolean;
    count: number;
}

export default ISearch;
