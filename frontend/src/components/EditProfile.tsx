import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { message, regex } from '../constants';
import { editProfile, fetchUser } from '../features/user';
import { useImageUpload } from '../hooks';
import { ProfileType } from '../types';
import { classNames, getDateValue, isAdult } from '../utils';
import Button from './Button';
import { CloseIcon } from './Icons';
import Model from './Model';
import ErrorMessage from './form/ErrorMessage';
import FormGroup from './form/FormGroup';
import Input from './form/Input';
import Label from './form/Label';
import ImageUpload from './imageUpload/ImageUpload';

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
    isShowModel,
    setShowModel,
}: {
    isShowModel: boolean;
    setShowModel: Dispatch<SetStateAction<boolean>>;
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

        if (background.image) setValue('background', background.image);
        if (avatar.image) setValue('avatar', avatar.image);

        try {
            await dispatch(editProfile(data)).unwrap();

            toast.success('Update successfully!');
            await dispatch(fetchUser()).unwrap();
        } catch (error) {}
    };

    return (
        <Model
            isShowModel={isShowModel}
            handleCloseModel={() => setShowModel(false)}
        >
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(onSubmit)}
                className={classNames(
                    'w-[632px] cursor-default ease-out duration-300',
                    isShowModel ? 'translate-y-0' : '-translate-y-10',
                )}
            >
                <div className='flex items-center gap-5 px-5 py-3.75 bg-black-1 dark:bg-dark-black-2'>
                    <Button
                        onClick={() => setShowModel(false)}
                        className='w-8.5 h-8.5'
                    >
                        <CloseIcon className='text-white-3' />
                    </Button>
                    <div className='-ml-[6px] flex-1 font-semibold text-xl leading-xl text-white'>
                        Edit profile
                    </div>
                    <Button
                        disabled={avatar.isLoading || background.isLoading}
                        type='submit'
                        className='w-[107px] h-8.5 bg-blue-white-2 text-xl leading-xl text-white'
                    >
                        save
                    </Button>
                </div>
                <div className='h-[calc(100vh_-_134px)] bg-white dark:bg-[#171616] overflow-auto pb-5'>
                    <ImageUpload
                        className={classNames('aspect-[316/53]')}
                        fallback='/no-background.jpg'
                        src={user.background}
                        image={background}
                    />
                    <ImageUpload
                        wrapperClassName='mx-[18px] -mt-12 w-[100px] h-[100px] rounded-full'
                        image={avatar}
                        src={user.avatar}
                    />
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
            </form>
        </Model>
    );
};

export default EditProfile;
