import React from 'react';
import { ErrorAndWarningComponent } from '../../global';
import './auth-error-registration-repeat-email-page.css';

export const AuthErrorRegistrationRepeatEmailPage: React.FC = () => {
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <ErrorAndWarningComponent
                    warningContent='errorRepeat'
                    title='Данные не сохранились'
                    text={
                        <React.Fragment>
                            Такой e-mail уже записан в системе. Попробуйте <br />
                            зарегистрироваться по другому e-mail.
                        </React.Fragment>
                    }
                    textLink='Назад к регистрации'
                    paddingText={'big'}
                />
            </div>
        </main>
    );
};
