import React from 'react';
import { ErrorAndWarningComponent } from '../../global';
import './auth-success-registration-page.css';

export const AuthSuccessRegistrationPage: React.FC = () => {
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <ErrorAndWarningComponent
                    warningContent='successReg'
                    title='Регистрация успешна'
                    text={
                        <React.Fragment>
                            Регистрация прошла успешно. Зайдите
                            <br className='auth__success_registration-br' /> в приложение, используя
                            свои e-mail и пароль.
                        </React.Fragment>
                    }
                    textLink='Войти'
                />
            </div>
        </main>
    );
};
