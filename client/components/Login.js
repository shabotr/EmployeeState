import React  from 'react';
import { Form, FormGroup, InputGroupAddon, Input, InputGroup } from 'reactstrap';

const login = (props) => {
    
    return(
        <div className={'login'}>
            <h4 className={'text-center'}>Login</h4>
            <form className={"form pt-5"} onSubmit={props.clicked}>
                <InputGroup>
                    <Input type="email" className="form-control" placeholder="My Username" value={props.email} onChange={props.onUserEmailChanged} required/>
                    <InputGroupAddon addonType="append">
                        <button type="submit" className="btn btn-outline-primary" id="buttonLogin">Login</button>
                    </InputGroupAddon>
                </InputGroup>
            </form>
        </div>
    );

};

export default login;