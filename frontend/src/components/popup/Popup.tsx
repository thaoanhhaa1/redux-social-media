import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { IPopupItem } from '../../interfaces';
import { ArrowPopupIcon } from '../Icons';
import Portal from '../Portal';
import PopupItem from './PopupItem';

function Popup({ popup }: { popup: IPopupItem[] }) {
    const ref = useRef(null);
    const [rect, setRect] = useState<DOMRect>();

    const updateRect = useCallback(() => {
        if (!ref.current) return;
        setRect((ref.current as HTMLDivElement).getBoundingClientRect());
    }, []);

    useLayoutEffect(() => {
        updateRect();
    }, [updateRect]);

    return (
        <>
            <div
                ref={ref}
                className='z-1 w-[300px] absolute top-[calc(100%+6px)] left-2/4 -translate-x-2/4'
            />
            {rect && (
                <Portal>
                    <div className='fixed top-0 left-0 z-50'>
                        <div
                            style={{
                                left: `${rect.x}px`,
                                top: `${rect.y}px`,
                            }}
                            className='z-50 w-[300px] absolute p-2 bg-white dark:bg-dark-black-2 rounded-lg shadow-popup drop-shadow-[0_0_6px_rgba(0,_0,_0,_0.2)]'
                        >
                            <div>
                                {popup.map((item) => (
                                    <PopupItem
                                        key={v4()}
                                        onClick={item.onClick}
                                    >
                                        {item.title}
                                    </PopupItem>
                                ))}
                            </div>
                            <div className='absolute top-[2px] -translate-y-full left-[calc(50%-4px)]'>
                                <ArrowPopupIcon className='-scale-y-100 fill-white dark:fill-dark-black-2' />
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
}

export default Popup;
