import { ReactNode, useEffect, useMemo, useRef } from 'react';
import AnimateHeight from 'react-animate-height';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import {
    setHeight,
    setUpdateHeightPopup,
} from '../../features/popupMultiLevel';
import { classNames } from '../../utils';

type Props = {
    children: ReactNode;
};

const PopupMultiLevel = ({ children }: Props) => {
    const { subs, height } = useAppSelector(
        (state: RootState) => state.popupMultiLevel,
    );
    const Sub = useMemo(() => subs.at(-1), [subs]);
    const subRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        function updateHeight() {
            if (!subs.length || !subRef.current) {
                dispatch(setHeight(0));
                return;
            }

            const element: HTMLDivElement = subRef.current;

            dispatch(setHeight(element.offsetHeight));
        }

        updateHeight();
        dispatch(setUpdateHeightPopup(updateHeight));
    }, [dispatch, subs]);

    return (
        <div className='w-full rounded-2.5 overflow-hidden'>
            <AnimateHeight
                duration={200}
                height={height || 'auto'}
                className='relative bg-white dark:bg-dark-black-2 cursor-default overflow-hidden'
            >
                <div
                    className={classNames(
                        'max-h-[min(600px,_80vh)] overflow-y-auto transition-transform duration-200',
                        subs.length ? '-translate-x-full' : 'translate-x-0',
                    )}
                >
                    <div className='relative'>{children}</div>
                </div>
                <div
                    className={classNames(
                        'absolute max-h-[85vh] overflow-y-auto top-0 left-full w-full transition-transform duration-200',
                        subs.length ? '-translate-x-full' : 'translate-x-0',
                    )}
                >
                    {Sub && (
                        <div ref={subRef}>
                            <Sub />
                        </div>
                    )}
                </div>
            </AnimateHeight>
        </div>
    );
};

export default PopupMultiLevel;
