function validation(values) {
    let errors = {};

    if (!values.hotel) {
        errors.hotel = 'Please enter a valid hotel. This field is required';
    }

    if (!values.name) {
        errors.name = 'Please enter a valid name. This field is required';
    } else if (values.name.length < 3) {
        errors.name = 'Name must be more than 3 char';
    }

    if (!values.description) {
        errors.description = 'Please enter a valid description. This field is required';
    } else if (values.description.length < 1) {
        errors.description = 'Description must be more than 10 char';
    }

    if (!values.currentPrice) {
        errors.currentPrice = 'Please enter a valid price. This field is required';
    }

    if (!values.roomType) {
        errors.roomTypeId = 'Please enter a valid type. This field is required';
    }

    if (!values.capacity) {
        errors.capacity = 'Please enter a valid capacity. This field is required';
    } else if (values.capacity < 1) {
        errors.capacity = 'Capacity must be more than 10';
    }

    return errors;
}
export default validation;
