let {file} = require("./file");

let obj = {
    fileName:"demo",//项目名称
    type:"dir",//文件类型
    children:[
        {
            fileName:"build",
            type:"dir",
            children:[]
        },
        {
            fileName:"config",
            type:"dir",
            children:[]
        },
        {
            fileName:"src",
            type:"dir",
            children:[
                {
                    fileName:"assets",
                    type:"dir",
                    children:[]
                },
                {
                    fileName:"components",
                    type:"dir",
                    children:[]
                },
                {
                    fileName:"Config",
                    type:"dir",
                    children:[]
                },
                {
                    fileName:"router",
                    type:"dir",
                    children:[]
                },
                {
                    fileName:"store",
                    type:"dir",
                    children:[]
                },
                {
                    fileName:"App.vue",
                    type:"file",
                    children:[]
                },
            ]
        },
        {
            fileName:"static",
            type:"dir",
            children:[]
        },
        {
            fileName:"index.html",
            type:"file",
            children:[]
        },
        {
            fileName:"package.json",
            type:"file",
            children:[]
        },
    ]
};

file(obj);