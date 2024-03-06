import './textBlock.css';

type Props = {
    text?: string;
    title?: string;
    children?: React.ReactNode;
    addClassNameBlock?: string;
    addClassNameBlockText?: string;
};
export const TextBlock: React.FC<Props> = ({
    children,
    title,
    text,
    addClassNameBlock,
    addClassNameBlockText,
}) => {
    return (
        <article className={'text ' + addClassNameBlock}>
            {title && <h2 className='text__title'>{title}</h2>}
            {text && <p className={'text__content ' + addClassNameBlockText}>{text}</p>}
            {children}
        </article>
    );
};
