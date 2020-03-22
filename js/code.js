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

var paradit = function(){
    console.log("paradit")
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    console.log(this.classList)
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
             li.style.width = "275px";
             li.style.height = "275px";
        } else if (x == 4){
             li.style.width = "135px";
             li.style.height = "135px";
        } else {
             li.style.width = "80px";
             li.style.height = "80px";
        }
       
        
        ul.appendChild(li);
    }   
    
    document.getElementById('div').appendChild(ul); 
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
    
    if (r != null) {
        var t = document.getElementById('div');
        t.removeChild(r);
        
        var x = document.getElementById('uzv').style.display;
        if(x == "block"){
            document.getElementById('uzv').style.display = "none";
        }
    }
    
    generet();
    samaisit(kartites);

    gajieni = 0;
    gajienu_sk.innerHTML = gajieni;

    second = 0;
    minute = 0;
    hour = 0;
    taimeris.innerHTML = hour + "h " + minute + "m " + second + "s";
    clearInterval(intervals);
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

function skaititajs() {
    gajieni++;
    gajienu_sk.innerHTML = gajieni;

    if (gajieni == 1) {
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
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function uzvara() {
    if (vienadi.length == kartites.length) {
        clearInterval(intervals);
        kop_laiks = taimeris.innerHTML;

        document.getElementById("uzv").style.display = "block";
        document.getElementById("kop_sk").innerHTML = gajieni;
        document.getElementById("kop_l").innerHTML = kop_laiks;
    }
}
