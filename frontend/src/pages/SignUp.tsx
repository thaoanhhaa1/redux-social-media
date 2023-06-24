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
import { fetchUser, setUser, signUp } from '../features/user/userSlice';
import { SignUpType } from '../types';

const schema = yup
    .object({
        username: yup
            .string()
            .required(message.username.require)
            .matches(regex.username, message.username.regex),
        email: yup
            .string()
            .required(message.email.require)
            .email(message.email.regex),
        password: yup
            .string()
            .required(message.password.require)
            .matches(regex.password, message.password.regex),
        'confirm-password': yup
            .string()
            .required(message.password.require)
            .oneOf([yup.ref('password')], message.confirmPassword.match),
    })
    .required();

const SignUp = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpType>({
        resolver: yupResolver(schema),
    });
    const navigation = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (users: SignUpType) => {
        try {
            const data = await dispatch(signUp(users)).unwrap();

            document.cookie = data;

            const user = await dispatch(fetchUser()).unwrap();

            dispatch(setUser(user));

            navigation(config.routes.home);
            toast.success('Sign Up Success!');
        } catch (error) {}
    };

    return (
        <AuthForm
            onSubmit={handleSubmit(onSubmit)}
            title="Sign up to Hoque"
            description="it’s free and only rakes a minute"
        >
            <FormGroup className="w-[577px]">
                <Label name="username">Username</Label>
                <Input control={control} name="username" />
                {errors.username?.message && (
                    <ErrorMessage message={errors.username?.message} />
                )}
            </FormGroup>
            <FormGroup className="w-[577px]">
                <Label name="email">Email Address</Label>
                <Input control={control} name="email" />
                {errors.email?.message && (
                    <ErrorMessage message={errors.email?.message} />
                )}
            </FormGroup>
            <FormGroup className="w-[577px]">
                <Label name="password">Password</Label>
                <Input control={control} name="password" type="password" />
                {errors.password?.message && (
                    <ErrorMessage message={errors.password?.message} />
                )}
            </FormGroup>
            <FormGroup className="w-[577px]">
                <Label name="confirm-password">Confirm Password</Label>
                <Input
                    control={control}
                    name="confirm-password"
                    type="password"
                />
                {errors['confirm-password']?.message && (
                    <ErrorMessage
                        message={errors['confirm-password']?.message}
                    />
                )}
            </FormGroup>
            <Button
                className="w-[577px] bg-blue-white-2 font-semibold text-xl leading-xl text-white"
                large
                type="submit"
            >
                Sign up
            </Button>
            <span className="max-w-[319px] font-medium text-center text-sm leading-sm text-black dark:text-white">
                By cliking the sign up button,{' '}
                <Link className="text-blue" to="/">
                    you agree to our Trems & Conditions
                </Link>
                , and{' '}
                <Link className="text-blue" to="/">
                    privacy policy
                </Link>
            </span>
            <span className="max-w-[319px] font-medium text-center text-sm leading-sm text-black-7 dark:text-white">
                Already a member?{' '}
                <Link
                    className="text-blue dark:text-blue-white-2"
                    to="/sign-in"
                >
                    sign in
                </Link>
            </span>
        </AuthForm>
    );
};

export default SignUp;
