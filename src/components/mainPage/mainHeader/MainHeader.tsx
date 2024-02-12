import { SettingOutlined } from '@ant-design/icons';
import './mainHeader.css';

export const MainHeader: React.FC = () => {
    return (
        <header className='header'>
            <h4 className='header__main'>Главная</h4>
            <div className='header__welcome'>
                <h1 className='header__welcome_title'>
                    Приветствуем тебя
                    <br className='ops__title_mobile' /> в CleverFit — приложении,
                    <br className='ops__title' /> которое поможет тебе добиться своей мечты!
                </h1>
                <button className='header__welcome_settings'>
                    <SettingOutlined className='settings__icon' style={{ color: '#262626' }} />
                    <span className='settings__text'>Настройки</span>
                </button>
            </div>
        </header>
    );
};
