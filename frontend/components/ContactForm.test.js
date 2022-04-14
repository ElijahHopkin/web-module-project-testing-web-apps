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
    let error = screen.queryAllByTestId(['error']);
    userEvent.click(submit);
    error = await screen.findAllByTestId(['error']);
    console.log(error.length);
    screen.debug();
    expect(error).toHaveLength(3);
    //not what I'm looking for...
    // expect(error).toBeCalledTimes(3);
    // expect(error).toBeVisible();
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstname = screen.getByPlaceholderText("Edd");
    const lastname = screen.getByPlaceholderText("Burke");
    const submit= screen.getByText('Submit');
    let error =screen.queryAllByTestId(['error']);
    expect(error).toHaveLength(0);
    // const initError= screen.findAllByTestId(['error']);
    // expect(initError).not.toBeInTheDocument();
    userEvent.type(firstname, 'Jonny');
    userEvent.type(lastname, "Rhys");
    userEvent.click(submit);
    error =await screen.findAllByTestId(['error']);
    expect(error).toHaveLength(1);


});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    let emailError= screen.queryByText('email must be a valid email address', {exact: false});
    expect(emailError).not.toBeInTheDocument();
    userEvent.type(email, 'Geronimo');
    emailError= await screen.findByText('email must be a valid email address', {exact: false});
    expect(emailError).toBeVisible();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const submit= screen.getByText('Submit');
    const lnError = screen.queryByText(/lastname is a required/i);
    expect(lnError).not.toBeInTheDocument();
    userEvent.click(submit);
    const lastnameError =  await screen.findByText(/lastname is a required/i);
    expect(lastnameError).toBeVisible();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstname = screen.getByPlaceholderText("Edd");
    const lastname = screen.getByPlaceholderText("Burke");
    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    const submit= screen.getByText('Submit');
    userEvent.type(firstname, 'jonny');
    userEvent.type(lastname, 'quinn');
    userEvent.type(email, 'bluebell@gmail.com');
    userEvent.click(submit);

    const fnResult= await screen.findByTestId('firstnameDisplay');
    const lnResult= await screen.findByTestId('lastnameDisplay');
    const eResult = await screen.findByTestId('emailDisplay');

    expect(fnResult).toBeVisible();
    expect(lnResult).toBeVisible();
    expect(eResult).toBeVisible();


});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstname = screen.getByPlaceholderText("Edd");
    const lastname = screen.getByPlaceholderText("Burke");
    const email = screen.getByPlaceholderText('bluebill1049@hotmail.com');
    const message = screen.getByTestId('message');
    const submit= screen.getByText('Submit');
    userEvent.type(firstname, 'jonny');
    userEvent.type(lastname, 'quinn');
    userEvent.type(email, 'bluebell@gmail.com');
    userEvent.type(message, 'wazzup!');
    userEvent.click(submit);

    const fnResult= await screen.findByTestId('firstnameDisplay');
    const lnResult= await screen.findByTestId('lastnameDisplay');
    const eResult = await screen.findByTestId('emailDisplay');
    const mResult= await screen.findByTestId('messageDisplay');

    expect(fnResult).toBeVisible();
    expect(lnResult).toBeVisible();
    expect(eResult).toBeVisible();
    expect(mResult).toBeVisible();

});
