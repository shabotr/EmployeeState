import React, { Component } from 'react';
import Select from 'react-select';
import EmplyeesList from "./EmplyeesList";

const statusOptions = [
    { value: 'working', label: 'Working' },
    { value: 'onVacation', label: 'On Vacation' },
    { value: 'lunchTime', label: 'Lunch Time' },
    { value: 'businessTrip', label: 'Business Trip' }
];

class Dashboard extends Component {

    state = {
        dropdownOpen: false
    };

    componentDidMount() {
        this.props.loadEmployees();
    }

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    };

    handleStateChanged = (status) => {
        this.props.clicked(status.label);
    };

    render() {
        return(
            <>
                <div className={'dashboard'}>
                    <h4>Hello {this.props.user.first_name} {this.props.user.last_name}, you are on <span className="badge badge-secondary text-capitalize">{this.props.user.status}</span></h4>
                    <p>Update My Current Status</p>
                    <Select
                        classNamePrefix="Status"
                        defaultValue={statusOptions[0]}
                        isSearchable={false}
                        name="status"
                        options={statusOptions}
                        onChange={this.handleStateChanged}
                    />
                    <hr />
                    <EmplyeesList employees={this.props.employees}/>
                </div>
            </>

        );
    }
};

export default Dashboard;