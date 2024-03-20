import { CommonRoutes } from '../../../routes/CommonRoutes';
import { HeaderGlobalComponent, LinkGlobalComponent } from '../../../global/component';
import { SettingOutlined } from '@ant-design/icons';
import './calendarHeader.css';

export const CalendarHeader: React.FC = () => {
    return (
        <HeaderGlobalComponent
            addClassName='calendar'
            title={
                <>
                    <LinkGlobalComponent addClassName='calendar__header' toText={CommonRoutes.main}>
                        Главная &nbsp;/
                    </LinkGlobalComponent>
                    <LinkGlobalComponent
                        addClassName='calendar__header_next'
                        toText={CommonRoutes.calendar}
                    >
                        Календарь
                    </LinkGlobalComponent>
                </>
            }
        >
            <div className='calendar__welcome'>
                <button className='header__welcome_settings calendar__welcome-settings'>
                    <SettingOutlined
                        className='settings__icon calendar__settings-icon'
                        style={{ color: '#262626' }}
                    />
                    <span className='settings__text calendar__setting-text'>Настройки</span>
                </button>
            </div>
        </HeaderGlobalComponent>
    );
};
