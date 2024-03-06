import { ErrorAndWarningComponent } from '../../../global/component';
import { Modal } from 'antd';
import './successFeedbacksModal.css';

type props = {
    isModalOpen: boolean;
    handleCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};
export const SuccessFeedbacksModal: React.FC<props> = ({ isModalOpen, handleCancel }) => {
    return (
        <div className='modal'>
            <Modal
                className='modal-success'
                open={isModalOpen}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                closable={false}
                footer={null}
                centered
            >
                <ErrorAndWarningComponent
                    warningContent='success'
                    title='Отзыв успешно опубликован'
                    textLink='Отлично'
                    onClick={handleCancel}
                />
            </Modal>
        </div>
    );
};
