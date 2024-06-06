import { IList } from '../interfaces';
import List from './List';

const ListWrapper = ({
    list,
    title,
    onEdit,
}: {
    title: string;
    list: IList[];
    onEdit?: () => void;
}) => {
    if (!list.length) return null;

    return (
        <div>
            <div className='px-5 py-3 bg-blue-white-4 dark:bg-dark-black-3 rounded-2.5 flex justify-between items-center font-semibold text-blue-black-5 dark:text-white'>
                <span>{title}</span>
                {onEdit ? <span onClick={onEdit}>Edit</span> : null}
            </div>
            {list.map((list) => (
                <List list={list} key={list._id} />
            ))}
        </div>
    );
};

export default ListWrapper;
