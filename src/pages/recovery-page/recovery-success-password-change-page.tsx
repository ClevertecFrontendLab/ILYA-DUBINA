import React from 'react';
import { ErrorAndWarningComponent } from '../../global';
import './recovery-success-password-change-page.css';

export const RecoverySuccessPasswordChangePage: React.FC = () => {
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
