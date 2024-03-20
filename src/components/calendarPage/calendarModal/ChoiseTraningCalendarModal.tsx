import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/configure-store';
import { ButtonGlobalComponent, SpinerLoading } from '../../../global';
import { useState, useEffect } from 'react';
import createTraning from '../../../images/calendar/createTraning.svg';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Select, Button, Drawer } from 'antd';
import {
    setTraningUser,
    clearStateC,
    getListTraningUser,
    changeTraningUser,
} from '../../../redux/CleverfitSwaggerCalendarTraningApi';
import './choiseTraningCalendarModal.css';

type props = {
    isModalOpen?: boolean;
    position?: 'left' | 'right';
    addButton?: any;
    setNameChoise: (v: string) => void;
    sideDataObject: {
        exercises: object[];
        name: string;
        date: string;
        isImplementation: boolean;
        _id: string;
    };
    saveAndCloseModal: () => void;
    listTraningData: any[];
    listData: any[];
    backCreateModal: () => void;
    listChangeTraning: { exercises: object[]; name: string; date: string };
    lastAndFutureDay: boolean;
    lastChangeObject: any;
};
type stateRedux = {
    isLoading: boolean;
};
export const ChoiseTraningCalendarModal: React.FC<props> = ({
    isModalOpen,
    position = 'left',
    addButton,
    setNameChoise,
    sideDataObject,
    listTraningData,
    listData,
    listChangeTraning,
    saveAndCloseModal,
    backCreateModal,
    lastAndFutureDay,
    lastChangeObject,
}) => {
    const [loadings, setLoadings] = useState<boolean[]>([]);
    const [calendarLoading, setCalendarLoading] = useState<boolean>(false);
    const [viewObject, setViewObject] = useState<any>(listChangeTraning);
    const [valueSelect, setValueSelect] = useState<string>('Выбор типа тренировки');
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector<RootState, stateRedux>((item) => item.calendarTraning);
    let newAllArray: any;
    if (lastAndFutureDay) {
        listData = listData.filter((i: any) => !i.isImplementation);
        newAllArray = listTraningData.filter(
            (e) => listData.findIndex((i: any) => i.name == e.name) !== -1,
        );
    }
    if (!lastAndFutureDay) {
        newAllArray = listTraningData.filter(
            (e) => listData.findIndex((i: any) => i.name == e.name) === -1,
        );
    }

    const handleChange = (value: string, { label }: any) => {
        setValueSelect(value);
        for (let i = 0; i < listTraningData.length; i++) {
            if (listTraningData[i].key === value) {
                setNameChoise(listTraningData[i].name);
            }
        }
        for (let i = 0; i < listData.length; i++) {
            if (listData[i].name === label) {
                setViewObject(listData[i]);
            }
        }
    };
    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        const tokenStr = localStorage.getItem('token');
        const { date, exercises, name, _id, isImplementation } = sideDataObject;
        const dateParts = date.split('.');
        if (tokenStr && dateParts.length !== 3) {
            setCalendarLoading(true);
            dispatch(
                changeTraningUser({
                    token: tokenStr,
                    id: _id,
                    exercises,
                    name,
                    date,
                    isImplementation,
                }),
            );
            setTimeout(() => saveAndCloseModal(), 0);
        }
        if (tokenStr && dateParts.length === 3) {
            const iosDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0] + 1);
            setCalendarLoading(true);
            dispatch(
                setTraningUser({
                    token: tokenStr,
                    exercises,
                    name,
                    date: iosDate.toISOString(),
                }),
            );
            setTimeout(() => saveAndCloseModal(), 0);
        }
    };
    useEffect(() => {
        const tokenStr = localStorage.getItem('token');
        if (tokenStr) {
            setCalendarLoading(true);
            dispatch(clearStateC());
            dispatch(getListTraningUser({ token: tokenStr }));
        }
        setCalendarLoading(false);
    }, [dispatch]);
    return (
        <>
            {(calendarLoading || isLoading) && <SpinerLoading />}
            <div className='calendar-training' data-test-id='modal-create-exercise'>
                <Drawer
                    className='calendar-training-modal'
                    open={isModalOpen}
                    closable={false}
                    footer={null}
                    mask={false}
                    getContainer={false}
                    placement={position}
                    width={264}
                    drawerStyle={{ position: 'absolute', zIndex: '100' }}
                    data-test-id='modal-create-exercise'
                >
                    <div className='choise-traning-modal__header'>
                        <ButtonGlobalComponent
                            addClassName='choise-traning-modal__header_icon'
                            onClick={backCreateModal}
                            dataTestId={'modal-exercise-training-button-close'}
                        >
                            <ArrowLeftOutlined className='icon__choise-image' />
                        </ButtonGlobalComponent>
                        <Select
                            value={
                                sideDataObject?.name && valueSelect === 'Выбор типа тренировки'
                                    ? `${sideDataObject.name}`
                                    : listChangeTraning?.name &&
                                      valueSelect === 'Выбор типа тренировки'
                                    ? `${listChangeTraning.name}`
                                    : valueSelect
                            }
                            data-test-id='modal-create-exercise-select'
                            className='choise-traning-modal__header_select'
                            onChange={handleChange}
                            autoFocus={false}
                            options={
                                !newAllArray
                                    ? listTraningData.map((item: any) => {
                                          return {
                                              label: item.name,
                                              value: item.key,
                                          };
                                      })
                                    : newAllArray.map((item: any) => {
                                          return {
                                              label: item.name,
                                              value: item.key,
                                          };
                                      })
                            }
                        />
                    </div>
                    <div className='calendar-training-modal__start choise-traning-modal__start'>
                        {sideDataObject?.exercises.length &&
                        !viewObject?.exercises.length &&
                        !listChangeTraning?.exercises.length ? (
                            <ul className='choise-training-modal__traning'>
                                {sideDataObject?.exercises.map((item: any) => {
                                    return (
                                        <li
                                            className='calendar-training-modal__traning__item choise-traning-modal__item'
                                            key={item.name}
                                        >
                                            <span className='choise-item__text'>{item.name}</span>
                                            <ButtonGlobalComponent
                                                addClassName='calendar-training-modal__item_button'
                                                onClick={addButton}
                                            >
                                                <EditOutlined />
                                            </ButtonGlobalComponent>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : listChangeTraning?.exercises.length &&
                          !viewObject?.exercises.length &&
                          valueSelect === 'Выбор типа тренировки' ? (
                            <ul className='choise-training-modal__traning'>
                                {listChangeTraning.exercises.map((item: any) => {
                                    return (
                                        <li
                                            className='calendar-training-modal__traning__item choise-traning-modal__item'
                                            key={item.name}
                                        >
                                            <span className='choise-item__text'>{item.name}</span>
                                            <ButtonGlobalComponent
                                                addClassName='calendar-training-modal__item_button'
                                                onClick={addButton}
                                            >
                                                <EditOutlined />
                                            </ButtonGlobalComponent>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : viewObject?.exercises.length ? (
                            <ul className='choise-training-modal__traning'>
                                {viewObject?.exercises?.map((item: any) => {
                                    return (
                                        <li
                                            className='calendar-training-modal__traning__item choise-traning-modal__item'
                                            key={item.name}
                                        >
                                            <span className='choise-item__text'>{item.name}</span>
                                            <ButtonGlobalComponent
                                                addClassName='calendar-training-modal__item_button'
                                                onClick={() => {
                                                    lastChangeObject(viewObject);
                                                }}
                                            >
                                                <EditOutlined />
                                            </ButtonGlobalComponent>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <div className='calendar-training-modal__icon'>
                                <img
                                    className='calendar-training-modal__icon_img'
                                    src={createTraning}
                                    alt='иконка пустаты'
                                />
                            </div>
                        )}
                    </div>
                    <div className='calendar-training-modal__button'>
                        <ButtonGlobalComponent
                            addClassName='calendar-training-modal__button_inside choise-traning-modal__create-button'
                            disabled={
                                sideDataObject?.name && !lastAndFutureDay
                                    ? false
                                    : valueSelect === 'Выбор типа тренировки'
                            }
                            onClick={addButton}
                        >
                            Добавить упражнения
                        </ButtonGlobalComponent>
                        <Button
                            type='link'
                            loading={loadings[0]}
                            onClick={() => enterLoading(0)}
                            className='calendar-training-modal__button_inside choise-traning-modal__save'
                        >
                            Сохранить
                        </Button>
                    </div>
                </Drawer>
            </div>
        </>
    );
};
