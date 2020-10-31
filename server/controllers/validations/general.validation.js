const validation = {};
const config = require('../../config/database');
const CryptoJS = require('crypto-js');

/**
 * Este metodo valida si un campo esta lleno o no,
 * y crea un objeto json personalizado para cada campo.
 * @param {Object} data En este parametro se recibe la
 * información para ser validada por el metodo.
 * @param {String} nameFiel es el nombre del campo,
 * este es necesario para crear el mensaje presonalizado.
 * @return {Json} Un objeto json con un estado
 * (true si el parametro data no esta vacio o indefinido,
 * y falso en caso contrario) y un mensaje personalizado.
 */
validation.isFilled = (data, nameFiel) => {
    if (data === undefined || data === ' ' || data === '') {
        return { success: false, msg: `The field "${nameFiel}" is empty` };
    } else {
        return { success: true, msg: `The field is filled` };
    }
};

validation.decrypt = (str) => {
    var bytes = CryptoJS.AES.decrypt(str, config.secret);
    return bytes.toString(CryptoJS.enc.Utf8);
}

validation.isFilled = (data, nameFiel) => {
    if (data == undefined || data == ' ' || data == '') {
        return { success: false, msg: 'The field "' + nameFiel + '" is empty' };
    } else {
        return { success: true, msg: 'The field is filled' };
    }
}

module.exports = validation;