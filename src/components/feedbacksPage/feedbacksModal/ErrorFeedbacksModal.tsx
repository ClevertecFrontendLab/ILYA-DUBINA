import { ButtonGlobalComponent, ErrorAndWarningComponent } from '../../../global/component';
import { Modal } from 'antd';
import './errorFeedbacksModal.css';

type props = {
    isModalOpen: boolean;
    createAgainFeedbacks?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    handleCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};
export const ErrorFeedbacksModal: React.FC<props> = ({
    isModalOpen,
    createAgainFeedbacks,
    handleCancel,
}) => {
    return (
        <div className='modal'>
            <Modal
                className='modal-error'
                open={isModalOpen}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                closable={false}
                footer={null}
                centered
            >
                <ErrorAndWarningComponent
                    warningContent='error'
                    title='Данные не сохранились'
                    text={'Что-то пошло не так. Попробуйте ещё раз.'}
                    link={false}
                    addClassNameText='modal__feedback-error'
                >
                    <div className='feedback-error'>
                        <ButtonGlobalComponent
                            addClassName='feedback-error__comment'
                            onClick={createAgainFeedbacks}
                            dataTestId='write-review-not-saved-modal'
                        >
                            Написать отзыв
                        </ButtonGlobalComponent>
                        <ButtonGlobalComponent
                            addClassName='feedback-error__close'
                            onClick={handleCancel}
                        >
                            Закрыть
                        </ButtonGlobalComponent>
                    </div>
                </ErrorAndWarningComponent>
            </Modal>
        </div>
    );
};
