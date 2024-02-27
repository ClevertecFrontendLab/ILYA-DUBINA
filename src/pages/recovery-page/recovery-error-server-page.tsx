import React, { useEffect } from 'react';
import { ErrorAndWarningComponent } from '../../global';
import { useDispatch } from 'react-redux';
import { createTransferAuth } from '@redux/CleverfitSwaggerAuthAPI';
import './recovery-error-server-page.css';

export const RecoveryErrorServerPage: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(createTransferAuth());
    }, [dispatch]);
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <ErrorAndWarningComponent
                    warningContent='errorServer'
                    title='Что-то пошло не так'
                    text={'Произошла ошибка, попробуйте отправить форму ещё раз.'}
                    textLink='Назад'
                    paddingLink='small'
                    paddingGeneral={'little'}
                />
            </div>
        </main>
    );
};
