const querySchema = {
    filter: {
        notEmpty: {
            errorMessage: 'filter not found',
        }
    },
    value: {
        notEmpty: {
            errorMessage: 'Empty Value',
        }
    }
}

module.exports = {
    querySchema,
};