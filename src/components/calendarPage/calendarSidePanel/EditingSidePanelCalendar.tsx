import './editingSidePanelCalendar.css';
import { PlusOutlined, CloseOutlined, EditOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Input, Space, InputNumber, Typography, Drawer, Checkbox, Form } from 'antd';
import { useState } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import moment from 'moment';
const { Text } = Typography;
type props = {
    past?: boolean;
    listChangeTraning: { exercises: object[]; name: string; date: string };
    onCloseMenu: (e: {
        exercises: object[];
        date: string;
        name: string;
        isImplementation: boolean;
    }) => void;
    lastAndFutureDay: boolean;
};
export const EditingSidePanelCalendar: React.FC<props> = ({
    past = false,
    listChangeTraning,
    onCloseMenu,
    lastAndFutureDay = false,
}) => {
    const [checked, setChecked] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [nameField, setNameField] = useState<number>(-1);
    const onFinish = (values: any) => {
        const arr = values[listChangeTraning.name].filter((item: { name: string }) => item.name);
        onCloseMenu({
            ...listChangeTraning,
            exercises: arr,
            isImplementation: lastAndFutureDay,
        });
    };
    const toggleDisable = (e: CheckboxChangeEvent) => {
        setNameField(Number(e.target.name));
        console.log(e.target.name, nameField);
        setDisabled(true);
        setChecked(true);
    };
    const clearChecked = () => {
        setChecked(false);
        setDisabled(false);
        setNameField(-1);
    };
    return (
        <Drawer
            className='sidebar-calendar'
            width={408}
            closable={false}
            open={true}
            mask={false}
            data-test-id='modal-drawer-right'
        >
            <div className='sidebar-calendar-content' data-test-id='modal-drawer-right'>
                <div className='sidebar-calendar__header'>
                    <div className='sidebar-calendar__header_title'>
                        <EditOutlined style={{ width: '14px', height: '14px', color: 'black' }} />
                        <h3 className='title__sidebar-calendar'>Редактирование</h3>
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
                            {listChangeTraning.name}
                        </span>
                        <span className='sidebar-calendar__traning_date'>
                            {moment.utc(listChangeTraning.date).format('DD.MM.YYYY')}
                        </span>
                    </li>
                </div>
                <Form
                    className='sidebar-calendar__form edit-past-form'
                    name='sidebar-calendar__form'
                    onFinish={onFinish}
                    autoComplete='off'
                    style={{ fontSize: '16px' }}
                >
                    <Form.List
                        name={listChangeTraning.name}
                        initialValue={
                            !listChangeTraning.exercises.length
                                ? [{ name: '', approaches: '1', weight: '0', quantity: '1' }]
                                : listChangeTraning.exercises
                        }
                    >
                        {(fields, { add, remove }) => (
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
                                            rules={[
                                                { required: true, message: 'Missing first name' },
                                            ]}
                                        >
                                            <Input
                                                placeholder='Упражнение'
                                                addonAfter={
                                                    <Checkbox
                                                        checked={name === nameField}
                                                        onChange={toggleDisable}
                                                        name={`${name}`}
                                                        onClick={() => setNameField(name)}
                                                        data-test-id={`modal-drawer-right-checkbox-exercise${key}`}
                                                    />
                                                }
                                                data-test-id={`modal-drawer-right-input-exercise${key}`}
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
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Missing first name',
                                                        },
                                                    ]}
                                                    className='item__sidebar-calendar_access'
                                                >
                                                    <InputNumber
                                                        addonBefore='+'
                                                        placeholder='1'
                                                        min={1}
                                                        data-test-id={`modal-drawer-right-input-approach${key}`}
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
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: '',
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            placeholder='0'
                                                            min={0}
                                                            data-test-id={`modal-drawer-right-input-weight${key}`}
                                                        />
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
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: '',
                                                            },
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            placeholder='3'
                                                            min={1}
                                                            data-test-id={`modal-drawer-right-input-quantity${key}`}
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </Space>
                                ))}
                                <Space
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        color: '#2f54eb',
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '0 0 8px 8px',
                                        textAlign: 'left',
                                    }}
                                >
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
                                                color: '#2f54eb',
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >
                                            Добавить ещё
                                        </Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            style={{
                                                color: disabled ? '#2f54eb' : '#bfbfbf',
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                            }}
                                            type='text'
                                            disabled={!disabled}
                                            onClick={() => {
                                                remove(nameField);
                                                clearChecked();
                                            }}
                                            icon={
                                                <MinusOutlined
                                                    style={{
                                                        color: disabled ? '#2f54eb' : '#bfbfbf',
                                                        fontSize: '14px',
                                                    }}
                                                />
                                            }
                                        >
                                            Удалить
                                        </Button>
                                    </Form.Item>
                                </Space>
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
                            data-test-id='modal-drawer-right-button-close'
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
                {past && (
                    <Text className='edit-past-traning'>
                        После сохранения внесенных изменений отредактировать проведенную тренировку
                        <br />
                        будет невозможно
                    </Text>
                )}
            </div>
        </Drawer>
    );
};
