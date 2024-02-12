import { Link } from 'react-router-dom';
import { ReminderComponent } from '../../../global/component';
import './mainFooter.css';

export const MainFooter: React.FC = () => {
    return (
        <>
            <footer className='footer'>
                <Link className='footer__link' to={'#'}>
                    Смотреть отзывы
                </Link>
                <ReminderComponent download={true} />
            </footer>
        </>
    );
};
