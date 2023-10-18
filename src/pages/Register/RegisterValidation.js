function validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!values.username) {
        error.username = 'Please enter a valid username. This field is required';
    } else if (values.username.length < 5) {
        error.username = 'This field is required must more than 5 characters';
    }

    if (values.email === '') {
        error.email = ' Please enter a valid email address. This field is required';
    } else if (!email_pattern.test(values.email)) {
        error.email = 'Please enter a valid email format';
    }

    if (values.password === '') {
        error.password = 'Please enter a valid password. This field is required';
    } else if (!password_pattern.test(values.password)) {
        error.password =
            'Your password must be at least 8 characters long and contain at least 1 number and 1 uppercase letter. Special characters are not allowed.';
    }

    if (values.confirm_password === '' || String(values.confirm_password) !== String(values.password)) {
        console.log(values.confirm_password + '___' + values.password);
        error.confirm_password = 'The entered passwords do not match. Please make sure the passwords match exactly';
    }

    return error;
}
export default validation;
