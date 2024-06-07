import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { message, regex } from '../constants';
import { editProfile, fetchUser } from '../features/user';
import deleteImage from '../firebase/deleteImage';
import { useImageUpload } from '../hooks';
import { ProfileType } from '../types';
import { classNames, getDateValue, getNameStorage, isAdult } from '../utils';
import Button from './Button';
import { CameraIcon } from './Icons';
import ErrorMessage from './form/ErrorMessage';
import FormGroup from './form/FormGroup';
import Input from './form/Input';
import Label from './form/Label';
import ImageUpload from './imageUpload/ImageUpload';
import Modal, { ModalFooterButton, ModalHeader } from './modal';

const schema = yup
    .object({
        name: yup
            .string()
            .trim()
            .required(message.name.require)
            .matches(regex.name, message.name.regex),
        bio: yup.string().trim().required(message.bio.require),
        location: yup.string().trim().required(message.location.require),
        website: yup.string().trim().url(message.website.url),
        birthday: yup.string().required(message.birthday.require),
        avatar: yup.string(),
        background: yup.string(),
    })
    .required();

const EditProfile = ({
    isShowModal,
    setShowModal,
}: {
    isShowModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const user = useSelector((state: RootState) => state.user);
    const avatar = useImageUpload(`${user._id}_avatar_${new Date().getTime()}`);
    const background = useImageUpload(
        `${user._id}_background_${new Date().getTime()}`,
    );

    const {
        control,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<ProfileType>({
        resolver: yupResolver(schema),
        defaultValues: {
            ...user,
            birthday: getDateValue(user?.birthday),
        },
    });
    const dispatch = useAppDispatch();

    const onSubmit = async (data: ProfileType) => {
        if (!isAdult(new Date(data.birthday)))
            setError('birthday', {
                message: message.birthday.isAdult,
            });

        if (background.image) {
            background.image &&
                user.background &&
                deleteImage(getNameStorage(user.background));
            setValue('background', background.image);
        }
        if (avatar.image) {
            avatar.image &&
                user.avatar &&
                deleteImage(getNameStorage(user.avatar));
            setValue('avatar', avatar.image);
        }

        try {
            await dispatch(editProfile(data)).unwrap();

            toast.success('Update successfully!');
            background.setImage('');
            avatar.setImage('');
            setShowModal(false);
            await dispatch(fetchUser()).unwrap();
        } catch (error) {}
    };

    useEffect(() => {
        if (isShowModal) return;
        background.setImage('');
        background.image && deleteImage(getNameStorage(background.image));
        avatar.setImage('');
        avatar.image && deleteImage(getNameStorage(avatar.image));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowModal]);

    return (
        <Modal
            isShowModal={isShowModal}
            handleCloseModal={() => setShowModal(false)}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={classNames(
                    'w-full max-w-[632px] cursor-default ease-out duration-300',
                    isShowModal ? 'translate-y-0' : '-translate-y-10',
                )}
            >
                <ModalHeader>Edit profile</ModalHeader>
                <div className='h-[calc(100vh_-_134px)] bg-white dark:bg-[#171616] overflow-auto pb-5'>
                    <ImageUpload
                        className={classNames('aspect-[316/53]')}
                        fallback='/no-background.jpg'
                        src={user.background}
                        image={background}
                    >
                        <CameraIcon className='stroke-black dark:stroke-white' />
                    </ImageUpload>
                    <ImageUpload
                        wrapperClassName='mx-[18px] -mt-12 w-[100px] h-[100px] rounded-full'
                        image={avatar}
                        src={user.avatar}
                    >
                        <CameraIcon className='stroke-black dark:stroke-white' />
                    </ImageUpload>
                    <div className='flex flex-col gap-5 mt-4 px-5'>
                        <FormGroup>
                            <Label name='name'>Name</Label>
                            <Input control={control} name='name' />
                            {errors.name?.message && (
                                <ErrorMessage message={errors.name?.message} />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label name='bio'>Bio</Label>
                            <Input control={control} name='bio' />
                            {errors.bio?.message && (
                                <ErrorMessage message={errors.bio?.message} />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label name='location'>Location</Label>
                            <Input control={control} name='location' />
                            {errors.location?.message && (
                                <ErrorMessage
                                    message={errors.location?.message}
                                />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label name='website'>Website</Label>
                            <Input control={control} name='website' />
                            {errors.website?.message && (
                                <ErrorMessage
                                    message={errors.website?.message}
                                />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label name='birthday'>Birth day</Label>
                            <Input
                                type='date'
                                control={control}
                                name='birthday'
                            />
                            {errors.birthday?.message && (
                                <ErrorMessage
                                    message={errors.birthday?.message}
                                />
                            )}
                        </FormGroup>
                    </div>
                </div>
                <ModalFooterButton>
                    <Button
                        disabled={avatar.isLoading || background.isLoading}
                        type='submit'
                        className='w-[107px] h-8.5 bg-blue-white-2 text-xl leading-xl text-white'
                    >
                        save
                    </Button>
                </ModalFooterButton>
            </form>
        </Modal>
    );
};

export default EditProfile;
