import './watchSidePanelCalendar.css';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Input, Space, InputNumber, Typography, Drawer, Form } from 'antd';
const { Text } = Typography;
type props = {
    past?: boolean;
};
export const WatchSidePanelCalendar: React.FC<props> = () => {
    return (
        <Drawer className='sidebar-calendar' width={408} closable={false} open={true} mask={false}>
            <div className='sidebar-calendar__header'>
                <div className='sidebar-calendar__header_title'>
                    <h3 className='title__sidebar-calendar watch-title'>Просмотр упражнений</h3>
                </div>
                <Button
                    type='link'
                    style={{ width: '14px', height: '14px', padding: '0px', border: 'none' }}
                >
                    <CloseOutlined
                        style={{
                            width: '14px',
                            height: '14px',
                            color: '#8C8C8C',
                            position: 'relative',
                            top: '-3px',
                        }}
                    />
                </Button>
            </div>
            <div className='sidebar-calendar__traning'>
                <li className='calendar-training-modal__traning__item'>
                    <span className='calendar-training-modal__item_text sidebar-calendar__traning_text'>
                        Спина
                    </span>
                    <span className='sidebar-calendar__traning_date'>19.01.2024</span>
                </li>
            </div>
            <Form
                className='sidebar-calendar__form edit-past-form'
                name='sidebar-calendar__form'
                autoComplete='off'
                style={{ fontSize: '16px' }}
            >
                <Form.List name='sidebar-calendar__form_list'>
                    {(fields) => (
                        <>
                            <Space
                                style={{ display: 'flex' }}
                                direction='vertical'
                                className='sidebar-calendar__form_item'
                            >
                                <Form.Item
                                    name={'one'}
                                    style={{ margin: '0px' }}
                                    rules={[{ required: true, message: 'Missing first name' }]}
                                >
                                    <Input placeholder='Упражнение' style={{ height: '24px' }} />
                                </Form.Item>
                                <div className='editing__form_number'>
                                    <div className='item__editing_income'>
                                        <Text
                                            className='item__sidebar-calendar_text item__editing_text'
                                            // style={{ marginRight: '24px' }}
                                        >
                                            Подходы
                                        </Text>
                                        <Form.Item
                                            name={'two'}
                                            rules={[
                                                { required: true, message: 'Missing first name' },
                                            ]}
                                            className='item__sidebar-calendar_access'
                                            // style={{ marginRight: '32px' }}
                                            // style={{ marginRight: '24px' }}
                                        >
                                            <InputNumber addonBefore='+' placeholder='1' />
                                        </Form.Item>
                                    </div>
                                    <div className='item__sidebar-calendar_weigth'>
                                        <div className='item__editing_income'>
                                            <Text className='item__sidebar-calendar_text item__sidebar-calendar_text-next item__editing_text'>
                                                Вес, кг
                                            </Text>
                                            <Form.Item
                                                name={'three'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing last name',
                                                    },
                                                ]}
                                            >
                                                <InputNumber placeholder='0' />
                                            </Form.Item>
                                        </div>
                                        <Text
                                            style={{
                                                fontSize: '0.875em',
                                                position: 'relative',
                                                top: '-5px',
                                            }}
                                            type='secondary'
                                        >
                                            x
                                        </Text>
                                        <div className='item__editing_income'>
                                            <Text className='item__sidebar-calendar_text item__sidebar-calendar_text-next item__editing_text'>
                                                Количество
                                            </Text>
                                            <Form.Item
                                                name={'four'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing last name',
                                                    },
                                                ]}
                                            >
                                                <InputNumber placeholder='3' />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </Space>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{ display: 'flex' }}
                                    direction='vertical'
                                    className='sidebar-calendar__form_item'
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'one-inside']}
                                        style={{ margin: '0px' }}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input
                                            placeholder='Упражнение'
                                            style={{ height: '24px' }}
                                        />
                                    </Form.Item>
                                    <div className='editing__form_number'>
                                        <div className='item__editing_income'>
                                            <Text className='item__sidebar-calendar_text item__editing_text'>
                                                Подходы, раз
                                            </Text>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'two-inside']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing first name',
                                                    },
                                                ]}
                                                className='item__sidebar-calendar_access'
                                            >
                                                <InputNumber addonBefore='+' placeholder='1' />
                                            </Form.Item>
                                        </div>
                                        <div className='item__sidebar-calendar_weigth'>
                                            <div className='item__editing_income'>
                                                <Text className='item__sidebar-calendar_text item__sidebar-calendar_text-next item__editing_text'>
                                                    Вес, кг
                                                </Text>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'three-inside']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Missing last name',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber placeholder='0' />
                                                </Form.Item>
                                            </div>
                                            <Text
                                                style={{
                                                    fontSize: '0.875em',
                                                    position: 'relative',
                                                    top: '-5px',
                                                }}
                                                type='secondary'
                                            >
                                                x
                                            </Text>
                                            <div className='item__editing_income'>
                                                <Text className='item__sidebar-calendar_text item__sidebar-calendar_text-next item__editing_text'>
                                                    Количество
                                                </Text>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'four-inside']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Missing last name',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber placeholder='3' />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </Space>
                            ))}
                        </>
                    )}
                </Form.List>
            </Form>
        </Drawer>
    );
};
