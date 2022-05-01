function empty(data) {
    if ( !!data && data.length !== 0 ) return '';
    return 'Field cannot be empty';
};

function higherThan(data1, data2) {
    if (typeof(data1) === 'undefined') data1 = 0;
    if (typeof(data2) === 'undefined') data2 = 0;
    if ( data1 > data2 ) return '';
    return 'Field must be higher than its minimum input';
}

function lesserThan(data1, data2) {
    if (typeof(data1) === 'undefined') data1 = 0;
    if (typeof(data2) === 'undefined') data2 = 0;
    if ( data1 < data2 ) return '';
    return 'Field must be lesser than its minimum input';
}

function minLength (data, minLength) {
    if (typeof(data) === 'undefined') data = 0;
    if ( data.length >= minLength ) return '';
    return `Field must contain at least ${minLength} characters`;
}

export function validateFormInputs(state, validations) {
    let error = {}
    if ( validations.length !== 0 ) {
        validations.forEach(elem => {
            if (elem.val !== 0) {
                elem.val.forEach(val => {
                    if (val === 'empty') error[elem.param1] = empty(state[elem.param1]);
                    if (val === 'higher') error[elem.param1] = higherThan(state[elem.param1], state[elem.param2]);
                    if (val === 'lesser') error[elem.param1] = lesserThan(state[elem.param1], state[elem.param2]);
                    if (val === 'min-length') error[elem.param1] = minLength(state[elem.param1], elem.param2);
                });
            }
        });
    };
    console.log(error)
    return error
}