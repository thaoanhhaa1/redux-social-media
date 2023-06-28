import { yupResolver } from '@hookform/resolvers/yup';
import { MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { message, regex } from '../constants';
import { editProfile, fetchUser } from '../features/user/userSlice';
import { ProfileType } from '../types';
import { classNames, isAdult } from '../utils';
import Button from './Button';
import { CameraIcon, CloseIcon } from './Icons';
import Image from './Image';
import ErrorMessage from './form/ErrorMessage';
import FormGroup from './form/FormGroup';
import Input from './form/Input';
import Label from './form/Label';

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
    handleShowModel,
}: {
    isShowModel: boolean;
    handleShowModel: () => void;
}) => {
    const user = useSelector((state: RootState) => state.user);
    console.log('🚀 ~ user:', user);
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ProfileType>({
        resolver: yupResolver(schema),
        defaultValues: {
            ...user,
            birthday: user?.birthday?.substring(0, 10),
        },
    });
    const dispatch = useAppDispatch();

    const onSubmit = async (data: ProfileType) => {
        if (!isAdult(new Date(data.birthday)))
            setError('birthday', {
                message: message.birthday.isAdult,
            });

        await dispatch(editProfile(data));
        await dispatch(fetchUser());
    };

    return (
        <div
            onClick={handleShowModel}
            className={classNames(
                'fixed inset-0 bg-black-100 bg-opacity-20 dark:bg-black-100 dark:bg-opacity-50 z-50 cursor-pointer ease-linear duration-150',
                isShowModel ? 'visible opacity-100' : 'opacity-0 invisible',
            )}
        >
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(onSubmit)}
                className={classNames(
                    'w-[632px] mt-17.5 mx-auto cursor-default ease-out duration-300',
                    isShowModel ? 'translate-y-0' : '-translate-y-10',
                )}
            >
                <div className="flex items-center gap-5 px-5 py-3.75 bg-black-1 dark:bg-dark-black-2">
                    <Button onClick={handleShowModel} className="w-8.5 h-8.5">
                        <CloseIcon className="stroke-white-3" />
                    </Button>
                    <div className="-ml-[6px] flex-1 font-semibold text-xl leading-xl text-white">
                        Edit profile
                    </div>
                    <Button
                        type="submit"
                        className="w-[107px] h-8.5 bg-blue-white-2 text-xl leading-xl text-white"
                    >
                        save
                    </Button>
                </div>
                <div className="h-[calc(100vh_-_134px)] bg-white dark:bg-[#171616] overflow-auto pb-5">
                    <div className="relative">
                        <Image
                            alt=""
                            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                            className="aspect-[316/53]"
                        />
                        <Button
                            onClick={(e: MouseEvent) => e.stopPropagation()}
                            className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                            icon={<CameraIcon stroke="white" />}
                        />
                    </div>
                    <div className="relative mx-[18px] -mt-12 w-[100px] h-[100px] rounded-full overflow-hidden">
                        <Image
                            alt=""
                            src="https://images.unsplash.com/photo-1664527184222-420bb0fec61a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
                        />
                        <Button
                            onClick={(e: MouseEvent) => e.stopPropagation()}
                            icon={<CameraIcon stroke="black" />}
                            className="absolute top-0 left-0 w-full h-full bg-white-3 bg-opacity-50"
                        />
                    </div>
                    <div className="flex flex-col gap-5 mt-4 px-5">
                        <FormGroup>
                            <Label name="name">Name</Label>
                            <Input control={control} name="name" />
                            {errors.name?.message && (
                                <ErrorMessage message={errors.name?.message} />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label name="bio">Bio</Label>
                            <Input control={control} name="bio" />
                            {errors.bio?.message && (
                                <ErrorMessage message={errors.bio?.message} />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label name="location">Location</Label>
                            <Input control={control} name="location" />
                            {errors.location?.message && (
                                <ErrorMessage
                                    message={errors.location?.message}
                                />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label name="website">Website</Label>
                            <Input control={control} name="website" />
                            {errors.website?.message && (
                                <ErrorMessage
                                    message={errors.website?.message}
                                />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label name="birthday">Birth day</Label>
                            <Input
                                type="date"
                                control={control}
                                name="birthday"
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
        </div>
    );
};

export default EditProfile;
