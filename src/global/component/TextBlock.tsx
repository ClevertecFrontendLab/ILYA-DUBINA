import './textBlock.css';

type Props = {
    color?: string;
    sizeEm?: string;
    weight?: string;
    children: string;
};

export const TextBlock: React.FC<Props> = ({
    color = '#262626',
    sizeEm = '1em',
    weight = '400',
    children,
}) => {
    return (
        <article className='text'>
            <p
                className='text__content'
                style={{ color: `${color}`, fontSize: `${sizeEm}`, fontWeight: `${weight}` }}
            >
                {children}
            </p>
        </article>
    );
};
