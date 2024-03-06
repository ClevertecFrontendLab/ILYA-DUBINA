import './buttonGlobalComponent.css';
type props = {
    children: string | JSX.Element;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    addClassName?: string;
    dataTestId?: string;
    disabled?: boolean;
};
export const ButtonGlobalComponent: React.FC<props> = ({
    onClick,
    children,
    addClassName = '',
    dataTestId,
    disabled,
}) => {
    return (
        <button
            className={'button__global ' + addClassName}
            onClick={onClick}
            data-test-id={dataTestId}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
