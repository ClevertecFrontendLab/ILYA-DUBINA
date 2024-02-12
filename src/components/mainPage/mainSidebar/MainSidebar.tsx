import { useState } from 'react';
import { Link } from 'react-router-dom';
import calendar from '../../../images/sidebar/calendar.svg';
import exit from '../../../images/sidebar/exit.svg';
import clever from '../../../images/sidebar/Clever.svg';
import fit from '../../../images/sidebar/fit.svg';
import trapezoid from '../../../images/sidebar/trapezoid.svg';
import trapezoid767 from '../../../images/sidebar/trapezoid767.svg';
import {
    HeartFilled,
    TrophyFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    IdcardOutlined,
} from '@ant-design/icons';
import './mainSidebar.css';

export const MainSidebar: React.FC = () => {
    const [close, setClose] = useState(false);
    const setCloseSidebar = () => {
        setClose((item) => !item);
    };
    return (
        <aside className={!close ? 'sidebar' : 'sidebar close'}>
            <button
                className='sidebar__button'
                data-test-id='sider-switch'
                onClick={setCloseSidebar}
            >
                <img
                    className='sidebar__button_trapezoid'
                    src={trapezoid}
                    alt='картинка трапеции'
                />
                {!close ? (
                    <MenuFoldOutlined
                        style={{ color: '#8c8c8c' }}
                        className='sidebar__button_icon'
                    />
                ) : (
                    <MenuUnfoldOutlined
                        style={{ color: '#8c8c8c' }}
                        className='sidebar__button_icon'
                    />
                )}
            </button>
            <button
                className='sidebar__button_mobile'
                data-test-id='sider-switch-mobile'
                onClick={setCloseSidebar}
            >
                <img
                    className='sidebar__button_trapezoid'
                    src={trapezoid767}
                    alt='картинка трапеции'
                />
                {!close ? (
                    <MenuFoldOutlined
                        style={{ color: '#8c8c8c' }}
                        className='sidebar__button_icon'
                    />
                ) : (
                    <MenuUnfoldOutlined
                        style={{ color: '#8c8c8c' }}
                        className='sidebar__button_icon'
                    />
                )}
            </button>
            <nav className={`sidebar__navigation_${close}`}>
                <Link id='logo' className='sidebar__navigation_link' to='#' rel='home'>
                    <img
                        className={!close ? 'link__clever' : 'link__cleverClose'}
                        src={clever}
                        alt='картинка логотипа компании'
                    />
                    <img
                        className={`link__fit_${close}`}
                        src={fit}
                        alt='картинка логотипа компании'
                    />
                </Link>
                <ul className='sidebar__navigation_content'>
                    <li className={!close ? 'content__item' : 'close__item'}>
                        <Link id='linkOne' className='content__item_link' to='#'>
                            <img className='link__calendar' src={calendar} alt='иконка календаря' />
                            <span className={!close ? 'link__text' : 'link__text_close'}>
                                Календарь
                            </span>
                        </Link>
                    </li>
                    <li className={!close ? 'content__item' : 'close__item'}>
                        <Link id='linkTwo' className='content__item_link' to='#'>
                            <HeartFilled className='link__icon' style={{ color: '#061178' }} />
                            <span className={!close ? 'link__text' : 'link__text_close'}>
                                Тренировки
                            </span>
                        </Link>
                    </li>
                    <li className={!close ? 'content__item' : 'close__item'}>
                        <Link id='linkThree' className='content__item_link' to='#'>
                            <TrophyFilled className='link__icon' style={{ color: '#061178' }} />
                            <span className={!close ? 'link__text' : 'link__text_close'}>
                                Достижения
                            </span>
                        </Link>
                    </li>
                    <li className={!close ? 'content__item' : 'close__item'}>
                        <Link id='linkThree' className='content__item_link' to='#'>
                            <IdcardOutlined className='link__icon' style={{ color: '#061178' }} />
                            <span className={!close ? 'link__text' : 'link__text_close'}>
                                Профиль
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={`sidebar__exit_${close}`}>
                <Link className='sidebar__exit_link' to='#'>
                    <img className='link__icon' src={exit} alt='картинка выхода' />
                    <span className={!close ? 'link__textExit' : 'link__text_close'}>Выход</span>
                </Link>
            </div>
        </aside>
    );
};
