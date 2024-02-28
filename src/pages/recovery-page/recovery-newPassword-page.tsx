import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { ErrorAndWarningComponent, SpinerLoading } from '../../global';
import { REG_NUM_WORD, REG_RUS } from '../../global/const';
import { AppDispatch, RootState } from '@redux/configure-store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CommonRoutes } from '../../routes/CommonRoutes';
import {
    clearState,
    setNewCodeV,
    saveDataPasswords,
    clearDataPasswords,
    clearBlockError,
} from '../../redux/CleverfitSwaggerAuthAPI';
import './recovery-newPassword-page.css';

type stateRedux = {
    isSuccess: boolean;
    isError: boolean;
    openTransferAuth: boolean;
    passwordV: string;
    twoPasswordV: string;
    isLoading: boolean;
};
export const RecoveryNewPasswordPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isError, isSuccess, openTransferAuth, passwordV, twoPasswordV, isLoading } =
        useSelector<RootState, stateRedux>((state) => state.login);
    const onFinish = ({ password, twoPassword }: { password: string; twoPassword: string }) => {
        setLoading(true);
        dispatch(saveDataPasswords({ password, twoPassword }));
        dispatch(setNewCodeV({ password, twoPassword }));
    };
    const onFinishFailed = (value: { values: { password: string; twoPassword: string } }) => {
        dispatch(
            saveDataPasswords({
                passwordV: value.values.password,
                twoPasswordV: value.values.twoPassword,
            }),
        );
        navigate(CommonRoutes.result.errorChangePassword);
    };
    useEffect(() => {
        if (openTransferAuth && passwordV) {
            setLoading(true);
            dispatch(
                setNewCodeV({
                    password: passwordV,
                    twoPassword: twoPasswordV,
                }),
            );
            dispatch(clearDataPasswords());
            dispatch(clearState());
        }
        if (isError) {
            navigate(CommonRoutes.result.errorChangePassword);
        }
        if (isSuccess) {
            dispatch(clearState());
            dispatch(clearBlockError());
            navigate(CommonRoutes.result.successChangePassword);
        }
    }, [dispatch, isError, isSuccess, navigate, openTransferAuth, passwordV, twoPasswordV]);
    return (
        <main className='auth'>
            <div className='auth__mask'>
                {isLoading || loading ? <SpinerLoading /> : null}
                <ErrorAndWarningComponent
                    title={'Восстановление аккауанта'}
                    password={true}
                    link={false}
                >
                    <Form
                        className='content__buttons_form newPassword__form'
                        name='formRegistration'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            className='form__password registration__form__password newPassword__item'
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
                                data-test-id='change-password'
                            />
                        </Form.Item>
                        <Form.Item
                            className='form__password twoPassword recovery__twoPassword'
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
                                data-test-id='change-confirm-password'
                            />
                        </Form.Item>
                        <Form.Item className='form__open' shouldUpdate>
                            {({ getFieldsValue }) => {
                                const { password, twoPassword } = getFieldsValue();
                                const no = REG_RUS.test(password);
                                const result = !no && REG_NUM_WORD.test(password);
                                const openButtonForm =
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
                                        data-test-id='change-submit-button'
                                    >
                                        Сохранить
                                    </Button>
                                );
                            }}
                        </Form.Item>
                    </Form>
                </ErrorAndWarningComponent>
            </div>
        </main>
    );
};
