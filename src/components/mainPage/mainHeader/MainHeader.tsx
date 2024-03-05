import { SettingOutlined } from '@ant-design/icons';
import { HeaderGlobalComponent } from '../../../global/component';
import './mainHeader.css';

export const MainHeader: React.FC = () => {
    return (
        <HeaderGlobalComponent title={'Главная'}>
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
        </HeaderGlobalComponent>
    );
};
