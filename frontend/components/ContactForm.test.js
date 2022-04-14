import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm/>);

});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeVisible();
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent("Contact Form");
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstname= screen.getByPlaceholderText('Edd');
    const error = screen.findAllByTestId('error');
    //there's a better test than tohavelength, I think. How can I prove how many error messages there are?
    expect(error).tohavelength;
    expect(error).toBeEmptyDOMElement;
    userEvent.type(firstname, 'John');
    const errormessage = await screen.findByText('Error: ', {exact: false});
    expect(errormessage).toBeVisible();
    expect(error).tohavelength;

    //how to test that there is only ONE?
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submit = screen.getByText('Submit');
    const error = screen.findAllByTestId('error');
    userEvent.click(submit);
    //not what I'm looking for...
    // expect(error).toBeCalledTimes(3);
    expect(error).toBeVisible();
    screen.debug();
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});
