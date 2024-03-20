import './headerGlobalComponent.css';

type props = {
    title: string | JSX.Element;
    children?: React.ReactNode;
    addClassName?: string;
};

export const HeaderGlobalComponent: React.FC<props> = ({ title, children, addClassName }) => {
    return (
        <header className={'header ' + addClassName}>
            <h4 className='header__main'>{title}</h4>
            {children}
        </header>
    );
};
