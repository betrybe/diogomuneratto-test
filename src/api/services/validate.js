
module.exports = {

    //verifica se o campos vazio
    isEmpty: (str) => {

        if (str == undefined) return true;
        if (str.trim() == '') {
            return true;
        }
        return false;
        
    },

    //verificaå email valido
    isEmail: (email) => {
        var ex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return ex.test(email);
    },

}