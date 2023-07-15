import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { AppDispatch } from '../app/store';
import AuthForm from '../components/AuthForm';
import Button from '../components/Button';
import ErrorMessage from '../components/form/ErrorMessage';
import FormGroup from '../components/form/FormGroup';
import Input from '../components/form/Input';
import Label from '../components/form/Label';
import config from '../config';
import { message, regex } from '../constants';
import { fetchUser, signIn } from '../features/user';
import { SignInType } from '../types';

const schema = yup
    .object({
        email: yup
            .string()
            .required(message.email.require)
            .email(message.email.regex),
        password: yup
            .string()
            .required(message.password.require)
            .matches(regex.password, message.password.regex),
    })
    .required();

const SignUp = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInType>({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit = async (data: SignInType) => {
        try {
            const token = await dispatch(signIn(data)).unwrap();

            document.cookie = token;

            await dispatch(fetchUser()).unwrap();

            toast.success('Logged in successfully!');
            navigate(config.routes.home);
        } catch (error) {}
    };

    return (
        <AuthForm onSubmit={handleSubmit(onSubmit)} title='Sign In to Hoque'>
            <FormGroup className='w-[577px]'>
                <Label name='email'>Email Address</Label>
                <Input control={control} name='email' />
                {errors.email?.message && (
                    <ErrorMessage message={errors.email?.message} />
                )}
            </FormGroup>
            <FormGroup className='w-[577px]'>
                <Label name='password'>Password</Label>
                <Input control={control} name='password' type='password' />
                {errors.password?.message && (
                    <ErrorMessage message={errors.password?.message} />
                )}
            </FormGroup>
            <button className='text-white-90 ml-[79.5px] -mt-2 font-medium text-black-4 dark:text-white self-start'>
                Forgot Password
            </button>
            <Button
                className='w-[577px] bg-blue-white-2 font-semibold text-xl leading-xl text-white dark:text-white'
                large
                type='submit'
            >
                Sign up
            </Button>
            <span className='font-semibold text-black dark:text-white'>
                Don’t have an account?{' '}
                <Link
                    className='text-blue dark:text-blue-white-1'
                    to='/sign-up'
                >
                    sign up
                </Link>
            </span>
        </AuthForm>
    );
};

export default SignUp;
