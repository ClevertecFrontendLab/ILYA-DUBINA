import './footerGlobalComponent.css';
type props = {
    children?: React.ReactNode;
    addClassName?: string;
};
export const FooterGlobalComponent: React.FC<props> = ({ children, addClassName }) => {
    return <footer className={'footer ' + addClassName}>{children}</footer>;
};
