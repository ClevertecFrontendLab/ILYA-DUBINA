import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpinerLoading } from '../global/index.ts';
import {
    AuthErrorRegistrationRepeatEmailPage,
    AuthErrorRegistrationServerPage,
    AuthPage,
    AuthSuccessRegistrationPage,
    AuthWarningPage,
    RecoveryErrorDataNotSave,
    RecoveryErrorNotExistPage,
    RecoveryErrorServerPage,
    RecoveryNewPasswordPage,
    RecoveryNumberPage,
    RecoverySuccessPasswordChangePage,
    RegistrationPage,
} from '../pages';
import { CommonRoutes } from './CommonRoutes.ts';
import { push } from 'redux-first-history';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/configure-store';

const MainPage = lazy(async () => ({
    default: (await import('../pages/main-page/main-page.tsx')).MainPage,
}));

export const Router = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const haveToken = !!localStorage.getItem('token');
        if (haveToken) {
            dispatch(push(CommonRoutes.main));
        } else {
            dispatch(push(CommonRoutes.auth.auth));
        }
    }, [dispatch]);
    return (
        <Routes>
            <Route
                index
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <AuthPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.auth.auth}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <AuthPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.auth.registration}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <RegistrationPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.main}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <MainPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.result.errorLogin}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <AuthWarningPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.result.error}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <AuthErrorRegistrationServerPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.result.success}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <AuthSuccessRegistrationPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.result.errorUserExist}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <AuthErrorRegistrationRepeatEmailPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.result.errorCheckEmailNoExist}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <RecoveryErrorNotExistPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.result.errorCheckEmail}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <RecoveryErrorServerPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.auth.confirmEmail}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <RecoveryNumberPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.auth.changePassword}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <RecoveryNewPasswordPage />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.result.errorChangePassword}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <RecoveryErrorDataNotSave />
                    </Suspense>
                }
            />
            <Route
                path={CommonRoutes.result.successChangePassword}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <RecoverySuccessPasswordChangePage />
                    </Suspense>
                }
            />
        </Routes>
    );
};
