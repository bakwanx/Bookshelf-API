const responseApi = (status, message, data) => {
    if(data != null){
        return {
            status: status,
            message: message,
            data: data
        };
    }
    return {
        status: status,
        message: message
    };
};

module.exports = responseApi;