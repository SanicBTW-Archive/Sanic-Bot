//Will make the code better whenever I can or something
const inquirer = require('inquirer');
const fs = require('fs');
const clc = require('cli-color');

const askinfortoken = [
    {
        type: 'password',
        name: 'tokenanswer',
        message: 'Please type your bot token: '
    }
]

//Idk why but uhhhhhhhhhhhhhh
var tokenstuff = [
    { token: 'token'}
];

//Really stupid lol
const tokenfields = {
    "token": tokenstuff[0].token
};

const fixedtokenfields = JSON.stringify(tokenfields, null, 4);

try {
    if(!fs.existsSync(__dirname + '/Config/DiscToken.json')){
        console.log(clc.yellow("Looks like you don't have the DiscToken.json file, creating it..."));
        fs.writeFileSync(__dirname + '/Config/DiscToken.json', fixedtokenfields);
        console.log(clc.greenBright("Successfully created DiscToken.json\n"));
    }
} catch (error) {
    console.error(error);
    console.log(clc.red("Couldn't make the missing files"))
}

inquirer.prompt(askinfortoken).then(answers => {
    //Im somehow stupid or something
    const tokenfields = {
        "token": answers.tokenanswer
    };

    const fixedtokenfields = JSON.stringify(tokenfields, null, 4);

    console.log(clc.yellow('Trying to save the token into DiscToken.json...'));
    fs.writeFileSync(__dirname + "/Config/DiscToken.json", fixedtokenfields);
    console.log(clc.greenBright("Saved token in DiscToken.json file inside the config folder"));
});