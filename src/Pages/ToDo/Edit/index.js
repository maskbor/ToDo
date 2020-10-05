import { compose, lifecycle, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { getVehicle, editVehicle } from '../../../Store/Actions/Vehicles';
import { getUsersList } from '../../../Store/Actions/Users';
import { getSettlementsList, addSettlement } from '../../../Store/Actions/Settlements';

import View from './Components';

export default compose(
  connect(
    state => ({
      isAuthenticated: state.auth.isAuthenticated,
      listUsers: state.users.list,
      isLoadingUsers: state.users.isLoading,
      isLoading: state.vehicles.isLoading,
      listSettlements: state.settlements.list,
      isLoadingSettlements: state.settlements.isLoading,
      error: state.vehicles.error
    }), { getVehicle, editVehicle, getUsersList, getSettlementsList, addSettlement },
  ),
  withState("vehicle", "setVehicle", {
    id: null,
    vehicle_name: '',
    norm_name: '',
    regNumber: '',
    id_user: '',
    id_settlement: '',
    winter_from_day: '',
    winter_from_month: '',
    winter_to_day: '',
    winter_to_month: '',
    winter_highway: '',
    winter_city: '',
    summer_highway: '',
    summer_city: '',
  }),
  withState("dropdownSettlements", "setDropdownSettlements", {searchQuery: ''}),
  withHandlers({
    handleSubmit: props => () => {
      props.editVehicle(props.vehicle);
    },
    createSettlement: props => () => {
      props.addSettlement({name: props.dropdownSettlements.searchQuery}).then(
        data => { data.status == 200 && props.setVehicle({...props.vehicle, id_settlement: data.data.id})}
      );
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.getVehicle(this.props.match.params.id).then( data => { 
        data.status == 200 && this.props.setVehicle({
          id: data.data.id,
          vehicle_name: data.data.name,
          norm_name: data.data.norm.name,
          regNumber: data.data.regNumber,
          id_user: data.data.user.id,
          id_settlement: data.data.id_settlement,
          winter_from_day: data.data.norm.winter_from.slice(8),
          winter_from_month: data.data.norm.winter_from.slice(5,7),
          winter_to_day: data.data.norm.winter_to.slice(8),
          winter_to_month: data.data.norm.winter_to.slice(5,7),
          winter_highway: data.data.norm.winter_highway,
          winter_city: data.data.norm.winter_city,
          summer_highway: data.data.norm.summer_highway,
          summer_city: data.data.norm.summer_city
        })
      });
      this.props.getUsersList();
      this.props.getSettlementsList();
    }
  })
)(View);