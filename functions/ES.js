"use strict";

let elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'https://brkq6d2mdf:lkpd33eabr@first-cluster-3390890112.eu-central-1.bonsaisearch.net',
    log: 'trace'
});
let name = "Капустний пиріг";
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
/*client.create({
    index: 'api',
    type: 'rec',
    id: 1,
    body: {
        "name": "Капустний пиріг",
        "time": {
            "min": 40,
            "max": 60,
            "time_stamp_id": 2,
            "time_stamp": "hv"
        },
        "ingredients": [
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
        ],
        "steps": [
            {"text": "Капусту нашаткувати, посолити і злегка пом'яти."},
            {"text": "Додати дрібно нарізану зелень."},
            {"text": "Яйця збити в однорідну масу."},
            {"text": "Додати інші інгредієнти і замісити тісто."},
            {"text": "Форму змастити вершковим маслом і викласти в неї капусту."},
            {"text": "Залити тестом і посипати зверху кунжутом."},
            {"text": "Поставити форму в розігріту до 180 ° С духовку, випікати 30 хвилин до утворення золотистої скоринки."}
        ],
        "photo": "http://www.povarenok.ru/data/cache/2013may/09/34/153456_37464-300x0.jpg"
    }

}, function (error, response) {
    if (error) {
        console.log("Error --> " + error)
    } else {
        console.log("Response --> " + response)
    }
});*/

let create_new_data = (name, time, ingredients, steps, photo) => {
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

    let flag =false;

    if(typeof name !== "string") {
        console.log("Невірний формат назви страви...");
        flag=1;
    };
    if(!(/(-(([A-Za-z]{1,3})|([а-яА-Яіїщ]{1,3})))$/g.test(time))){
        console.log("Невірний формат часу....");
        flag=true;
    }
    if(typeof ingredients !== "object") {
        console.log("Невірний формат інгрідієнтів...");
        flag=true;
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
    }
    client.create({
        index: 'api',
        type: 'rec',
        id: 1,
        body: {
            name,
            "time": {
                "min": time.split("-")[0],
                "max": time.split("-")[1],
                "time_stamp": time.split("-")[2]
            },
            ingredients,
            steps,
            photo
        }

    }, function (error, response) {
        if (error) {
            console.log("Error --> " + error);
        } else {
            console.log("Response --> " + response);
        }
    });
};

create_new_data(name,time,ing,steps,photo);

module.exports = {create_new_data};