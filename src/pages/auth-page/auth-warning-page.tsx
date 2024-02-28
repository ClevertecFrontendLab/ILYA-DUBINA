import React from 'react';
import { ErrorAndWarningComponent } from '../../global';
import './auth-warning-page.css';

export const AuthWarningPage: React.FC = () => {
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <ErrorAndWarningComponent
                    warningContent='warning'
                    title='Вход не выполнен'
                    text={'Что-то пошло не так. Попробуйте еще раз'}
                    textLink='Повторить'
                />
            </div>
        </main>
    );
};
