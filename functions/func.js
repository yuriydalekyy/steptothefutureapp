"use strict";

let get_param = (search_req)  => {
    let search_param = {};
    if (search_req !== undefined) {
        search_req.split("&").forEach(function (item) {
            search_param[item.split("=")[0]] = item.split("=")[1]
        });

        if (Number(search_param["type"]) > 2 || Number(search_param["type"]) < 1 || isNaN(Number(search_param["type"]))) {
            search_param["type"] = 0;
        }

        if (Number(search_param["size"]) < 10 || isNaN(Number(search_param["size"]))) {
            search_param["size"] = 10;
        } else {
            if (Number(search_param["size"]) <= 50 && Number(search_param["size"]) % 10 != 0) {
                search_param["size"] = Number(search_param["size"]) - (Number(search_param["size"]) % 10);
            } else {
                if (Number(search_param["size"]) > 50) {
                    search_param["size"] = 50
                }
            }
        }

        if (Number(search_param["page"]) < 1 || isNaN(Number(search_param["page"]))) {
            search_param["page"] = 1;
        } else {
            if (Number(search_param["page"]) > 50) {
                search_param["page"] = 50;
            }
        }

        if (search_param["param"] == undefined){
            search_param["param"] = "які ми ще не визначили";
        }
    } else {
        search_param["size"]=10;
        search_param["page"]=1;
        search_param["type"]=0;
        search_param["param"]="які ми ще не визначили";
    }

    return search_param;
};

let req_to_db = (type, size, page, param) => {
    let rez = "Пошук "+ type_param[type] + " по параметрах "+param+" на сторінці "+page+" по "+size+" на сторіці";
    return rez;
}

const type_param = {
    0:"не визначено",
    1:"за інгрідієнтами",
    2:"по назві"
}

module.exports = {get_param,req_to_db};