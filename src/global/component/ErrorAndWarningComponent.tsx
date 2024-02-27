import { Link } from 'react-router-dom';
import {
    WarningFilled,
    CloseCircleFilled,
    CheckCircleFilled,
    ExclamationCircleFilled,
} from '@ant-design/icons';
import errorPasswordServer from '../../images/error/errorPasswordServer.svg';
import { CommonRoutes } from '../../routes/CommonRoutes';
import './errorAndWarningComponent.css';

type Props = {
    warningContent?:
        | 'warning'
        | 'error'
        | 'success'
        | 'errorServer'
        | 'recovery'
        | 'successReg'
        | 'successChangeEmail'
        | 'errorEmail'
        | 'errorPassword'
        | 'errorRepeat';
    title: string;
    text?: string | JSX.Element;
    textLink?: string;
    paddingLink?: 'small' | 'large';
    link?: boolean;
    children?: React.ReactNode;
    password?: boolean;
    paddingGeneral?: 'little' | '';
};

export const ErrorAndWarningComponent: React.FC<Props> = ({
    warningContent,
    title,
    text,
    textLink,
    paddingLink = 'large',
    link = true,
    children,
    password = false,
    paddingGeneral = '',
}) => {
    return (
        <article className='containerWarning'>
            <div className={'errorAndWarningComponent' + ` ${paddingGeneral}`}>
                {!password ? (
                    <div className='errorAndWarningComponent__image'>
                        {warningContent === 'warning' && (
                            <WarningFilled className='errorAndWarningComponent__image_warning' />
                        )}
                        {(warningContent === 'error' ||
                            warningContent === 'errorEmail' ||
                            warningContent === 'errorPassword' ||
                            warningContent === 'errorRepeat') && (
                            <CloseCircleFilled className='errorAndWarningComponent__image_error' />
                        )}
                        {(warningContent === 'success' ||
                            warningContent === 'successChangeEmail' ||
                            warningContent === 'successReg') && (
                            <CheckCircleFilled className='errorAndWarningComponent__image_success' />
                        )}
                        {warningContent === 'errorServer' && (
                            <img
                                className='errorAndWarningComponent__image_errorServer'
                                src={errorPasswordServer}
                                alt='картинка ошибки сервера'
                            />
                        )}
                        {warningContent === 'recovery' && (
                            <ExclamationCircleFilled className='errorAndWarningComponent__image_recovery' />
                        )}
                    </div>
                ) : null}
                <h2 className='errorAndWarningComponent__title'>{title}</h2>
                {!password ? <p className='errorAndWarningComponent__text'>{text}</p> : null}
                {children}
                {link ? (
                    <Link
                        className={`errorAndWarningComponent__link ${paddingLink}`}
                        to={
                            warningContent === 'success'
                                ? CommonRoutes.main
                                : warningContent === 'error' || warningContent === 'errorRepeat'
                                ? CommonRoutes.auth.registration
                                : warningContent === 'errorPassword'
                                ? CommonRoutes.auth.changePassword
                                : CommonRoutes.auth.auth
                        }
                        data-test-id={
                            warningContent === 'successReg'
                                ? 'registration-enter-button'
                                : warningContent === 'error'
                                ? 'registration-retry-button'
                                : warningContent === 'errorRepeat'
                                ? 'registration-back-button'
                                : warningContent === 'warning'
                                ? 'login-retry-button'
                                : warningContent === 'errorEmail'
                                ? 'check-retry-button'
                                : warningContent === 'errorServer'
                                ? 'check-back-button'
                                : warningContent === 'errorPassword'
                                ? 'change-retry-button'
                                : warningContent === 'successChangeEmail'
                                ? 'change-entry-button'
                                : null
                        }
                    >
                        {textLink}
                    </Link>
                ) : null}
            </div>
        </article>
    );
};
