import React, { useEffect } from 'react';
import { ErrorAndWarningComponent } from '../../global';
import { useDispatch } from 'react-redux';
import { createTransfer } from '@redux/CleverfitSwaggerRegistrationAPI';
import './auth-error-registration-server-page.css';

export const AuthErrorRegistrationServerPage: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(createTransfer());
    }, [dispatch]);
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <ErrorAndWarningComponent
                    warningContent='error'
                    title='Данные не сохранились'
                    text={
                        <React.Fragment>
                            Что-то пошло не так и ваша регистрация <br /> не завершилась. Попробуйте
                            ещё раз.
                        </React.Fragment>
                    }
                    textLink='Повторить'
                />
            </div>
        </main>
    );
};
