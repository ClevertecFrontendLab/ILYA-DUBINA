import React from 'react';
import { ErrorAndWarningComponent } from '../../global';
import './recovery-error-not-exist-page.css';

export const RecoveryErrorNotExistPage: React.FC = () => {
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <ErrorAndWarningComponent
                    warningContent='errorEmail'
                    title='Такой e-mail не зарегистрирован'
                    text={
                        <React.Fragment>
                            Мы не нашли в базе вашего e-mail. Попробуйте <br /> войти с другим
                            e-mail.
                        </React.Fragment>
                    }
                    textLink='Попробовать снова'
                    paddingLink='small'
                    paddingGeneral='little'
                />
            </div>
        </main>
    );
};
