import { ButtonGlobalComponent, SpinerLoading, TextBlock } from '../../global';
import { MainSidebar } from '../../components/mainPage';
import {
    FeedbacksHeader,
    FeedbacksFooter,
    FeedbacksCardUser,
    FeedbacksModal,
    SuccessFeedbacksModal,
    ErrorFeedbacksModal,
    ServerErrorFeedbacksModal,
} from '@components/feedbacksPage';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@redux/configure-store';
import { clearDataModal, getFeedbacksUsers, clearStateF } from '@redux/CleverfitSwaggeFeedbacksAPI';
import { CommonRoutes } from '../../routes/CommonRoutes';
import './feedbacks-page.css';

type stateRedux = {
    feedbacksData: never[];
    isSuccess: boolean;
    isError: boolean;
    status: number;
    isLoading: boolean;
    openTransferF: boolean;
};
type feedbacksObjectType = {
    createdAt: string;
    id: string;
    message: string;
    rating: number;
    fullName: null | string;
    imageSrc: null | string;
};
export const FeedbacksPage: React.FC = () => {
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
    const [isServerErrorModalOpen, setIsServerErrorModalOpen] = useState<boolean>(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isFeedbacksLoading, setFeedbacksLoading] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { feedbacksData, isError, isSuccess, status, isLoading, openTransferF } = useSelector<
        RootState,
        stateRedux
    >((item) => item.feedbacks);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const createAgainFeedbacks = () => {
        dispatch(clearStateF());
        setIsErrorModalOpen(false);
        setIsModalOpen(true);
    };
    const closeErrorModal = () => {
        dispatch(clearStateF());
        setIsErrorModalOpen(false);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        dispatch(clearStateF());
        dispatch(clearDataModal());
        setIsModalOpen(false);
        setIsErrorModalOpen(false);
        setIsSuccessModalOpen(false);
        setIsServerErrorModalOpen(false);
    };
    useEffect(() => {
        const tokenStr = localStorage.getItem('token');
        console.log(isSuccess, openTransferF, isError);
        if (tokenStr && !isSuccess && !openTransferF && !isError) {
            setFeedbacksLoading(true);
            dispatch(clearStateF());
            dispatch(getFeedbacksUsers({ feedbackToken: tokenStr }));
        }
        if (tokenStr && isSuccess && openTransferF && !isError) {
            setIsSuccessModalOpen(true);
        }
        if (tokenStr && !isSuccess && openTransferF && isError) {
            setIsErrorModalOpen(true);
        }
        if (!tokenStr && !isSuccess && !openTransferF) {
            dispatch(clearStateF());
            navigate(CommonRoutes.auth.auth);
        }
        if (isError && status === 403) {
            localStorage.clear();
            dispatch(clearStateF());
            navigate(CommonRoutes.auth.auth);
        }
        if (isError && status && !openTransferF) {
            setFeedbacksLoading(false);
            setIsServerErrorModalOpen(true);
        }
        setFeedbacksLoading(false);
    }, [
        dispatch,
        feedbacksData,
        isError,
        isErrorModalOpen,
        isSuccess,
        navigate,
        openTransferF,
        status,
    ]);

    return (
        <main className='main'>
            {(isLoading || isFeedbacksLoading) && <SpinerLoading />}
            {isServerErrorModalOpen && (
                <ServerErrorFeedbacksModal isModalOpen={isServerErrorModalOpen} />
            )}
            {isErrorModalOpen && (
                <ErrorFeedbacksModal
                    handleCancel={closeErrorModal}
                    isModalOpen={isErrorModalOpen}
                    createAgainFeedbacks={createAgainFeedbacks}
                />
            )}
            {isSuccessModalOpen && (
                <SuccessFeedbacksModal
                    handleCancel={handleCancel}
                    isModalOpen={isSuccessModalOpen}
                />
            )}
            {isModalOpen && (
                <FeedbacksModal
                    handleCancel={handleCancel}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                />
            )}
            <>
                <MainSidebar />
                <div className='main__content'>
                    <FeedbacksHeader />
                    <div className='main__content_feedbacks'>
                        {!feedbacksData.length ? (
                            <div className='feedbacks__container_start'>
                                <div className='start__content'>
                                    <TextBlock
                                        title='Оставьте свой отзыв первым'
                                        addClassNameBlock='start__content_text-block'
                                    >
                                        <p className='text-block__content'>
                                            Вы можете быть первым, кто оставит отзыв об этом фитнесс
                                            приложении. Поделитесь своим мнением и опытом с другими
                                            пользователями,
                                            <br /> и помогите им сделать правильный выбор.
                                        </p>
                                    </TextBlock>
                                    <ButtonGlobalComponent
                                        addClassName='text-block__button'
                                        onClick={showModal}
                                        dataTestId='write-review'
                                    >
                                        Написать отзыв
                                    </ButtonGlobalComponent>
                                </div>
                            </div>
                        ) : (
                            <div className='feedbacks__container_cards'>
                                <ul
                                    className={
                                        feedbacksData.length > 4
                                            ? 'cards__item all-content'
                                            : 'cards__item'
                                    }
                                >
                                    {feedbacksData.map((array: feedbacksObjectType) => {
                                        return (
                                            <li className='cards__item_content' key={array.id}>
                                                <FeedbacksCardUser {...array} />
                                            </li>
                                        );
                                    })}
                                </ul>
                                <FeedbacksFooter
                                    openModalElement={showModal}
                                    setIsErrorModalOpen={setIsErrorModalOpen}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </>
        </main>
    );
};
