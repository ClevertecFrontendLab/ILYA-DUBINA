import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorAndWarningComponent, SpinerLoading } from '../../global';
import VerificationInput from 'react-verification-input';
import { AppDispatch, RootState } from '@redux/configure-store';
import { clearState, getNewCodeV, saveCode } from '../../redux/CleverfitSwaggerAuthAPI';
import { CommonRoutes } from '../../routes/CommonRoutes';
import './recovery-number-page.css';

type stateRedux = {
    emailV: string;
    isError: boolean;
    isSuccess: boolean;
    isLoading: boolean;
    errorStatus: number;
};
export const RecoveryNumberPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [code, setCode] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorNumber, setErrorNumber] = useState<boolean>(false);
    const { emailV, isError, isSuccess, isLoading, errorStatus } = useSelector<
        RootState,
        stateRedux
    >((state) => state.login);
    const setCodeV = (e: string) => {
        setCode(e);
    };
    useEffect(() => {
        setErrorNumber(false);
        if (code.length === 6) {
            setLoading(true);
            dispatch(saveCode({ code }));
            dispatch(getNewCodeV({ email: emailV, code }));
        }
    }, [code, dispatch, emailV]);
    useEffect(() => {
        console.log(isError, isSuccess);
        if (isError || !emailV || errorStatus === 404) {
            dispatch(clearState());
            setErrorNumber(true);
            setCode('');
            setLoading(false);
        }
        if (isSuccess && code.length === 6) {
            dispatch(clearState());
            navigate(CommonRoutes.auth.changePassword);
        }
    }, [dispatch, isError, isSuccess, navigate]);
    return (
        <main className='auth'>
            <div className='auth__mask'>
                {isLoading || loading ? <SpinerLoading /> : null}
                <ErrorAndWarningComponent
                    warningContent={!errorNumber ? 'recovery' : 'error'}
                    title={
                        !errorNumber
                            ? 'Введите код \n для восстановления аккаунта'
                            : 'Неверный код. Введите код для восстановления аккаунта'
                    }
                    text={
                        <React.Fragment>
                            Мы отправили вам на e-mail <strong>{emailV}</strong>
                            <br className='recovery__text' />
                            шестизначный код. Введите его в поле ниже.
                        </React.Fragment>
                    }
                    link={false}
                >
                    <VerificationInput
                        inputProps={{ 'data-test-id': 'verification-input' }}
                        classNames={{
                            container: 'containerV',
                            character: 'characterV' + ` ${errorNumber ? 'border-red' : ''}`,
                            characterInactive: 'characterV-inactiveV',
                            characterSelected: 'characterV-SelectedV',
                            characterFilled: 'characterV-FilledV',
                        }}
                        validChars={'0-9'}
                        placeholder={''}
                        onChange={setCodeV}
                        value={code}
                    />
                    <p className='recovery__text'>Не пришло письмо? Проверьте папку Спам.</p>
                </ErrorAndWarningComponent>
            </div>
        </main>
    );
};
