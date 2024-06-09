import { classNames, getArray } from '../utils';

const RenderList = ({
    Control,
    direction = 'col',
    quantity = 3,
    className,
}: {
    quantity?: number;
    Control: () => JSX.Element;
    direction?: 'row' | 'col';
    className?: string;
}) => {
    return (
        <div
            className={classNames(
                'flex',
                direction === 'col' && 'flex-col',
                className,
            )}
        >
            {getArray(quantity).map((_, index) => (
                <Control key={index} />
            ))}
        </div>
    );
};

export default RenderList;
