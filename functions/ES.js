"use strict";

let elasticsearch = require('elasticsearch');
let name = "bla papa";
let time = "40-60-hv";
let ing = [
    {
        "id": 1,
        "name": "Капуста білокачанна",
        "weight": 500
    },
    {
        "id": 2,
        "name": "Куряче яйце",
        "count": 3
    },
    {
        "id": 3,
        "name": "Сметана",
        "count_sl": 5
    },
    {
        "id": 4,
        "name": "Майонез",
        "count_sl": 3
    },
    {
        "id": 5,
        "name": "Мука пшенична",
        "count_sl": 6
    },
    {
        "id": 6,
        "name": "Сіль",
        "count_chl": 1
    },
    {
        "id": 7,
        "name": "Розпушувач тіста",
        "count_chl": 2
    },
    {
        "id": 8,
        "name": "Кріп",
        "count_pch": 0.5
    },
    {
        "id": 9,
        "name": "Кунжут"
    }
];
let steps = [
    {"text": "Капусту нашаткувати, посолити і злегка пом'яти."},
    {"text": "Додати дрібно нарізану зелень."},
    {"text": "Яйця збити в однорідну масу."},
    {"text": "Додати інші інгредієнти і замісити тісто."},
    {"text": "Форму змастити вершковим маслом і викласти в неї капусту."},
    {"text": "Залити тестом і посипати зверху кунжутом."},
    {"text": "Поставити форму в розігріту до 180 ° С духовку, випікати 30 хвилин до утворення золотистої скоринки."}
];
let photo = "http://www.povarenok.ru/data/cache/2013may/09/34/153456_37464-300x0.jpg";
let index = "api";
let type = "rec";
let id;


let create_new_data = (index, type, name, time, ingredients, steps, photo) => {
    /**
     * name - string
     * time - string в форматі {мін час}-{макс час]-{одиниця виміру} - "20-40-хв"
     * ingredients - array - масив об'єктів, кожний об'єкт містить:
     *      id - number
     *      name - string
     *      {count,count_sl,count_chl,weight}
     * steps - array - масив об'єктів, кожний з яких містить:
     *      text - string
     *      photo - string, якщо потрібно
     * photo - string
     */

    let client = new elasticsearch.Client({
        host: 'https://brkq6d2mdf:lkpd33eabr@first-cluster-3390890112.eu-central-1.bonsaisearch.net',
    });
    let flag = false;
    if (typeof name !== "string") {
        console.log("Невірний формат назви страви...");
        flag = 1;
    }
    ;
    if (!(/(-(([A-Za-z]{1,3})|([а-яА-Яіїщ]{1,3})))$/g.test(time))) {
        console.log("Невірний формат часу....");
        flag = true;
    }
    if (!Array.isArray(ingredients)) {
        console.log("Невірний формат інгрідієнтів...");
        flag = true;
    } else {
        ingredients.forEach(function (item, i) {
            if (typeof item.id !== "number") {
                console.log("Невірний формат id " + i + " інгрудієнта");
                flag = true
            }
            if (typeof item.name !== "string") {
                console.log("Невірний формат name " + i + " інгрудієнта");
                flag = true
            }
        });
    }

    if (flag) {
        return false
    };
/*Знаходим найбільший ід*/
    client.search({
        index: index,
        type: type,
        body: {
            "sort": [{"created_at": "desc"}]
        },
        size: 1
    }).then(function (resp) {
        if (resp.hits.hits[0] !== undefined) {
            id = Number(resp.hits.hits[0]._id) + 1;
        } else {
            console.log(2)
            id = 1;
        }

        client.create({
            index: index,
            type: type,
            id: id,
            body: {
                name,
                "time": {
                    "min": time.split("-")[0],
                    "max": time.split("-")[1],
                    "time_stamp": time.split("-")[2]
                },
                ingredients,
                steps,
                photo,
                "created_at": new Date()
            }

        }, function (error, response) {
            if (error) {
                console.log("Error --> " + error);
            } else {
                console.log("Response --> " + response);
            }
        });
    }, function (err) {
        console.trace(err.message);
    });


};

let create_new_ingredients = (index, type, name) => {
    let client = new elasticsearch.Client({
        host: 'https://brkq6d2mdf:lkpd33eabr@first-cluster-3390890112.eu-central-1.bonsaisearch.net',
    });

    client.search({
        index: index,
        type: type,
        body: {
            "sort": [{"created_at": "desc"}]
        },
        size: 1
    }).then(function (resp) {
        if (resp.hits.hits[0] !== undefined) {
            id = Number(resp.hits.hits[0]._id) + 1;
        } else {
            id = 1;
        }
        client.create({
            index: index,
            type: type,
            id: id,
            body: {
                name,
                "created_at": new Date()
            }

        }, function (error, response) {
            if (error) {
                console.log("Error --> " + error);
            } else {
                console.log("Response --> " + response);
            }
        });
    }, function (err) {
        console.trace(err.message);
    });


};

let search_data_by_name = async (param, size, page) => {
    let client = new elasticsearch.Client({
        host: 'https://brkq6d2mdf:lkpd33eabr@first-cluster-3390890112.eu-central-1.bonsaisearch.net',
    });

    if (param == undefined) {
        param = {}
    } else {
        param = {

            "match": {
                "name": param
            }

        }
    }

    return await client.search({
        index: 'api',
        type: 'rec',
        body: {
            "query": param
            ,
            "sort": [{"created_at": "desc"}]
        },
        size: size
    }).then(function (resp) {
        return resp.hits;
    }, function (err) {
        console.trace(err.message);
        return false;
    });

};

//search_data();
//create_new_data(index, type, name,time,ing,steps,photo);
//create_new_ingredients(index, type, name);


module.exports = {create_new_data, search_data_by_name, create_new_ingredients};