import { useEffect, useState } from 'react';
import {
    ButtonGlobalComponent,
    FooterGlobalComponent,
    LinkGlobalComponent,
} from '../../../global/component';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/configure-store';
import { getFeedbacksUsers } from '@redux/CleverfitSwaggeFeedbacksAPI';
import { SpinerLoading } from '../../../global';
import './feedbacksFooter.css';

type props = {
    openModalElement: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    setIsErrorModalOpen: (value: boolean) => void;
};
type stateRedux = {
    isLoading: boolean;
};
export const FeedbacksFooter: React.FC<props> = ({ openModalElement, setIsErrorModalOpen }) => {
    const { isLoading } = useSelector<RootState, stateRedux>((item) => item.feedbacks);
    const [openAllFeedbacks, setOpenAllFeedbacks] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const getAllFeedbacks = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const tokenStr = localStorage.getItem('token');
        if (tokenStr && !openAllFeedbacks) {
            setOpenAllFeedbacks(true);
            setLoading(true);
            dispatch(getFeedbacksUsers({ feedbackToken: tokenStr, all: true }));
        } else if (tokenStr && openAllFeedbacks) {
            setOpenAllFeedbacks(false);
            setLoading(true);
            dispatch(getFeedbacksUsers({ feedbackToken: tokenStr }));
        } else {
            setLoading(false);
            setIsErrorModalOpen(true);
        }
    };
    useEffect(() => {
        setLoading(false);
    }, [openAllFeedbacks]);
    return (
        <FooterGlobalComponent addClassName='footer-feedbacks-block'>
            {(isLoading || loading) && <SpinerLoading />}
            <section className='footer__feedbacks'>
                <ButtonGlobalComponent
                    addClassName='footer__feedbacks_button'
                    onClick={openModalElement}
                    dataTestId='write-review'
                >
                    Написать отзыв
                </ButtonGlobalComponent>
                <LinkGlobalComponent
                    addClassName='footer__feedbacks_link'
                    onClick={getAllFeedbacks}
                    dataTestId='all-reviews-button'
                >
                    {!openAllFeedbacks ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                </LinkGlobalComponent>
            </section>
        </FooterGlobalComponent>
    );
};
