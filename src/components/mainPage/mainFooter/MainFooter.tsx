import { CommonRoutes } from '../../../routes/CommonRoutes';
import {
    FooterGlobalComponent,
    LinkGlobalComponent,
    ReminderComponent,
} from '../../../global/component';
import './mainFooter.css';

export const MainFooter: React.FC = () => {
    return (
        <FooterGlobalComponent>
            <section className='footer__main'>
                <LinkGlobalComponent toText={CommonRoutes.feedbacks} dataTestId='see-reviews'>
                    Смотреть отзывы
                </LinkGlobalComponent>
                <ReminderComponent download={true} />
            </section>
        </FooterGlobalComponent>
    );
};
