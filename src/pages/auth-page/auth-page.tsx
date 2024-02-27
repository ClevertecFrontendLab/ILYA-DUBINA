import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Form, Input, ConfigProvider } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import clever from '../../images/sidebar/Clever.svg';
import fit from '../../images/sidebar/fit.svg';
import { REG_RUS, REG_NUM_WORD, REG_EMAIL } from '../../global/const';
import {
    loginUser,
    clearState,
    getNewEmailPassword,
    saveDataEmail,
    clearDataEmail,
    setBlockError,
} from '../../redux/CleverfitSwaggerAuthAPI';
import { AppDispatch, RootState } from '@redux/configure-store';
import { CommonRoutes } from '../../routes/CommonRoutes';
import { SpinerLoading } from '../../global';
import './auth-page.css';

type stateRedux = {
    isSuccess: boolean;
    isError: boolean;
    errorMessage: string;
    errorStatus: number;
    emailV: string;
    openTransferAuth: boolean;
    isLoading: boolean;
    blockError: boolean;
};
type onFinishType = {
    email: string;
    password: string;
    remember: boolean;
};
const prefixSelector = <Form.Item noStyle>e-mail:</Form.Item>;
export const AuthPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const {
        errorMessage,
        isError,
        isSuccess,
        errorStatus,
        emailV,
        openTransferAuth,
        isLoading,
        blockError,
    } = useSelector<RootState, stateRedux>((state) => state.login);
    const onFinish = ({ email, password, remember }: onFinishType) => {
        const no = REG_RUS.test(password);
        const result = !no && REG_NUM_WORD.test(password);
        const openButtonForm = REG_EMAIL.test(email) && !!password && result;
        if (openButtonForm) {
            setLoading(true);
            dispatch(loginUser({ email, password, remember }));
        }
    };
    const onFinishFailed = () => {
        navigate(CommonRoutes.auth.auth);
    };
    const getEmailPassword = () => {
        const email = form.getFieldValue('email');
        const openButtonForm = REG_EMAIL.test(email);
        if (openButtonForm) {
            dispatch(setBlockError());
            dispatch(saveDataEmail({ email: email }));
            dispatch(getNewEmailPassword(email));
        }
    };
    useEffect(() => {
        if (openTransferAuth && emailV) {
            setLoading(true);
            dispatch(clearDataEmail());
            dispatch(setBlockError());
            dispatch(clearState());
            dispatch(getNewEmailPassword(emailV));
        }
    }, [dispatch, emailV, openTransferAuth]);
    useEffect(() => {
        if (isSuccess && !blockError) {
            dispatch(clearState());
            navigate(CommonRoutes.main);
        }
        if (isSuccess && blockError) {
            dispatch(clearState());
            navigate(CommonRoutes.auth.confirmEmail);
        }
        if (isError && errorStatus === 404 && errorMessage === 'Email не найден') {
            dispatch(clearState());
            navigate(CommonRoutes.result.errorCheckEmailNoExist);
        }
        if (isError && errorMessage !== 'Email не найден' && blockError) {
            dispatch(clearState());
            navigate(CommonRoutes.result.errorCheckEmail);
        }
        if (isError && !blockError) {
            dispatch(clearState());
            navigate(CommonRoutes.result.errorLogin);
        }
    }, [blockError, dispatch, errorMessage, errorStatus, isError, isSuccess, navigate]);
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <div className='container'>
                    <div className='auth__mask_content'>
                        {loading || isLoading ? <SpinerLoading /> : null}
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
                                        ? 'content__buttons_entrance blueColor'
                                        : 'content__buttons_entrance'
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
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#2f54eb',
                                    borderRadius: 2,
                                },
                            }}
                        >
                            <Form
                                className='content__buttons_form'
                                name='formStart'
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                form={form}
                            >
                                <Form.Item
                                    className='form__email'
                                    name='email'
                                    rules={[
                                        {
                                            type: 'email',
                                            message: '',
                                        },
                                        () => ({
                                            validator(_, value) {
                                                const no = REG_EMAIL.test(value);
                                                if (no) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Неверный e-mail'));
                                            },
                                        }),
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}
                                >
                                    <Input
                                        className='form__password_input'
                                        addonBefore={prefixSelector}
                                        data-test-id='login-email'
                                    />
                                </Form.Item>
                                <Form.Item
                                    className='form__password'
                                    name='password'
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
                                        data-test-id='login-password'
                                    />
                                </Form.Item>
                                <Form.Item className='form__checkbox'>
                                    <Form.Item
                                        className='form__checkbox_remember'
                                        name='remember'
                                        valuePropName='checked'
                                    >
                                        <Checkbox data-test-id='login-remember'>
                                            Запомнить меня
                                        </Checkbox>
                                    </Form.Item>
                                    <Form.Item className='form__checkbox_link'>
                                        <Button
                                            className='login-form-forgot'
                                            onClick={getEmailPassword}
                                            data-test-id='login-forgot-button'
                                        >
                                            Забыли пароль?
                                        </Button>
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item className='form__open' shouldUpdate>
                                    {({ getFieldsValue }) => {
                                        const { email, password } = getFieldsValue();
                                        const openButtonForm = !!email && !!password;
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
                                                data-test-id='login-submit-button'
                                            >
                                                Войти
                                            </Button>
                                        );
                                    }}
                                </Form.Item>
                                <Form.Item className='form__openGoogle'>
                                    <Button className='form__openGoogle_button' htmlType='submit'>
                                        <GooglePlusOutlined style={{ color: '#262626' }} />
                                        Войти через Google
                                    </Button>
                                </Form.Item>
                            </Form>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </main>
    );
};
