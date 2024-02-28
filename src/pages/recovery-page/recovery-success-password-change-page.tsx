import React, { useEffect } from 'react';
import { ErrorAndWarningComponent } from '../../global';
import './recovery-success-password-change-page.css';
import { useDispatch } from 'react-redux';
import { clearState } from '@redux/CleverfitSwaggerAuthAPI';

export const RecoverySuccessPasswordChangePage: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearState());
    }, [dispatch]);
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <ErrorAndWarningComponent
                    warningContent='successChangeEmail'
                    title='Пароль успешно изменен'
                    text={
                        <React.Fragment>
                            Теперь можно войти в аккаунт, используя <br /> свой логин и новый пароль
                        </React.Fragment>
                    }
                    textLink='Вход'
                />
            </div>
        </main>
    );
};
