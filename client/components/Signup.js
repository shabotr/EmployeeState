import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';


const signup = (props) => {
    return(
        <form onSubmit={props.clicked} >
            <FormGroup>
                <Label for="first_name">First Name</Label>
                <Input type="text" name="first_name" id="first_name" required/>
            </FormGroup>
            <FormGroup>
                <Label for="last_name">Last Name</Label>
                <Input type="text" name="last_name" id="last_name" required/>
            </FormGroup>
            <Button color="primary" block>Submit</Button>
        </form>
    );
};

export default signup;