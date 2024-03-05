import { CommonRoutes } from '../../../routes/CommonRoutes';
import { HeaderGlobalComponent, LinkGlobalComponent } from '../../../global/component';
import './feedbacksHeader.css';

export const FeedbacksHeader: React.FC = () => {
    return (
        <HeaderGlobalComponent
            title={
                <>
                    <LinkGlobalComponent
                        addClassName='feedbacks__header'
                        toText={CommonRoutes.main}
                    >
                        Главная &nbsp;/
                    </LinkGlobalComponent>
                    <LinkGlobalComponent
                        addClassName='feedbacks__header_next'
                        toText={CommonRoutes.feedbacks}
                    >
                        Отзывы пользователей
                    </LinkGlobalComponent>
                </>
            }
        />
    );
};
