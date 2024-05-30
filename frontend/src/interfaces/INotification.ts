import { NotificationType } from '../types';
import IPerson from './IPerson';

interface INotification {
    _id: number;
    user: IPerson;
    type: NotificationType;
    document: string;
    description?: string;
    createdAt: string;
}

export default INotification;
