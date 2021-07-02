let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'
let keyword;
let plainText;
let plainTextDigraph = [];
let keys = []
let table; //Keys form the 5x5 Table
let encryptedText = [];
let decryptedText = [];
let encryption;

//Aesthetic shit
let light=0; //the number of glowing table based on the length of the formatted keyword
let plainTextFormatted;

document.querySelector("#encrypt-btn").addEventListener('click',function(){
    encryption = true;
    keyword = document.querySelector('#key-text').value;
    plainText = document.getElementById('input-text').value;
    buttonAnimation(this);
    sequence();
    document.querySelector("#output-text").value = outputDigraph(encryptedText);
    document.querySelector("#input-text").value = outputDigraph(plainTextFormatted);
    document.querySelector("#key-text").value = keyword;
    
});

document.querySelector("#decrypt-btn").addEventListener('click',function(){
    encryption = false;
    keyword = document.querySelector('#key-text').value;
    plainText = document.getElementById('input-text').value;
    buttonAnimation(this);
    // alert();
    sequence();
    document.querySelector("#output-text").value = outputDigraph(decryptedText);
    
});


function sequence(){
     //empty the arrays before repeating the process again
    encryptedText = [];
    plainTextDigraph = [];
    keys = [];
    table = [];
    encryptedText = [];
    decryptedText = [];
    light=0;

    keywordEntry();
    alphabetsEntry();
    table = listToMatrix(keys,5);
    digraphInputText();

    if(encryption === true){
        encryptText();
    }else{
        decryptText();
    }

    displayTable();
}


function digraphInputText(){

    plainTextFormatted = []
    let i = 0; 
    let position = 0;

    plainText = plainText.toUpperCase();
    plainText = plainText.replace('J', 'I');
    plainText = plainText.replace(/[^a-zA-Z ]/g, '');
    plainText = plainText.replace(/\s/g, ''); //Removes spaces

    //Inserting Xs
    while(i<plainText.length){
        if(plainText[i] === plainText[i-1] && position === 1){
            plainTextFormatted.push('X');
        }else{
            if(position > 0){position--;}
            else{position++;}
        }
        plainTextFormatted.push(plainText[i]);

        i++;        
    }

    if(plainTextFormatted.length % 2 === 1){
        plainTextFormatted.push('X');
    }

    plainTextDigraph = listToMatrix(plainTextFormatted,2); 
}

function keywordEntry(){
    let duplication = false;

    keyword = keyword.toUpperCase();
    keyword = keyword.replace('J', 'I');
    keyword = keyword.replace(/[^a-zA-Z ]/g, '');
    keyword = keyword.replace(/\s/g, ''); //No spaces

    keys[0] = keyword[0];
    for(let i =1; i < keyword.length; i++){

        for(let j = 0; j < i; j++){
            if(keyword[i] === keyword[j]){
                duplication = true;
            }
        }

        if(duplication === false){
            keys.push(keyword[i]);
            light++; //
        }
        duplication = false;
    }
}

function alphabetsEntry(){
    let duplication = false;
    for(let i = 0; i < alphabet.length; i++){
        for(let j= 0; j < keys.length; j++){
            if(alphabet[i] === keys[j]){
                duplication = true;
            }
        }

        if(duplication === false){
            keys.push(alphabet[i]) ;
        }
        duplication = false;
    }
}

function listToMatrix(list, elementsPerSubArray) {
    let matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }
    return matrix;
}

function getRow(letter){
    for(let i = 0; i < table.length; i++){
        for(let j=0; j < table.length; j++){
            if(letter === table[i][j]){
                return i;
            }
        }
    }
}

function getColumn(letter){
    for(let i = 0; i < table.length; i++){
        for(let j=0; j < table.length; j++){
            if(letter === table[i][j]){
                return j;
            }
        }
    }
}

function encryptText(){
  for(let i=0, k=0; i<plainTextDigraph.length; i++){
    let column1 = getColumn(plainTextDigraph[i][k]);
    let column2 = getColumn(plainTextDigraph[i][k+1]);
    let row1 = getRow(plainTextDigraph[i][k]);
    let row2 = getRow(plainTextDigraph[i][k+1]);

    if(column1 === column2){
        row1++;
        row2++;
        if(row1>4){row1=0}
        if(row2>4){row2=0}
        encryptedText.push(table[row1][column1]);
        encryptedText.push(table[row2][column2]);
    }else if(row1 === row2){
        column1++;
        column2++;
        if(column1>4){column1=0}
        if(column2>4){column2=0}
        encryptedText.push(table[row1][column1]);
        encryptedText.push(table[row2][column2]);
    }else{
        let temp = column1;
        column1 = column2;
        column2 = temp;

        encryptedText.push(table[row1][column1]);
        encryptedText.push(table[row2][column2]);
    }
  }
}

function decryptText(){

  for(let i=0, k=0; i<plainTextDigraph.length; i++){
    let column1 = getColumn(plainTextDigraph[i][k]);
    let column2 = getColumn(plainTextDigraph[i][k+1]);
    let row1 = getRow(plainTextDigraph[i][k]);
    let row2 = getRow(plainTextDigraph[i][k+1]);

    if(column1 === column2){
        row1--;
        row2--;
        if(row1<0){row1=4}
        if(row2<0){row2=4}
        decryptedText.push(table[row1][column1]);
        decryptedText.push(table[row2][column2]);
    }else if(row1 === row2){
        column1--;
        column2--;
        if(column1<0){column1=4}
        if(column2<0){column2=4}
        decryptedText.push(table[row1][column1]);
        decryptedText.push(table[row2][column2]);
    }else{
        let temp = column1;
        column1 = column2;
        column2 = temp;

        decryptedText.push(table[row1][column1]);
        decryptedText.push(table[row2][column2]);
    }
  }
}


function outputDigraph(value){ //6
    let x = listToMatrix(value,2);
    let output = [];
    for(let i =0; i<x.length; i++){
        x[i].push(' ');
    }
    for(let j = 0; j < x.length; j++){
        for(let k =0; k< 3; k++){
            output.push(x[j][k]);
        }
    }

    return output.join('');
}

//DOM Functions

function displayTable(){ 
    let tableDisplay = document.querySelectorAll('.table');
    let x = 0;
    for(let i = 0; i < tableDisplay.length; i++){
        if(i>0 && i%5 === 0){
            x++;
        }
        tableDisplay[i].innerText = table[x][i%5]
    }
    //AE
    for(let i=0; i<=light;i++){
        tableDisplay[i].classList.add('table-animation');
    }
    setTimeout(function(){
        for(let i=0; i<=light;i++){
            tableDisplay[i].classList.remove('table-animation');
        }
    }, 200);
    //AE
}

function buttonAnimation(btn){
    btn.classList.add("pressed");

    setTimeout(function(){
        btn.classList.remove("pressed");
    }, 70);
}

function lettersOnly(input){
    let regex = /[^a-z \s]/gi;
    input.value = input.value.replace(regex,'');
}