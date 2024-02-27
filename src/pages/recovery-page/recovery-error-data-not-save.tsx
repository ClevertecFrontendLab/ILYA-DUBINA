import React, { useEffect } from 'react';
import { ErrorAndWarningComponent } from '../../global';
import { useDispatch } from 'react-redux';
import { createTransferAuth } from '@redux/CleverfitSwaggerAuthAPI';
import './recovery-error-data-not-save.css';

export const RecoveryErrorDataNotSave: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(createTransferAuth());
    }, [dispatch]);
    return (
        <main className='auth'>
            <div className='auth__mask'>
                <ErrorAndWarningComponent
                    warningContent='errorPassword'
                    title='Данные не сохранились'
                    text={'Что-то пошло не так. Попробуйте ещё раз'}
                    textLink='Повторить'
                />
            </div>
        </main>
    );
};
