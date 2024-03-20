import { SpinerLoading } from '../../global';
import { MainSidebar } from '../../components/mainPage';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@redux/configure-store';
import {
    clearStateC,
    getListTraningUser,
    createTransferC,
    getAllTraningsUser,
    clearErrorRequestC,
    changeTraningUser,
    clearChangeObject,
    createLastAndFutureDayC,
    clearLastAndFutureDayC,
    createErrorRequestC,
} from '@redux/CleverfitSwaggerCalendarTraningApi';
import {
    CalendarHeader,
    ChoiseTraningCalendarModal,
    CreateTraningCalendarModal,
    EditingSidePanelCalendar,
    SidePanelCalendar,
} from '@components/calendarPage';
import 'antd/dist/antd.css';
import { Calendar, Modal } from 'antd';
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';
import TimePickerLocale from 'antd/lib/time-picker/locale/ru_RU';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import './calendar-page.css';
let objWarning = {};
let objError = {};
export const error = () => {
    Modal.error(objError);
};
export const warning = () => {
    Modal.confirm(objWarning);
};
type stateRedux = {
    listTraningData: never[];
    listAllTraningsData: any[];
    listChangeTraning: { exercises: object[]; name: string; date: string };
    isSuccess: boolean;
    isError: boolean;
    status: number;
    isLoading: boolean;
    openTransferC: boolean;
    openErrorRequestC: boolean;
    lastAndFutureDay: boolean;
};
export const CalendarPage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<any>(moment().add(-1, 'day'));
    const [countS, setCountS] = useState<number>(1);
    const [countP, setCountP] = useState<number>(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [clickPanel, setClickPanel] = useState<boolean>(false);
    const [idElement, setIdElement] = useState<Element | null>();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
    const [calendarLoading, setCalendarLoading] = useState<boolean>(false);
    const [clickMonth, setClickMonth] = useState<string>('');
    const [clickDate, setClickDate] = useState<number>(0);
    const ref = useRef<number>(1);
    const [createTraningCalendarModal, setCreateTraningCalendarModal] = useState<boolean>(false);
    const [openChoiseModal, setOpenChoiseModal] = useState<boolean>(false);
    const [openExercisesModal, setOpenExercisesModal] = useState<boolean>(false);
    const [openChangeSidePanel, setOpenChangeSidePanel] = useState<boolean>(false);
    const [nameChoise, setNameChoise] = useState<string>('');
    const [sideDataObject, setSideDataObject] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();
    const {
        listTraningData,
        listAllTraningsData,
        isError,
        isSuccess,
        isLoading,
        openTransferC,
        openErrorRequestC,
        listChangeTraning,
        lastAndFutureDay,
    } = useSelector<RootState, stateRedux>((item) => item.calendarTraning);
    objWarning = {
        title: (
            <h3 data-test-id='modal-error-user-training-title'>
                При открытии данных <br /> произошла ошибка
            </h3>
        ),
        content: <span data-test-id='modal-error-user-training-subtitle'>Попробуйте ещё раз.</span>,
        okText: 'Обновить',
        icon: <CloseCircleOutlined style={{ color: '#2f54eb' }} />,
        className: 'warning-data-modal',
        centered: true,
        closable: false,
        okButtonProps: {
            onClick: () => {
                ref.current++;
                dispatch(createTransferC());
                Modal.destroyAll();
                if (ref.current > 2) {
                    ref.current = 1;
                    dispatch(clearErrorRequestC());
                    dispatch(clearStateC());
                    Modal.destroyAll();
                }
            },
            'data-test-id': 'modal-error-user-training-button',
        },
        cancelText: <CloseOutlined />,
        cancelButtonProps: {
            'data-test-id': 'modal-error-user-training-button-close',
            onClick: () => {
                Modal.destroyAll();
                setCreateTraningCalendarModal(false);
                setClickDate(0);
                setClickMonth('');
                setOpenChoiseModal(false);
                setOpenExercisesModal(false);
            },
        },
    };
    objError = {
        title: <h3>При сохранении данных произошла ошибка</h3>,
        content: <span>Придётся попробовать ещё раз</span>,
        okText: 'Закрыть',
        className: 'error-data-modal',
        centered: true,
        okButtonProps: {
            onClick: () => {
                Modal.destroyAll();
                setCreateTraningCalendarModal(false);
                setClickDate(0);
                setClickMonth('');
                setOpenChoiseModal(false);
                setOpenExercisesModal(false);
            },
        },
    };
    const closeCreateTraningModal = (e: any) => {
        e.stopPropagation();
        setCreateTraningCalendarModal(false);
        setClickDate(0);
        dispatch(clearChangeObject());
        dispatch(clearLastAndFutureDayC());
    };
    const openChoiseCalendarModal = () => {
        setCreateTraningCalendarModal(false);
        setOpenChoiseModal(true);
        dispatch(clearChangeObject());
    };
    const lastChangeObject = ({
        _id,
        name,
        date,
        exercises,
    }: {
        _id: string;
        name: string;
        date: string;
        exercises: object[];
    }) => {
        const tokenStr = localStorage.getItem('token');
        if (tokenStr && lastAndFutureDay) {
            setCalendarLoading(true);
            dispatch(changeTraningUser({ token: tokenStr, id: _id, name, date, exercises }));
        }
        setTimeout(() => {
            setOpenChoiseModal(false);
            setOpenExercisesModal(false);
            setOpenChangeSidePanel(true);
        }, 0);
    };
    const createNewExercises = () => {
        if (listChangeTraning.name) {
            setOpenChangeSidePanel(true);
            setOpenChoiseModal(false);
            setOpenExercisesModal(false);
        }
        if (!listChangeTraning.name) {
            setOpenChoiseModal(false);
            setOpenExercisesModal(true);
            setOpenChangeSidePanel(false);
        }
    };
    const onCloseMenu = (value: {
        exercises: object[];
        name: string;
        date: string;
        isImplementation: boolean;
    }) => {
        setOpenChoiseModal(true);
        setOpenExercisesModal(false);
        setOpenChangeSidePanel(false);
        dispatch(clearChangeObject());
        setSideDataObject(value);
    };
    const saveAndCloseModal = () => {
        const tokenStr = localStorage.getItem('token');
        if (tokenStr) {
            setOpenChoiseModal(false);
            setOpenExercisesModal(false);
            setSideDataObject({
                exercises: [],
                name: '',
                date: '',
            });
            setCalendarLoading(true);
            dispatch(clearChangeObject());
            dispatch(getAllTraningsUser({ token: tokenStr }));
        }
    };
    const backCreateModal = () => {
        setSideDataObject({
            exercises: [],
            name: '',
            date: '',
        });
        dispatch(clearChangeObject());
        setOpenChoiseModal(false);
        setOpenExercisesModal(false);
    };
    const createChangeTraningUser = ({
        id,
        name,
        date,
        exercises,
    }: {
        id: string;
        name: string;
        date: string;
        exercises: object[];
    }) => {
        const tokenStr = localStorage.getItem('token');
        if (tokenStr) {
            setCalendarLoading(true);
            dispatch(changeTraningUser({ token: tokenStr, id, name, date, exercises }));
        }
        setTimeout(() => {
            setOpenChoiseModal(true);
            setOpenExercisesModal(false);
        }, 0);
    };
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        if (isErrorModalOpen) {
            setIsErrorModalOpen(false);
            dispatch(clearStateC());
            warning();
        }
        if (isError && openErrorRequestC) {
            console.log('hello');
            dispatch(clearStateC());
            setIsErrorModalOpen(true);
        }
        setCalendarLoading(false);
    }, [dispatch, isError, isErrorModalOpen, openErrorRequestC]);
    useEffect(() => {
        const tokenStr = localStorage.getItem('token');
        if (tokenStr && !isSuccess && !isError && openTransferC) {
            setCalendarLoading(true);
            dispatch(clearStateC());
            dispatch(createErrorRequestC());
            dispatch(getListTraningUser({ token: tokenStr }));
        }
        if (tokenStr && !isSuccess && !isError && !openTransferC) {
            setCalendarLoading(true);
            dispatch(clearStateC());
            dispatch(getAllTraningsUser({ token: tokenStr }));
        }
        if (tokenStr && !isSuccess && isError && !openErrorRequestC) {
            dispatch(clearStateC());
            error();
        }
        setCalendarLoading(false);
    }, [calendarLoading, dispatch, isError, isSuccess, openErrorRequestC, openTransferC]);
    const dateCellRender = (value: any) => {
        value.add(1, 'day');
        const listData = [];
        const dateValue = value.format('DD.MM.YYYY');
        for (let i = 0; i < listAllTraningsData.length; i++) {
            if (moment.utc(listAllTraningsData[i].date).format('DD.MM.YYYY') === dateValue) {
                listData.push({
                    _id: listAllTraningsData[i]._id,
                    date: listAllTraningsData[i].date,
                    name: listAllTraningsData[i].name,
                    userId: listAllTraningsData[i].userId,
                    exercises: listAllTraningsData[i].exercises,
                    isImplementation: listAllTraningsData[i].isImplementation,
                });
            }
        }
        const s = value._d.toString();
        const st = s.split(' ')[0];
        const stMonth = s.split(' ')[1];
        const date = moment(value._d).format('DD.MM.YYYY');
        return (
            <ul className='events'>
                <div className='events__date'>{value.date()}</div>
                {Number(value.date()) === clickDate && stMonth === clickMonth && !clickPanel ? (
                    <>
                        {!openChoiseModal && !openExercisesModal && !openChangeSidePanel && (
                            <CreateTraningCalendarModal
                                isModalOpen={createTraningCalendarModal}
                                handleCancel={closeCreateTraningModal}
                                position={st === 'Sun' ? 'right' : 'left'}
                                listTraningData={listTraningData}
                                listData={listData}
                                date={date}
                                okButton={openChoiseCalendarModal}
                                createChangeTraningUser={createChangeTraningUser}
                                lastAndFutureDay={lastAndFutureDay}
                            />
                        )}
                        {openChoiseModal && !openExercisesModal && !openChangeSidePanel && (
                            <ChoiseTraningCalendarModal
                                position={st === 'Sun' ? 'right' : 'left'}
                                isModalOpen={openChoiseModal}
                                addButton={createNewExercises}
                                lastChangeObject={lastChangeObject}
                                setNameChoise={setNameChoise}
                                sideDataObject={sideDataObject}
                                saveAndCloseModal={saveAndCloseModal}
                                listTraningData={listTraningData}
                                listData={listData}
                                listChangeTraning={listChangeTraning}
                                backCreateModal={backCreateModal}
                                lastAndFutureDay={lastAndFutureDay}
                            />
                        )}
                        {!openChoiseModal && openExercisesModal && !openChangeSidePanel && (
                            <SidePanelCalendar
                                name={nameChoise}
                                date={date}
                                onCloseMenu={onCloseMenu}
                                sideDataObject={sideDataObject}
                            />
                        )}
                        {!openChoiseModal && !openExercisesModal && openChangeSidePanel && (
                            <EditingSidePanelCalendar
                                listChangeTraning={listChangeTraning}
                                onCloseMenu={onCloseMenu}
                                lastAndFutureDay={lastAndFutureDay}
                            />
                        )}
                    </>
                ) : (
                    <>
                        {listData.map((item: any) => (
                            <li
                                key={item.name}
                                className={
                                    item.isImplementation
                                        ? 'events__calendar-cell last'
                                        : 'events__calendar-cell'
                                }
                            >
                                <span className={'calendar-training-modal__item_text ' + item.name}>
                                    {item.name}
                                </span>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        );
    };
    const onSelect = (newValue: any) => {
        const s = newValue._d.toString();
        const stMonth = s.split(' ')[1];
        idElement?.removeAttribute('id');
        const srr = moment(newValue._d).add(-1, 'day').format('YYYY-MM-DD');
        const elementTwo: Element | null = document.querySelector(`[title="${srr}"]`);
        elementTwo?.setAttribute('id', 'active-cell');
        setIdElement(elementTwo);
        if (window.innerWidth < 768 || windowWidth < 768) {
            setCountS((item) => item + 1);
            console.log(countP, countS);
            if (clickPanel && countS !== countP) {
                console.log('false');
                setCountS(1);
                setCountP(1);
                setClickPanel(false);
            }
            if (newValue.isBefore(currentDate, 'month')) {
                dispatch(createLastAndFutureDayC());
                setCreateTraningCalendarModal(true);
                setClickDate(newValue.date());
                setClickMonth(stMonth);
                setCurrentDate(currentDate.add(-1, 'month'));
            }
            if (newValue.isAfter(currentDate, 'month')) {
                dispatch(createLastAndFutureDayC());
                setCreateTraningCalendarModal(true);
                setClickDate(newValue.date());
                setClickMonth(stMonth);
                setCurrentDate(currentDate.add(1, 'month'));
            } else {
                setCreateTraningCalendarModal(true);
                setClickDate(newValue.date());
                setClickMonth(stMonth);
            }
        }
        if (window.innerWidth > 768 || windowWidth > 768) {
            if (newValue.isBefore(currentDate, 'month') || !newValue.isAfter(moment(), 'day')) {
                dispatch(createLastAndFutureDayC());
                setCreateTraningCalendarModal(true);
                setClickDate(newValue.date());
                setClickMonth(stMonth);
                setCurrentDate(currentDate.clone().subtract(0, 'month'));
            } else if (newValue.isAfter(currentDate, 'month')) {
                dispatch(createLastAndFutureDayC());
                setCreateTraningCalendarModal(true);
                setClickDate(newValue.date());
                setClickMonth(stMonth);
                setCurrentDate(currentDate.clone().subtract(0, 'month'));
            } else {
                setCreateTraningCalendarModal(true);
                setClickDate(newValue.date());
                setClickMonth(stMonth);
            }
        }
    };
    const onPanelChange = (newValue: any) => {
        console.log('hello');
        const s = newValue._d.toString();
        const stMonth = s.split(' ')[1];
        const sCurrent = currentDate._d.toString();
        const stMonthCurrent = sCurrent.split(' ')[1];
        const element: Element | null = document.querySelector(`.ant-picker-calendar-month-select`);
        const elementTwo: Element | null = document.querySelector(
            `.ant-picker-calendar-year-select`,
        );
        const objMonth: any = {
            Jan: 1,
            Feb: 2,
            Mar: 3,
            Apr: 4,
            May: 5,
            Jun: 6,
            Jul: 7,
            Aug: 8,
            Sep: 9,
            Oct: 10,
            Nov: 11,
            Dec: 12,
        };
        const stYear = s.split(' ')[3];
        const stYearCurrent = sCurrent.split(' ')[3];
        if (stMonth !== stMonthCurrent && element?.classList.contains('ant-select-focused')) {
            setCurrentDate(currentDate.add(objMonth[stMonth] - objMonth[stMonthCurrent], 'month'));
        }
        if (stYear !== stYearCurrent && elementTwo?.classList.contains('ant-select-focused')) {
            setCurrentDate(currentDate.add(Number(stYear) - Number(stYearCurrent), 'year'));
        }
        if (window.innerWidth < 768 || windowWidth < 768) {
            setCountP((item) => item + 1);
            setClickPanel(true);
        }
    };
    return (
        <main className='main'>
            {(isLoading || calendarLoading) && <SpinerLoading />}
            <MainSidebar />
            <div className='main__content calendar__content'>
                <CalendarHeader />
                <div className='main__content_calendar'>
                    <Calendar
                        locale={{
                            lang: {
                                monthFormat: 'MMMM',
                                monthBeforeYear: true,
                                placeholder: 'Выберите дату',
                                yearPlaceholder: 'Выберите год',
                                quarterPlaceholder: 'Выберите квартал',
                                monthPlaceholder: 'Выберите месяц',
                                weekPlaceholder: 'Выберите неделю',
                                rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
                                rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
                                rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
                                shortWeekDays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                                shortMonths: [
                                    'Янв',
                                    'Фев',
                                    'Мар',
                                    'Апр',
                                    'Май',
                                    'Июн',
                                    'Июл',
                                    'Авг',
                                    'Сен',
                                    'Окт',
                                    'Ноя',
                                    'Дек',
                                ],
                                ...CalendarLocale,
                            },
                            timePickerLocale: {
                                ...TimePickerLocale,
                            },
                            dateFormat: 'YYYY-MM-DD',
                            dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
                            weekFormat: 'YYYY-wo',
                            monthFormat: 'YYYY-MM',
                        }}
                        dateCellRender={dateCellRender}
                        onSelect={onSelect}
                        onPanelChange={onPanelChange}
                        value={currentDate}
                        fullscreen={window.innerWidth < 768 || windowWidth < 768 ? false : true}
                    />
                </div>
            </div>
        </main>
    );
};
