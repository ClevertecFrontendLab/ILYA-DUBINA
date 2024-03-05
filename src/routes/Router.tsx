import { Suspense, useEffect } from 'react';
import { Routes, Route, useSearchParams } from 'react-router-dom';
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
    MainPage,
    RecoveryNumberPage,
    RecoverySuccessPasswordChangePage,
    RegistrationPage,
    FeedbacksPage,
} from '../pages';
import { CommonRoutes } from './CommonRoutes.ts';
import { push } from 'redux-first-history';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/configure-store';

export const Router = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const navigationEntries: any = window.performance.getEntriesByType('navigation');
        const haveToken = !!localStorage.getItem('token');
        if (searchParams.get('accessToken')) {
            const token = searchParams.get('accessToken');
            token ? localStorage.setItem('token', token) : null;
            dispatch(push(CommonRoutes.main));
        } else if (haveToken && navigationEntries[0].type !== 'reload') {
            dispatch(push(CommonRoutes.main));
        } else if (
            navigationEntries[0].type === 'reload' &&
            navigationEntries.length > 0 &&
            (navigationEntries[0].name !== 'http://localhost:3000/' ||
                navigationEntries[0].name !== 'http://localhost:3000/auth')
        ) {
            localStorage.clear();
            dispatch(push(CommonRoutes.auth.auth));
        } else {
            localStorage.clear();
            dispatch(push(CommonRoutes.auth.auth));
        }
    }, [dispatch, searchParams]);
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
            <Route
                path={CommonRoutes.feedbacks}
                element={
                    <Suspense fallback={<SpinerLoading />}>
                        <FeedbacksPage />
                    </Suspense>
                }
            />
        </Routes>
    );
};
