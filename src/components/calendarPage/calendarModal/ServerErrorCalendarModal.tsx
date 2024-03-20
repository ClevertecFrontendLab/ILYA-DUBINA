import { ErrorAndWarningComponent } from '../../../global/component';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/configure-store';
import { useNavigate } from 'react-router-dom';
import { clearStateC } from '@redux/CleverfitSwaggerCalendarTraningApi';
import { CommonRoutes } from '../../../routes/CommonRoutes';
import './serverErrorCalendarModal.css';
type props = {
    isModalOpen: boolean;
    setIsServerErrorModalOpen: (v: boolean) => void;
};
export const ServerErrorCalendarModal: React.FC<props> = ({
    isModalOpen,
    setIsServerErrorModalOpen,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const clearFeedbackAndGoBack = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        dispatch(clearStateC());
        setIsServerErrorModalOpen(false);
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
                data-test-id='modal-no-review'
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
