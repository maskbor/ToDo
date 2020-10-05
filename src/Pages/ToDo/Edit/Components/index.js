import React from 'react'
import { Button, Form, Menu, Dropdown, Message, Select, Icon, Container, Header } from 'semantic-ui-react'

function EditVehicle(props) { 
    const dayOptions = [
        { key: '01', value: '01', text: '1' },
        { key: '02', value: '02', text: '2' },
        { key: '03', value: '03', text: '3' },
        { key: '04', value: '04', text: '4' },
        { key: '05', value: '05', text: '5' },
        { key: '06', value: '06', text: '6' },
        { key: '07', value: '07', text: '7' },
        { key: '08', value: '08', text: '8' },
        { key: '09', value: '09', text: '9' },
        { key: '10', value: '10', text: '10' },
        { key: '11', value: '11', text: '11' },
        { key: '12', value: '12', text: '12' },
        { key: '13', value: '13', text: '13' },
        { key: '14', value: '14', text: '14' },
        { key: '15', value: '15', text: '15' },
        { key: '16', value: '16', text: '16' },
        { key: '17', value: '17', text: '17' },
        { key: '18', value: '18', text: '18' },
        { key: '19', value: '19', text: '19' },
        { key: '20', value: '20', text: '20' },
        { key: '21', value: '21', text: '21' },
        { key: '22', value: '22', text: '22' },
        { key: '23', value: '23', text: '23' },
        { key: '24', value: '24', text: '24' },
        { key: '25', value: '25', text: '25' },
        { key: '26', value: '26', text: '26' },
        { key: '27', value: '27', text: '27' },
        { key: '28', value: '28', text: '28' },
        { key: '29', value: '29', text: '29' },
        { key: '30', value: '30', text: '30' },
        { key: '31', value: '31', text: '31' },
      ]
    const monthOptions = [
        { key: '01', value: '01', text: 'Январь' },
        { key: '02', value: '02', text: 'Февраль' },
        { key: '03', value: '03', text: 'Март' },
        { key: '04', value: '04', text: 'Апрель' },
        { key: '05', value: '05', text: 'Май' },
        { key: '06', value: '06', text: 'Июнь' },
        { key: '07', value: '07', text: 'Июль' },
        { key: '08', value: '08', text: 'Август' },
        { key: '09', value: '09', text: 'Сентябрь' },
        { key: '10', value: '10', text: 'Октябрь' },
        { key: '11', value: '11', text: 'Ноябрь' },
        { key: '12', value: '12', text: 'Декабрь' }
    ]
      
    return (
            <Container>
            <Menu secondary>
                <Menu.Menu position='right'>
                    <Menu.Item>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Menu secondary>
                <Header as='h2'>Редактирование {props.vehicle.vehicle_name}</Header>
            </Menu>
            { props.error && props.error.list &&
                <Message
                    error
                    header='Произошла ошибка:'
                    list={props.error.list}
                />
            }
            <Form>
                <Form.Input
                    label='Наименование:'
                    placeholder='Наименование:'
                    name='vehicle_name'
                    value={props.vehicle.vehicle_name}
                    onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                />
                <Form.Input
                    label='Hомер:'
                    placeholder='Номер:'
                    name='regNumber'
                    value={props.vehicle.regNumber}
                    onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                />
                <Form.Field>
                    <label>Ответственный:</label>
                    <Dropdown 
                        name='id_user'
                        loading={props.isLoadingUsers} 
                        selection 
                        search
                        placeholder="Ответственный:"
                        text={props.user && props.user.name} 
                        fluid
                        options={props.listUsers.map(item => {return({
                                key: item.id, 
                                value: item.id,
                                text: item.name
                            })
                        })}
                        onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                        value={props.vehicle.id_user}
                    >
                    </Dropdown>
                </Form.Field>

                <Form.Field inline>
                    <label>НП:</label>
                    
                    <Dropdown 
                        name='id_settlement'
                        value={props.vehicle.id_settlement}
                        fluid
                        search
                        selection
                        placeholder='НП' 
                        noResultsMessage = {
                            <>
                                <label>Список пуст. </label>
                                { props.dropdownSettlements.searchQuery !== '' && <Button basic onClick={props.createSettlement}><Icon name='plus'/>Добавить '{props.dropdownSettlements.searchQuery}'</Button> }
                            </>
                        }
                        loading={props.isLoadingSettlements}
                        options={props.listSettlements.map(item => {return({
                                key: item.id, 
                                value: item.id,
                                text: item.name
                            })
                        })} 
                        onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                        onSearchChange={(e, { searchQuery }) => props.setDropdownSettlements({...props.dropdownSettlements, searchQuery: searchQuery})}
                        value={props.vehicle.id_settlement}
                    >
                    </Dropdown>
                </Form.Field>

                <Form.Input
                    label='Наименование нормы:'
                    placeholder='Наименование нормы:'
                    name='norm_name'
                    value={props.vehicle.norm_name}
                    onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                />
    
                    <Form.Field inline>
                        <label>Зима с: </label>
                        <Select 
                            name='winter_from_month'
                            fluid
                            placeholder='Месяц' 
                            options={monthOptions} 
                            onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                            value={props.vehicle.winter_from_month}
                        />
                        <Select 
                            name='winter_from_day'
                            fluid
                            placeholder='День'
                            options={dayOptions} 
                            onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                            value={props.vehicle.winter_from_day}
                        />
                    </Form.Field>

                <Form.Field inline>
                        <label>Зима до:</label>
                        <Select 
                            name='winter_to_month'
                            fluid
                            placeholder='Месяц' 
                            options={monthOptions} 
                            onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                            value={props.vehicle.winter_to_month}
                        />
                        <Select 
                            name='winter_to_day'
                            fluid
                            placeholder='День' 
                            options={dayOptions} 
                            onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                            value={props.vehicle.winter_to_day}
                        />
                    </Form.Field>

                <Form.Input
                    label='B зимний период л/100 км в городском цикле:'
                    placeholder='B зимний период л/100 км в городском цикле:'
                    name='winter_city'
                    value={props.vehicle.winter_city}
                    onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                />

                <Form.Input
                    label='B зимний период л/100 км в загородном цикле:'
                    placeholder='B зимний период л/100 км в загородном цикле:'
                    name='winter_highway'
                    value={props.vehicle.winter_highway}
                    onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                />
                
                <Form.Input
                    label='B летний период л/100 км в городском цикле:'
                    placeholder='B летний период л/100 км в городском цикле:'
                    name='summer_city'
                    value={props.vehicle.summer_city}
                    onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                />
                
                <Form.Input
                    label='B летний период л/100 км в загородном цикле:'
                    placeholder='B летний период л/100 км в загородном цикле:'
                    name='summer_highway'
                    value={props.vehicle.summer_highway}
                    onChange={(e, {name, value}) => props.setVehicle({ ...props.vehicle, [name]: value })}
                />
                
                <Button type='submit' onClick={()=>{props.handleSubmit()}}> <Icon name='save'/>Применить</Button>
            </Form>
        </Container>     
    )
}

export default EditVehicle