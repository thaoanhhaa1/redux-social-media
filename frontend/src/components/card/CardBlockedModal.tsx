import { useMemo } from 'react';
import { useCardContext } from '../../contexts/CardContext';
import Button from '../Button';
import Modal, { ModalFooterButton, ModalHeader } from '../modal';

const CardBlockedModal = () => {
    const { blockedType, setBlockedType } = useCardContext();
    const { title, description } = useMemo(() => {
        if (blockedType === 'COMMENT_TWEET')
            return {
                title: 'Post has been removed',
                description:
                    'The post or object that you were commenting has been removed by its owner and can no longer be commented on.',
            };

        if (blockedType === 'MORE_ACTION')
            return {
                title: 'Error',
                description: "We can't this point. it may have been deleted.",
            };

        return {
            title: 'This content is no longer available',
            description:
                'The content you were trying to express is no longer available.',
        };
    }, [blockedType]);

    const handleCloseModal = () => setBlockedType('NONE');

    return (
        <Modal
            isShowModal={blockedType !== 'NONE'}
            handleCloseModal={handleCloseModal}
            containerClassName='!z-[51]'
        >
            <div className='max-w-[500px] w-full'>
                <ModalHeader>{title}</ModalHeader>
                <p className='p-[15px]'>{description}</p>
                <ModalFooterButton>
                    <Button
                        onClick={handleCloseModal}
                        className='z-1 w-[80px] xxs:w-[107px] h-8.5 bg-blue-white-2 text-xl leading-xl text-white'
                    >
                        OK
                    </Button>
                </ModalFooterButton>
            </div>
        </Modal>
    );
};

export default CardBlockedModal;
