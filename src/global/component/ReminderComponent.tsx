import calendar from '../../images/body/calendar.svg';
import { HeartFilled, AndroidFilled, AppleFilled, IdcardOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './reminderComponent.css';

type Props = {
    text?: string;
    download?: boolean;
};

export const ReminderComponent: React.FC<Props> = ({ text = ' ', download = false }) => {
    const n: string[] = text.split(' ');
    const word: string = n[n.length - 1].toLocaleLowerCase();
    return (
        <>
            <article className='reminder'>
                {!download ? (
                    <h3 className='reminder__title'>{text}</h3>
                ) : (
                    <div className='reminder__twotitle'>
                        <a href='#' className='reminder__twotitle_link'>
                            <h3 className='link__title'>Скачать на телефон</h3>
                        </a>
                        <h2 className='reminder__twotitle_text'>Доступно в PRO-тарифе</h2>
                    </div>
                )}
                {!download ? (
                    <Link className='reminder__link' to={'#'}>
                        {word === 'тренировки' && (
                            <>
                                <HeartFilled style={{ color: '#2f54eb', fontSize: '14px' }} />
                                <span className='reminder__link_text'>Тренировки</span>
                            </>
                        )}
                        {word === 'календарь' && (
                            <>
                                <img
                                    className='reminder__link_icon'
                                    src={calendar}
                                    alt='иконка календаря'
                                />
                                <span className='reminder__link_text'>Календарь</span>
                            </>
                        )}
                        {word === 'профиль' && (
                            <>
                                <IdcardOutlined style={{ color: '#2f54eb', fontSize: '14px' }} />
                                <span className='reminder__link_text'>Профиль</span>
                            </>
                        )}
                    </Link>
                ) : (
                    <div className='reminder__tel'>
                        <button className='reminder__tel_android'>
                            <AndroidFilled style={{ color: '#000000', fontSize: '14px' }} />
                            <span className='android__text'>Android OS</span>
                        </button>
                        <button className='reminder__tel_apple'>
                            <AppleFilled style={{ color: '#000000', fontSize: '14px' }} />
                            <span className='apple__text'>Apple iOS</span>
                        </button>
                    </div>
                )}
            </article>
        </>
    );
};
