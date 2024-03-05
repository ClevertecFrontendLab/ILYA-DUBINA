import { StarFilled, StarOutlined } from '@ant-design/icons';
import textarea from '../../../images/feedback/textarea.svg';
import { Modal, Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/configure-store';
import {
    createTransferF,
    saveDataModal,
    setFeedbackUser,
} from '@redux/CleverfitSwaggeFeedbacksAPI';
import './FeedbacksModal.css';
import { ButtonGlobalComponent } from '../../../global';

type props = {
    isModalOpen?: boolean;
    setIsModalOpen: (value: boolean) => void;
    handleCancel: () => void;
};
type stateRedux = {
    messageReduxF: string;
    ratingReduxF: number;
};
export const FeedbacksModal: React.FC<props> = ({ handleCancel, setIsModalOpen, isModalOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { TextArea } = Input;
    const { ratingReduxF, messageReduxF } = useSelector<RootState, stateRedux>(
        (item) => item.feedbacks,
    );
    const [ratingF, setRatingF] = useState<number>(ratingReduxF ? ratingReduxF : 0);
    const [messageF, setMessageF] = useState<string>(messageReduxF ? messageReduxF : '');
    const getRating = (e: any) => {
        setRatingF(e.target.parentNode.id);
    };
    const getMessageUser = (e: { target: { value: string } }) => {
        setMessageF(e.target.value);
    };
    const handleOk = () => {
        const tokenStr = localStorage.getItem('token');
        if (tokenStr) {
            dispatch(createTransferF());
            dispatch(saveDataModal({ ratingF, messageF }));
            dispatch(
                setFeedbackUser({
                    feedbackToken: tokenStr,
                    ratingUser: ratingF,
                    messageUser: messageF,
                }),
            );
            setIsModalOpen(false);
        }
    };
    const arrReting = [];
    for (let i = 1; i <= 5; i++) {
        if (ratingF >= i) {
            arrReting.push(
                <li className='ant-rate-star-full'>
                    <StarFilled id={`${i}`} className={`feedbacks__star`} />
                </li>,
            );
        } else {
            arrReting.push(
                <li>
                    <StarOutlined id={`${i}`} className={`feedbacks__star`} />
                </li>,
            );
        }
    }
    return (
        <div className='modal'>
            <div className='modal__background'>
                <Modal
                    title='Ваш отзыв'
                    className='modal-section__body ant-modal'
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={null}
                    okButtonProps={{
                        style: { display: 'none' },
                    }}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    centered
                >
                    <ul className='description__estimation_stars' onClick={getRating}>
                        {arrReting.map((item, i) => {
                            return <React.Fragment key={i}>{item}</React.Fragment>;
                        })}
                    </ul>
                    <div className='modal-section__body_textareablock'>
                        <TextArea
                            placeholder='Расскажите, почему Вам понравилось наше приложение'
                            className='textareablock__textarea'
                            autoSize
                            onChange={getMessageUser}
                            value={messageF}
                        />
                        <img
                            className='textareablock_image'
                            src={textarea}
                            alt='картинка скролла'
                        />
                    </div>
                    <div className='feedbacks__button'>
                        <ButtonGlobalComponent
                            addClassName='feedbacks__button_content'
                            onClick={handleOk}
                            dataTestId='new-review-submit-button'
                            disabled={
                                ratingF || ratingReduxF || messageF || messageReduxF ? false : true
                            }
                        >
                            Опубликовать
                        </ButtonGlobalComponent>
                    </div>
                </Modal>
            </div>
        </div>
    );
};
