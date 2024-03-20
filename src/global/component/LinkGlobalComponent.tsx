import { Link } from 'react-router-dom';
import './linkGlobalComponent.css';
type props = {
    toText?: string;
    children?: string | JSX.Element;
    addClassName?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    dataTestId?: string;
};
export const LinkGlobalComponent: React.FC<props> = ({
    toText = '#',
    children,
    addClassName,
    onClick,
    dataTestId,
}) => {
    return (
        <Link
            className={'link__global ' + addClassName}
            to={toText}
            onClick={onClick}
            data-test-id={dataTestId}
        >
            {children}
        </Link>
    );
};
