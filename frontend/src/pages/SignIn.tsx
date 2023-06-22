import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AuthForm from '../components/AuthForm';
import Button from '../components/Button';
import FormGroup from '../components/form/FormGroup';
import Input from '../components/form/Input';
import Label from '../components/form/Label';
import { Link } from 'react-router-dom';
import { SignInType } from '../types';

const schema = yup
    .object({
        email: yup.string().required('Vui lòng nhập email'),
        password: yup.string().required(),
    })
    .required();

const SignUp = () => {
    const { control, handleSubmit } = useForm<SignInType>({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: SignInType) => console.log(data);

    return (
        <AuthForm onSubmit={handleSubmit(onSubmit)} title="Sign In to Hoque">
            <FormGroup className="w-[577px]">
                <Label name="email">Email Address</Label>
                <Input control={control} name="email" type="email" />
            </FormGroup>
            <FormGroup className="w-[577px]">
                <Label name="password">Password</Label>
                <Input control={control} name="password" type="password" />
            </FormGroup>
            <button className="text-white-90 ml-[79.5px] -mt-2 font-medium text-black-4 self-start">
                Forgot Password
            </button>
            <Button
                className="w-[577px] bg-blue-white-2 font-semibold text-xl leading-xl text-white dark:text-white"
                large
                type="submit"
            >
                Sign up
            </Button>
            <span className="font-semibold text-black dark:text-white">
                Don’t have an account?{' '}
                <Link
                    className="text-blue dark:text-blue-white-1"
                    to="/sign-up"
                >
                    sign up
                </Link>
            </span>
        </AuthForm>
    );
};

export default SignUp;
