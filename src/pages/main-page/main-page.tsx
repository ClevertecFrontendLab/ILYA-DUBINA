import { ReminderComponent, SpinerLoading, TextBlock } from '../../global';
import { MainSidebar, MainHeader, MainFooter } from '../../components/mainPage';
import { useEffect, useState } from 'react';
import './main-page.css';
import { CommonRoutes } from '../../routes/CommonRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@redux/configure-store';
import {
    clearStateC,
    createRequestC,
    createTransferC,
    getAllTraningsUser,
    createErrorRequestC,
} from '@redux/CleverfitSwaggerCalendarTraningApi';
import { ServerErrorCalendarModal } from '@components/calendarPage';
type stateRedux = {
    isSuccess: boolean;
    isError: boolean;
    status: number;
    isLoading: boolean;
    openRequestC: boolean;
};
export const MainPage: React.FC = () => {
    const [calendarLoading, setCalendarLoading] = useState<boolean>(false);
    const [isServerErrorModalOpen, setIsServerErrorModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isError, isSuccess, isLoading, openRequestC } = useSelector<RootState, stateRedux>(
        (item) => item.calendarTraning,
    );
    const transitionCalendarPage = (e: any) => {
        e?.preventDefault();
        const tokenStr = localStorage.getItem('token');
        if (tokenStr) {
            setCalendarLoading(true);
            dispatch(createRequestC());
            dispatch(getAllTraningsUser({ token: tokenStr }));
        }
    };
    useEffect(() => {
        // console.log(isError, isSuccess, openRequestC, isServerErrorModalOpen);
        if (isError && !isSuccess && openRequestC) {
            dispatch(clearStateC());
            setIsServerErrorModalOpen(true);
        }
        if (!isError && isSuccess && openRequestC) {
            dispatch(clearStateC());
            dispatch(createErrorRequestC());
            dispatch(createTransferC());
            navigate(CommonRoutes.calendar);
        }
        setCalendarLoading(false);
    }, [dispatch, isError, isSuccess, navigate, openRequestC]);
    // const transitionCalendarPage = (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    //     dispatch(createTransferC());
    //     navigate(CommonRoutes.calendar);
    // };
    return (
        <main className='main'>
            <>
                {(calendarLoading || isLoading) && <SpinerLoading />}
                {isServerErrorModalOpen && (
                    <ServerErrorCalendarModal
                        isModalOpen={isServerErrorModalOpen}
                        setIsServerErrorModalOpen={setIsServerErrorModalOpen}
                    />
                )}
                <MainSidebar transitionCalendarPage={transitionCalendarPage} />
                <div className='main__content'>
                    <MainHeader />
                    <article className='main__content_can'>
                        <ul className='can__text'>
                            <li className='can__text_item'>С CleverFit ты сможешь:</li>
                            <li className='can__text_item'>
                                — планировать свои тренировки на календаре, выбирая тип и уровень
                                нагрузки;
                            </li>
                            <li className='can__text_item'>
                                — отслеживать свои достижения в разделе статистики, сравнивая свои
                                результаты с нормами и рекордами;
                            </li>
                            <li className='can__text_item'>
                                — создавать свой профиль, где ты можешь загружать свои фото, видео и
                                отзывы о тренировках;
                            </li>
                            <li className='can__text_item'>
                                — выполнять расписанные тренировки для разных частей тела, следуя
                                подробным инструкциям и советам профессиональных тренеров.
                            </li>
                        </ul>
                    </article>
                    <TextBlock
                        text='CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!'
                    />
                    <div className='main__content_plans'>
                        <ReminderComponent text='Расписать тренировки' />
                        <ReminderComponent
                            text='Назначить календарь'
                            onClick={transitionCalendarPage}
                            dataTestId='menu-button-calendar'
                        />
                        <ReminderComponent text='Заполнить профиль' />
                    </div>
                    <MainFooter />
                </div>
            </>
        </main>
    );
};
