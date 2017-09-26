"use strict";

const {get_param, req_to_db} = require("../functions/func");

module.exports = {
    search: async (search_req) => {
        /*
         * 1 частина - обробити search_req - від app приходить два параметра type і param
         * type - тип пошуку:
         *   1 : пошук по інгрідієнтам
         *   2 : пошук по назві
         * param - параметри для пошуку:
         *   1 : для пошуку по інгрідієнтам - id інгрідієнтів через кому. Наприклад 1,3,6,7
         *   2 : для пошуку по назві - string
         * page - сторінка
         * size - кількість рецептів на сторіці
         *
         * 2 частина - звернутись до db - два запити до db в залежності від типу пошука
         *
         * 3 частина - дати відповідь - результат віддаєм у вигляджі JSON
         *
         * */

        let search_param = await get_param(search_req);
        let rez = await req_to_db(Number(search_param["type"]), Number(search_param["size"]), Number(search_param["page"]), search_param["param"])
        return rez;
    }
};

