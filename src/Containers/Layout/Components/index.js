import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

//import Header from '../../../Components/Header';

// pages
import Error from '../../../Pages/Error/404';

import ToDoList from '../../../Pages/ToDo/List';
/*import WeldersCreate from '../../../Pages/Welders/Create';
import WeldersEdit from '../../../Pages/Welders/Edit';*/

//import { ToastContainer } from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css';
import { Header, Sidebar, Menu, Icon, Segment, Button, Input } from 'semantic-ui-react';

const View = (props) => {
  return (
  <>    
    <BrowserRouter>

      <Menu following bar light fixed='top' >

          <Menu.Item>
          <Input
            icon={<Icon name='search' link onClick={()=>props.getToDoList(props.filter)} />}
            placeholder='Поиск...'
            value={props.filter.findText}
            onChange={(e, {value})=>props.setFilter({...props.filter, findText:value})}
          />
          </Menu.Item>
          <Menu.Item
            position='right'
            onClick={()=> props.logout()}
            name='Выход'
          />
      </Menu>
      <Menu  following bar light secondary>
      <Menu.Item>
      </Menu.Item>
      </Menu>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={ToDoList} />
          {/*<Route exact path="/welders" component={WeldersList} />
          <Route exact path="/welders/create" component={WeldersCreate} />
          <Route exact path="/welders/addData/:id" component={WeldersAddData} />
          <Route exact path="/welders/edit/:id" component={WeldersEdit} />
          <Route exact path="/vehicles" component={VehiclesList} />
          <Route exact path="/vehicles/create" component={VehiclesCreate} />
  <Route exact path="/vehicles/edit/:id" component={VehiclesEdit} />*/}
          <Route component={Error} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </>
)
};

export default View;
