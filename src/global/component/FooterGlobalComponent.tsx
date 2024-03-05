import './footerGlobalComponent.css';
type props = {
    children?: React.ReactNode;
};
export const FooterGlobalComponent: React.FC<props> = ({ children }) => {
    return <footer className='footer'>{children}</footer>;
};
