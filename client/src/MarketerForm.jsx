import React, { Component } from 'react';
import { Form, FormControl, FormGroup, Button, HelpBlock, Radio } from 'react-bootstrap';
import { formFields, experienceLevels, websitePattern, emailPattern, linkeinPattern } from './utils';

class MarketerForm extends Component {

    renderInputFields() {

        return formFields.map((field, index) => {
            const error = this.props.error[field.name] ? this.props.error[field.name] : '';
            return (
                <FormGroup key={index} validationState={this.getValidationState(field.name)}>
                    <FormControl name={field.name} 
                        placeholder={field.placeholder} 
                        onChange={(e) => this.props.handleUserInput(e)} 
                        value={this.props.marketer[field.name]}/>
                    <FormControl.Feedback/>
                    <HelpBlock>{error}</HelpBlock>
                </FormGroup>
            )
        });
    }

    renderRadioButtons() {

        const radioButtons = experienceLevels.map((level, index) => {
            return (
                <Radio key={index} 
                    name="experience" 
                    value={level.value} 
                    checked={this.props.marketer.experience === level.value} 
                    onChange={(e) => this.props.handleUserInput(e)} 
                    inline>
                    {level.label}
                </Radio>
            )
        });
        return (
            <FormGroup controlId="Experince">
                <span style={{"paddingRight":"50px"}}>How much marketing experience do you have?</span>
                {radioButtons}
            </FormGroup>
        )
    }

    getValidationState(field) {

        const marketer = this.props.marketer;

        let status = null;
        switch (field) {
            case 'email':
                if (marketer.email.length && emailPattern.test(marketer.email) && !this.props.error.email) {
                    status = 'success';
                } else if (marketer.email.length) {
                    status = 'error';
                }
                break;
            case 'website':
                if (marketer.website.length > 0 && !websitePattern.exec(marketer.website)) {
                    status = 'error'
                } else if (marketer.website.length > 0) {
                    status = 'success';
                }
                break;
            case 'linkedin':
                if (marketer.linkedin.length > 0 && !linkeinPattern.exec(marketer.linkedin)) {
                    status = 'error'
                } else if (marketer.linkedin.length > 0) {
                    status = 'success';
                }
                break;
            default:
                if (marketer[field].length > 0) {
                    status = 'success';
                }
        }
        return status;
    }

    shouldButtonBeEnabled() {
        return this.getValidationState('email') === 'success' && this.getValidationState('website') !== 'error' && this.getValidationState('linkedin') !== 'error';
    }

    render() {
        //only allow form to be submitted if there is a valid e-mail addrress
        const isEnabled = this.shouldButtonBeEnabled();

        return (
            <Form>
                {this.renderInputFields()}
                {this.renderRadioButtons()}
                <Button className="submitButton" 
                    disabled={!isEnabled} 
                    onClick={() => this.props.submitForm()} 
                    bsStyle="primary" 
                    bsSize="large">
                    Submit now and join another {this.props.marketerCount} marketers!!!
                </Button> 
            </Form>
        )

    }

}

export default MarketerForm;