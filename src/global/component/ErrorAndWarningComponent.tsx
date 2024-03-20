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
    paddingText?: 'big' | '';
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    addClassNameText?: string;
    dataTestId?: string;
};
type dataTestIdObjectType = {
    successReg: string;
    error: string;
    errorRepeat: string;
    warning: string;
    errorEmail: string;
    errorServer: string;
    errorPassword: string;
    successChangeEmail: string;
    default: string;
    [key: string]: string;
};
type toObjectType = {
    success: string;
    error: string;
    errorRepeat: string;
    errorPassword: string;
    warning: string;
    errorEmail: string;
    errorServer: string;
    successChangeEmail: string;
    recovery: string;
    successReg: string;
    [key: string]: string;
};
const dataTestIdObject: dataTestIdObjectType = {
    successReg: 'registration-enter-button',
    error: 'registration-retry-button',
    errorRepeat: 'registration-back-button',
    warning: 'login-retry-button',
    errorEmail: 'check-retry-button',
    errorServer: 'check-back-button',
    errorPassword: 'change-retry-button',
    successChangeEmail: 'change-entry-button',
    default: 'default',
};
const toObject: toObjectType = {
    success: CommonRoutes.main,
    errorRepeat: CommonRoutes.auth.registration,
    error: CommonRoutes.auth.registration,
    errorPassword: CommonRoutes.auth.changePassword,
    warning: CommonRoutes.auth.auth,
    errorEmail: CommonRoutes.auth.auth,
    errorServer: CommonRoutes.auth.auth,
    successChangeEmail: CommonRoutes.auth.auth,
    recovery: CommonRoutes.auth.auth,
    successReg: CommonRoutes.auth.auth,
};
export const ErrorAndWarningComponent: React.FC<Props> = ({
    warningContent = 'default',
    title,
    text,
    textLink,
    paddingLink = 'large',
    link = true,
    children,
    password = false,
    paddingGeneral = '',
    paddingText = '',
    addClassNameText = '',
    onClick,
    dataTestId,
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
                {!password ? (
                    <p
                        className={
                            'errorAndWarningComponent__text ' + `${paddingText} ` + addClassNameText
                        }
                    >
                        {text}
                    </p>
                ) : null}
                {children}
                {link ? (
                    <Link
                        className={`errorAndWarningComponent__link ${paddingLink}`}
                        to={onClick ? '' : toObject[warningContent]}
                        data-test-id={dataTestId ? dataTestId : dataTestIdObject[warningContent]}
                        onClick={onClick}
                    >
                        {textLink}
                    </Link>
                ) : null}
            </div>
        </article>
    );
};
