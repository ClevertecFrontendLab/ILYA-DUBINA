import { ReminderComponent, TextBlock } from '../../global/component';
import { MainSidebar, MainHeader, MainFooter } from '../../components/mainPage';
import './main-page.css';

export const MainPage: React.FC = () => {
    return (
        <main className='main'>
            <MainSidebar />
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
                <TextBlock sizeEm='1.28em' weight='500'>
                    CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                    откладывай на завтра — начни тренироваться уже сегодня!
                </TextBlock>
                <div className='main__content_plans'>
                    <ReminderComponent text='Расписать тренировки' />
                    <ReminderComponent text='Назначить календарь' />
                    <ReminderComponent text='Заполнить профиль' />
                </div>
                <MainFooter />
            </div>
        </main>
    );
};
