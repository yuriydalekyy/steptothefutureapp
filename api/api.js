"use strict";

module.exports ={
    search : (search_req) => {
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
        * 3 частина - дати відповідь - результат віддаєм у вигляджі JSON з наступною структурою
        *
        *   {
        *       "count" : number,
        *       "search_rez" : [
        *           {
        *               "name":string,
        *               "id": number
        *               "ingredients":[
        *                   {
        *                       "id":number,
        *                       "name":string
        *                   }
        *               ],
        *               "time": {
        *                   "min" : number,
        *                   "max" : number,
        *                   "time_stamp" : number
        *               }
        *               "photo":string
        *           }
        *       ]
        *   }
        * */

        console.log("params -> "+search_req);
        return {
            "params": search_req,
            "count" : 2,
            "search_rez" : [
                {
                    "name": "Булочка з маком",
                    "id": 2233,
                    "time": {
                        "min" : 20,
                        "max" : 40,
                        "time_stamp": 2
                    },
                    "ingredients": [
                        {
                            "id": 1,
                            "name":"мука"
                        },
                        {
                            "id":2,
                            "name":"мак"
                        },
                        {
                            "id":3,
                            "name":"яйце"
                        }
                    ],
                    "photo":"/img/erhy65mb.jpg"
                },
                {
                    "name": "Булочка з медом",
                    "id": 2234,
                    "time": {
                        "min" : 20,
                        "max" : 40,
                        "time_stamp": 2
                    },
                    "ingredients": [
                        {
                            "id": 1,
                            "name":"мука"
                        },
                        {
                            "id":5,
                            "name":"мед"
                        },
                        {
                            "id":3,
                            "name":"яйце"
                        }
                    ],
                    "photo":"/img/erhy66mb.jpg"
                }
            ]
        }
    }
};