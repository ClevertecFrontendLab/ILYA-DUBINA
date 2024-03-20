import './sidePanelCalendar.css';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, InputNumber, Typography, Drawer } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/configure-store';
import { clearChangeObject } from '@redux/CleverfitSwaggerCalendarTraningApi';
const { Text } = Typography;
type props = {
    name: string;
    date: string;
    onCloseMenu: (e: {
        exercises: object[];
        date: string;
        name: string;
        isImplementation: boolean;
    }) => void;
    sideDataObject: { exercises: object[] };
};
export const SidePanelCalendar: React.FC<props> = ({ name, date, onCloseMenu, sideDataObject }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const onFinish = (values: any) => {
        const arr = values[name].filter((item: { name: string }) => item.name);
        dispatch(clearChangeObject());
        onCloseMenu({ name: `${name}`, date: date, exercises: arr, isImplementation: false });
    };
    return (
        <Drawer className='sidebar-calendar' width={408} closable={false} open={true} mask={false}>
            <div className='sidebar-calendar-content'>
                <div className='sidebar-calendar__header'>
                    <div className='sidebar-calendar__header_title'>
                        <PlusOutlined style={{ width: '14px', height: '14px', color: 'black' }} />
                        <h3 className='title__sidebar-calendar'>Добавление упражнений</h3>
                    </div>
                </div>
                <div className='sidebar-calendar__traning'>
                    <li className='calendar-training-modal__traning__item'>
                        <span
                            className={
                                'calendar-training-modal__item_text sidebar-calendar__traning_text ' +
                                name
                            }
                        >
                            {name}
                        </span>
                        <span className='sidebar-calendar__traning_date'>{date}</span>
                    </li>
                </div>
                <Form
                    className='sidebar-calendar__form'
                    name='dynamic_form_nest_item'
                    onFinish={onFinish}
                    form={form}
                    autoComplete='off'
                    style={{ fontSize: '16px' }}
                >
                    <Form.List
                        name={name}
                        initialValue={
                            !sideDataObject?.exercises.length
                                ? [{ name: '', approaches: '1', weight: '0', quantity: '1' }]
                                : sideDataObject.exercises
                        }
                    >
                        {(fields, { add }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{ display: 'flex' }}
                                        direction='vertical'
                                        className='sidebar-calendar__form_item'
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            style={{ margin: '0px' }}
                                            rules={[{ required: false, message: '' }]}
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
                                                    name={[name, 'approaches']}
                                                    rules={[{ required: false, message: '' }]}
                                                    className='item__sidebar-calendar_access'
                                                >
                                                    <InputNumber
                                                        min={1}
                                                        addonBefore='+'
                                                        placeholder='1'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='item__sidebar-calendar_weigth'>
                                                <div className='item__editing_income'>
                                                    <Text className='item__sidebar-calendar_text item__sidebar-calendar_text-next item__editing_text'>
                                                        Вес, кг
                                                    </Text>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'weight']}
                                                        rules={[{ required: false, message: '' }]}
                                                    >
                                                        <InputNumber min={0} placeholder='0' />
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
                                                        name={[name, 'quantity']}
                                                        rules={[{ required: false, message: '' }]}
                                                    >
                                                        <InputNumber min={1} placeholder='3' />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button
                                        type='text'
                                        onClick={() => add()}
                                        block
                                        icon={
                                            <PlusOutlined
                                                style={{
                                                    color: '#2f54eb',
                                                    fontSize: '14px',
                                                }}
                                            />
                                        }
                                        style={{
                                            height: '40px',
                                            color: '#2f54eb',
                                            backgroundColor: '#f0f0f0',
                                            borderRadius: '0 0 8px 8px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        Добавить ещё
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item className='side-panel-button__submit'>
                        <Button
                            type='link'
                            style={{
                                width: '14px',
                                height: '14px',
                                padding: '0px',
                                border: 'none',
                            }}
                            htmlType='submit'
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
                    </Form.Item>
                </Form>
            </div>
        </Drawer>
    );
};
