import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AuthForm from '../components/AuthForm';
import FormGroup from '../components/form/FormGroup';
import Input from '../components/form/Input';
import Label from '../components/form/Label';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { SignUpType } from '../types';

const schema = yup
    .object({
        username: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
        'confirm-password': yup.string().required(),
    })
    .required();

const SignUp = () => {
    const { control, handleSubmit } = useForm<SignUpType>({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: SignUpType) => console.log(data);

    return (
        <AuthForm
            onSubmit={handleSubmit(onSubmit)}
            title="Sign up to Hoque"
            description="it’s free and only rakes a minute"
        >
            <FormGroup className="w-[577px]">
                <Label name="username">Username</Label>
                <Input control={control} name="username" />
            </FormGroup>
            <FormGroup className="w-[577px]">
                <Label name="email">Email Address</Label>
                <Input control={control} name="email" type="email" />
            </FormGroup>
            <FormGroup className="w-[577px]">
                <Label name="password">Password</Label>
                <Input control={control} name="password" type="password" />
            </FormGroup>
            <FormGroup className="w-[577px]">
                <Label name="confirm-password">Confirm Password</Label>
                <Input
                    control={control}
                    name="confirm-password"
                    type="password"
                />
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
