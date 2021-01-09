let karts = document.getElementsByClassName("kartis");
let kartites = [...karts];
let gajieni = 0;
let gajienu_sk = document.querySelector(".gaj");
let vienadi = document.getElementsByClassName("match");

const deck = document.getElementById("card-deck");

var atvertas = [];
var second = 0, minute = 0, hour = 0;
var taimeris = document.querySelector(".timer");
var intervals;

window.onload = function(){
    document.getElementById("close").onclick = function(){
        this.parentElement.style.display = "none";
    };
};


//Spēles funkcionalitāte
var paradit = function(){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function generet() {

    var x = document.getElementById("izmers").value;
    var array = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
        "10", "11", "12", "13", "14", "15", "16", "17", "18"];

    if (x < 6) {
        var temp = [];
        for(var i = 0; i < x*x/2; i++){
            var a = Math.floor(Math.random()*array.length);
            temp.push(array[a]);
            array.splice(a, 1);
        }
        array = temp;
    }
    
    var array2 = array.slice(0);

    var ul = document.createElement('ul');
    ul.setAttribute("class", "deck");
    ul.setAttribute("id", "card-deck");
    
    for (let j = 0; j < x*x; j++) {
        var li = document.createElement('li');
        li.setAttribute("class", "kartis");

        if (array.length !== 0) {
            var a = Math.floor(Math.random() * array.length);
            li.setAttribute("type", array[a]);
            array.splice(a, 1);
        } else {
            var a = Math.floor(Math.random() * array2.length);
            li.setAttribute("type", array2[a]);
            array2.splice(a, 1);
        }
        
        li.addEventListener("click", paradit);
        li.addEventListener("click", atvert);
        li.addEventListener("click", uzvara);
        
        if(x == 2){
             li.style.width = "210px";
             li.style.height = "210px";
        } else if (x == 4){
             li.style.width = "100px";
             li.style.height = "100px";
        } else {
             li.style.width = "65px";
             li.style.height = "65px";
        }
       
        
        ul.appendChild(li);
    }   
    
    document.getElementById("spele").appendChild(ul); 
    karts = document.getElementsByClassName("kartis");
    kartites = [...karts]; 
}

function samaisit(masivs) {
    var currentIndex = masivs.length, temp, ind;

    while (currentIndex !== 0) {
        ind = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temp = masivs[currentIndex];
        masivs[currentIndex] = masivs[ind];
        masivs[ind] = temp;
    }
    return masivs;
}

function saktSpeli() {
    var r = document.getElementById("card-deck");
    
    if (r !== null) {
        var t = document.getElementById("spele");
        t.removeChild(r);
        
        var x = document.getElementById("uzv").style.display;
        if(x === "block"){
            document.getElementById("uzv").style.display = "none";
        }
    }
    
    if(document.getElementById("izmers").value >= 2 && document.getElementById("izmers").value <= 6) {
        generet();
        samaisit(kartites);

        gajieni = 0;
        gajienu_sk.innerHTML = gajieni;

        second = 0;
        minute = 0;
        hour = 0;
        taimeris.innerHTML = hour + "h " + minute + "m " + second + "s";
        clearInterval(intervals);
    } else {
        alert("Nepareizi ievadīts laukuma izmērs! Tam jābūt 2, 4 vai 6");
    }
     
}

function atvert() {
    atvertas.push(this);
    this.innerHTML = this.type;
    var len = atvertas.length;

    if (len === 2) {
        skaititajs();
        if (atvertas[0].type === atvertas[1].type) {
            vienadas();
        } else {
            dazadas();
        }
    }
}

function vienadas() {
    atvertas[0].classList.add("match", "disabled");
    atvertas[1].classList.add("match", "disabled");
    atvertas[0].classList.remove("show", "open", "no-event");
    atvertas[1].classList.remove("show", "open", "no-event");
    atvertas = [];
}

function dazadas() {
    atvertas[0].classList.add("unmatched");
    atvertas[1].classList.add("unmatched");
    izslegt();

    setTimeout(function () {
        atvertas[0].classList.remove("show", "open", "no-event", "unmatched");
        atvertas[1].classList.remove("show", "open", "no-event", "unmatched");
        ieslegt();
        atvertas = [];
    }, 1000);
}

function izslegt() {
    Array.prototype.filter.call(kartites, function (karts) {
        karts.classList.add('disabled');
    });
}

function ieslegt() {
    Array.prototype.filter.call(kartites, function (karts) {
        karts.classList.remove('disabled');
        for (var i = 0; i < vienadi.length; i++) {
            vienadi[i].classList.add("disabled");
        }
    });
}


//Spēlētāja rādītāji
function skaititajs() {
    gajieni++;
    gajienu_sk.innerHTML = gajieni;

    if (gajieni === 1) {
        second = 0;
        minute = 0;
        hour = 0;
        laiks();
    }
}

function laiks() {
    intervals = setInterval(function() {
        taimeris.innerHTML = hour + "h " + minute + "m " + second + "s";
        second++;
        if (second === 60) {
            minute++;
            second = 0;
        }
        if (minute === 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


//Uzvaras noteikšana
function uzvara() {
    if (vienadi.length === kartites.length) {
        clearInterval(intervals);
        kop_laiks = taimeris.innerHTML;

        document.getElementById("uzv").style.display = "block";
        document.getElementById("kop_sk").innerHTML = gajieni;
        document.getElementById("kop_l").innerHTML = kop_laiks;
    }
}


//Lauku validācija
function inputval(){ 
    var burti = /^[a-zA-Z]+$/;
    
    if(!document.form1.vards.value.match(burti)){
        alert('Laukā "Vārds" drīkst būt ievadīti tikai lielie un mazie burti!');
        return false;
    }
    
    if (!document.form1.uzvards.value.match(burti)){
        alert('Laukā "Uzvārds" drīkst būt ievadīti tikai lielie un mazie burti!');
        return false;
    }
    
    if (isNaN(parseInt(document.form1.vecums.value)) || document.form1.vecums.value < 0 || document.form1.vecums.value > 100){
        alert('Laukā "Vecums" drīkst būt ievadīti skaitļi no 0 līdz 100');
        return false;
    }
    
    if (!DateValid(document.form1.datums.value)) {
        alert('Laukā "Datums" ir jāievada pareizs datums!');
        return false;
    }
    
    alert('Jūsu ievadītā informācija ir reģistrēta!');
    return true;
}

function DateValid(d){
    if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(d)) {
        return false;
    }

    var x = d.split("-");
    var year_x = parseInt(x[0], 10);
    var month_x = parseInt(x[1], 10);
    var day_x = parseInt(x[2], 10);
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year_x % 400 === 0 || (year_x % 100 !== 0 && year_x % 4 === 0))
        monthLength[1] = 29;

    if (year_x < 2020) {
        return false;
    } else if (month_x > 12 || month_x <= 0) {
        return false;
    } else if (day_x <= 0 || day_x > monthLength[month_x - 1]) {
        return false;
    } else
        return true;
}
