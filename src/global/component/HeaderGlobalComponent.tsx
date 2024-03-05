import './headerGlobalComponent.css';

type props = {
    title: string | JSX.Element;
    children?: React.ReactNode;
};

export const HeaderGlobalComponent: React.FC<props> = ({ title, children }) => {
    return (
        <header className='header'>
            <h4 className='header__main'>{title}</h4>
            {children}
        </header>
    );
};
