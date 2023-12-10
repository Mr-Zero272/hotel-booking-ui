function validation(values) {
    let errors = {};

    if (!values.username) {
        errors.username = 'Please enter a valid username. This field is required';
    } else if (values.username.length < 5) {
        errors.username = 'This field is required must more than 5 characters';
    }

    if (!values.password) {
        errors.password = 'Please enter a valid password. This field is required';
    } else if (values.password.length < 9) {
        errors.password = 'Password must be more than 9 char';
    }

    return errors;
}
export default validation;
