import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, ConfigProvider } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import clever from '../../images/sidebar/Clever.svg';
import fit from '../../images/sidebar/fit.svg';
import { REG_RUS, REG_NUM_WORD, REG_EMAIL } from '../../global/const';
import {
    signupUser,
    clearStateS,
    saveDataPost,
    clearData,
} from '../../redux/CleverfitSwaggerRegistrationAPI';
import { AppDispatch, RootState } from '@redux/configure-store';
import { useNavigate, useLocation } from 'react-router-dom';
import { CommonRoutes } from '../../routes/CommonRoutes';
import { SpinerLoading } from '../../global';
import './registration-page.css';

type stateRedux = {
    status: string;
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    openTransfer: boolean;
    emailS: string;
    passwordS: string;
    isLoading: boolean;
};
type onFinishType = {
    email: string;
    password: string;
};
const prefixSelector = <Form.Item noStyle>e-mail:</Form.Item>;
export const RegistrationPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { pathname } = useLocation();
    const { status, errorMessage, isError, isSuccess, openTransfer, emailS, passwordS, isLoading } =
        useSelector<RootState, stateRedux>((state) => state.signup);
    const onFinish = ({ email, password }: onFinishType) => {
        setLoading(true);
        dispatch(saveDataPost({ email, password }));
        dispatch(signupUser({ email, password }));
    };
    const onFinishFailed = () => {
        dispatch(clearStateS());
        navigate(CommonRoutes.result.error);
    };
    useEffect(() => {
        if (openTransfer && emailS && passwordS) {
            setLoading(true);
            dispatch(signupUser({ email: emailS, password: passwordS }));
            dispatch(clearData());
        }
    }, [dispatch, emailS, openTransfer, passwordS]);
    useEffect(() => {
        if (isSuccess && status === '201') {
            dispatch(clearStateS());
            navigate(CommonRoutes.result.success);
        }
        if (isError && status === '409') {
            dispatch(clearStateS());
            navigate(CommonRoutes.result.errorUserExist);
        }
        if (isError && status !== '409') {
            navigate(CommonRoutes.result.error);
        }
    }, [dispatch, errorMessage, isError, isSuccess, navigate, status]);
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <div className='container'>
                    <div className='auth__mask_content registration__auth__mask_content'>
                        {isLoading || loading ? <SpinerLoading /> : null}
                        <div className='content__logo'>
                            <img
                                className='content__logo_clever'
                                src={clever}
                                alt='картинка логотипа clever'
                            />
                            <img
                                className='content__logo_fit'
                                src={fit}
                                alt='картинка логотипа fit'
                            />
                        </div>
                        <div className='content__buttons'>
                            <NavLink
                                to={CommonRoutes.auth.auth}
                                className={({ isActive }) =>
                                    isActive || pathname === '/'
                                        ? 'content__buttons_entrance'
                                        : 'content__buttons_entrance blueColor'
                                }
                            >
                                Вход
                            </NavLink>
                            <NavLink
                                to={CommonRoutes.auth.registration}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'content__buttons_registration blueColor'
                                        : 'content__buttons_registration'
                                }
                            >
                                Регистрация
                            </NavLink>
                        </div>
                        <Form
                            className='content__buttons_form'
                            name='formRegistration'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                className='form__email'
                                name='email'
                                help=''
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                    () => ({
                                        validator(_, value) {
                                            const no = REG_EMAIL.test(value);
                                            if (no) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error(''));
                                        },
                                    }),
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input
                                    className='form__password_input'
                                    addonBefore={prefixSelector}
                                    data-test-id='registration-email'
                                />
                            </Form.Item>
                            <Form.Item
                                className='form__password registration__form__password'
                                name='password'
                                help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                                shouldUpdate
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    () => ({
                                        validator(_, value) {
                                            const no = REG_RUS.test(value);
                                            const result = !no && REG_NUM_WORD.test(value);
                                            if (result) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    'Пароль не менее 8 символов, с заглавной буквой и цифрой!',
                                                ),
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    className='form__password_input'
                                    placeholder='Пароль'
                                    data-test-id='registration-password'
                                />
                            </Form.Item>
                            <Form.Item
                                className='form__password twoPassword'
                                name='twoPassword'
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Пароли не совпадают'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    className='form__password_input'
                                    placeholder='Повторите пароль'
                                    data-test-id='registration-confirm-password'
                                />
                            </Form.Item>
                            <Form.Item className='form__open' shouldUpdate>
                                {({ getFieldsValue }) => {
                                    const { email, password, twoPassword } = getFieldsValue();
                                    const no = REG_RUS.test(password);
                                    const result = !no && REG_NUM_WORD.test(password);
                                    const openButtonForm =
                                        !!email &&
                                        !!password &&
                                        !!twoPassword &&
                                        password === twoPassword &&
                                        result;
                                    return (
                                        <Button
                                            className={
                                                openButtonForm
                                                    ? 'form__open_button'
                                                    : 'form__open_button colorButton'
                                            }
                                            type='primary'
                                            htmlType='submit'
                                            disabled={!openButtonForm}
                                            data-test-id='registration-submit-button'
                                        >
                                            Войти
                                        </Button>
                                    );
                                }}
                            </Form.Item>
                            <Form.Item className='form__openGoogle'>
                                <Button className='form__openGoogle_button' htmlType='submit'>
                                    <GooglePlusOutlined style={{ color: '#262626' }} />
                                    Регистрация через Google
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    );
};
