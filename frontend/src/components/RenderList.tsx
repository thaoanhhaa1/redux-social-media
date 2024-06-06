import { classNames, getArray } from '../utils';

const RenderList = ({
    Control,
    direction = 'col',
    quantity = 3,
    gap = '0px',
}: {
    quantity?: number;
    Control: () => JSX.Element;
    direction?: 'row' | 'col';
    gap?: string;
}) => {
    return (
        <div
            style={{
                gap,
            }}
            className={classNames('flex', direction === 'col' && 'flex-col')}
        >
            {getArray(quantity).map((_, index) => (
                <Control key={index} />
            ))}
        </div>
    );
};

export default RenderList;
