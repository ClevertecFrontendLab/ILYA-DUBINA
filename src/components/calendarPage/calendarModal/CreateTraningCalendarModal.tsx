import { ButtonGlobalComponent } from '../../../global/component';
import { useState, useEffect } from 'react';
import createTraning from '../../../images/calendar/createTraning.svg';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import './createTraningCalendarModal.css';
type props = {
    isModalOpen?: boolean;
    handleCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    okButton?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    position?: 'right' | 'left';
    listData: object[];
    date: string;
    listTraningData: object[];
    createChangeTraningUser: (obj: {
        id: string;
        name: string;
        date: string;
        exercises: object[];
    }) => void;
    lastAndFutureDay: boolean;
};
export const CreateTraningCalendarModal: React.FC<props> = ({
    isModalOpen,
    handleCancel,
    okButton,
    position = 'left',
    listData,
    date,
    listTraningData,
    createChangeTraningUser,
    lastAndFutureDay,
}) => {
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return { width, height };
    };
    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

        useEffect(() => {
            const handleResize = () => setWindowDimensions(getWindowDimensions());

            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowDimensions;
    };
    const { width } = useWindowDimensions();
    return (
        <div className='calendar-training' data-test-id='modal-create-training'>
            <Drawer
                className='calendar-training-modal'
                title={'Тренировки на ' + date}
                open={isModalOpen}
                closable={false}
                mask={false}
                getContainer={false}
                placement={position}
                width={width >= 360 && width <= 700 ? 312 : 264}
                drawerStyle={
                    width >= 360 && width <= 700
                        ? {
                              position: 'absolute',
                              top: '24px',
                              left: '50%',
                              transform: 'translate(-50%, 0%)',
                          }
                        : { position: 'absolute', zIndex: '100' }
                }
                data-test-id='modal-create-training'
            >
                <Button
                    icon={
                        <CloseOutlined
                            style={{ width: '12px', height: '12px', margin: '0 auto 0 auto' }}
                        />
                    }
                    style={{ position: 'absolute', top: '6px', right: '0px', border: 'none' }}
                    onClick={handleCancel}
                    data-test-id='modal-create-training-button-close'
                />
                {!listData.length && (
                    <div className='calendar-training-modal__start'>
                        <p className='calendar-training-modal__text'>Нет активных тренировок</p>
                        <div className='calendar-training-modal__icon'>
                            <img
                                className='calendar-training-modal__icon_img'
                                src={createTraning}
                                alt='иконка пустаты'
                            />
                        </div>
                    </div>
                )}
                {!!listData.length && (
                    <ul className='calendar-training-modal__traning'>
                        {listData.map((item: any, index) => {
                            return (
                                <li
                                    className={
                                        item.isImplementation
                                            ? 'calendar-training-modal__traning__item last'
                                            : 'calendar-training-modal__traning__item'
                                    }
                                    key={item.name}
                                    data-test-id={`modal-update-training-edit-button${index}`}
                                >
                                    <span
                                        className={
                                            'calendar-training-modal__item_text ' + item.name
                                        }
                                    >
                                        {item.name}
                                    </span>
                                    <ButtonGlobalComponent
                                        addClassName='calendar-training-modal__item_button'
                                        disabled={item.isImplementation}
                                        onClick={() =>
                                            createChangeTraningUser({
                                                id: item._id,
                                                name: item.name,
                                                date: item.date,
                                                exercises: item.exercises,
                                            })
                                        }
                                        dataTestId={`modal-update-training-edit-button${index}`}
                                    >
                                        <EditOutlined
                                            className={item.isImplementation ? 'last' : ''}
                                        />
                                    </ButtonGlobalComponent>
                                </li>
                            );
                        })}
                    </ul>
                )}
                <div className='calendar-training-modal__button'>
                    <ButtonGlobalComponent
                        addClassName='calendar-training-modal__button_inside'
                        onClick={okButton}
                        disabled={
                            (listTraningData.length === listData.length &&
                                listTraningData.length !== 0) ||
                            lastAndFutureDay
                                ? true
                                : false
                        }
                    >
                        {!listData.length ? 'Создать тренировку' : 'Добавить тренировку'}
                    </ButtonGlobalComponent>
                </div>
            </Drawer>
        </div>
    );
};
