import React, { Component } from 'react';
import '../css/style.css';
import Login from './Login';
import Signup from './Signup';
import Cookies from "js-cookie";
import axios from "axios";
import Dashboard from "./Dashboard";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


class App extends Component {
    state = {
        ready: false,
        user_email: null,
        user: null,
        employees: null,
        signup: false
    };

    componentDidMount() {
        let user = Cookies.get('user');
        if(user) {
            axios.get(`/user?email=${user}`)
                .then(res => {
                    this.setState({user: res.data.user, ready: true})
                })
                .catch(err => console.log(err));
        } else {
            this.setState({ready: true})
        }
    }

    loadEmployees = () => {
        axios.get('/employees')
            .then(res => res.data)
            .then(data => this.setState({employees: [...data]}));
    };

    onUserLogin = (event) => {
        event.preventDefault();
        axios.get(`/login?email=${this.state.user_email}`)
            .then(response => {
                if(response.status === 200) {
                    if(!response.data.login_status) {
                        this.setState({signup: true});
                    } else {
                        this.setState({user: response.data.user});
                    }
                }
            })
            .catch(err => console.log(err));
    };

    onUserEmailChanged = (event) => {
        this.setState({user_email: event.target.value});
    };

    handleLogout = () => {
        axios.get('/logout')
            .then(response => {
                if(response.status === 200) {
                    this.setState({user: null});
                }
            })
            .catch(err => console.log(err));

    };

    handleSignupSubmit = (event) => {
        event.preventDefault();

        const data = {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            email: this.state.user_email
        };

        axios.post('/signup', data)
            .then(response => response.data)
            .then( data => this.setState({user: data.user, signup: false}))
            .catch(error => console.log(error));
    };

    toggleSignupModal = () => {
        this.setState((prev) => { return {signup : !prev.signup}});
    };

    onStatusChanged = (status) => {
        let employee = {...this.state.user};
        employee.status = status;

        axios.post('/update', employee)
            .then(res => {
                if(res.status === 200) {
                    this.setState({user: res.data});

                }
            })
            .catch(err => console.log(err));
    };

    render() {
        let { user, ready } = this.state;
        if(ready) {
            let dashboard = user ?
                <Dashboard employees={this.state.employees} user={this.state.user} clicked={this.onStatusChanged} loadEmployees={this.loadEmployees}/> :
                <Login clicked={this.onUserLogin} onUserEmailChanged={this.onUserEmailChanged}/>;

            let logoutBtn = user ? <button className="btn btn-outline-secondary my-2 my-sm-0" onClick={this.handleLogout}>Logout</button> : null;

            let showModal = this.state.signup ?
                <Modal isOpen={this.state.signup} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggleSignupModal}>Register</ModalHeader>
                    <ModalBody>
                        <Signup clicked={this.handleSignupSubmit}/>
                    </ModalBody>
                </Modal> : null;

            return (
                <>
                    <nav className="navbar fixed-top navbar-light bg-light">
                        <a className="navbar-brand">My Work Status</a>
                        {logoutBtn}
                    </nav>
                    <div>
                        {showModal}
                        <div className={"container h-100"}>
                            {dashboard}
                        </div>
                    </div>
                </>
            );
        } else {
            return(
                <div className="text-center">
                    <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }


    }
}

export default App;
