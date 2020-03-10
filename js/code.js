let karts = document.getElementsByClassName("kartis");
let kartites = [...karts];
let gajieni = 0;
let gajienu_sk = document.querySelector(".gaj");
let vienadas = document.getElementsByClassName("match");

var atvertas = [];
var second = 0, minute = 0, hour = 0;
var taimeris = document.querySelector(".timer");
var intervals;

var paradit = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
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
    atvertas = [];
    kartites = shuffle(kartites);

    for (var i = 0; i < kartites.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(kartites, function (item) {
            deck.appendChild(item);
        });
        kartites[i].classList.remove("show", "open", "match", "disabled");
    }

    gajieni = 0;
    gajienu_sk.innerHTML = gajieni;

    second = 0;
    minute = 0;
    hour = 0;
    taimeris.innerHTML = hour + "h " + minute + "m " + second + "s";
    clearInterval(intervals);


}

function generet() {
    var x = document.getElementById("izmers").value;
    var array = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
        "10", "11", "12", "13", "14", "15", "16", "17", "18"];

    if (x < 6) {
        var temp = [];
        var z = x*x;
        for(let y = 0; y < x*x; y++){
            var a = Math.floor(Math.random()*z);
            temp.push(array[a]);
            array.pop(a);
            z -= 1;
        }
        array = temp;
    }
    
    var array2 = array;

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < x; j++) {
            
        }
    }
}

function atvert() {
    atvertas.push(this);
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
    }, 1100);
}

function izslegt() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}

function ieslegt() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
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
    intervals = setInterval(function () {
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
    if (vienadas.length == 16) {
        clearInterval(intervals);
        kop_laiks = taimeris.innerHTML;

        document.getElementById("uzlec").style.display = "block";
        document.getElementById("kop_sk").innerHTML = moves;
        document.getElementById("kop_l").innerHTML = kop_laiks;
    }
}

for (var i = 0; i < kartites.length; i++) {
    karts = kartites[i];
    karts.addEventListener("click", paradit);
    karts.addEventListener("click", atvert);
    karts.addEventListener("click", uzvara);
}
