import { ErrorAndWarningComponent } from '../../../global/component';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/configure-store';
import { useNavigate } from 'react-router-dom';
import { clearStateF, clearDataModal } from '@redux/CleverfitSwaggeFeedbacksAPI';
import { CommonRoutes } from '../../../routes/CommonRoutes';
import './serverErrorFeedbacksModal.css';

type props = {
    isModalOpen: boolean;
};
export const ServerErrorFeedbacksModal: React.FC<props> = ({ isModalOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const clearFeedbackAndGoBack = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        dispatch(clearStateF());
        dispatch(clearDataModal());
        navigate(CommonRoutes.main);
    };
    return (
        <div className='modal'>
            <Modal
                className='modal-success modal__server'
                open={isModalOpen}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                closable={false}
                footer={null}
                centered
            >
                <ErrorAndWarningComponent
                    warningContent='errorServer'
                    title='Что-то пошло не так'
                    onClick={clearFeedbackAndGoBack}
                    textLink='Назад'
                    paddingLink='small'
                    addClassNameText='modal__server-feedbacks'
                >
                    <p className='server-error-feedbacks'>
                        Произошла ошибка,
                        <br className='server-error-feedbacks__br' /> попробуйте ещё раз.
                    </p>
                </ErrorAndWarningComponent>
            </Modal>
        </div>
    );
};
