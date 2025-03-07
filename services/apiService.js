const axios = require('axios');

exports.getExternalData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com.users');
        return response.data;
    } catch(error) {
        throw new Error('Error while calling API');
    }
};