
function calcTime(offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return nd = new Date(utc + (3600000*offset));
}

function addZero(num) {
    if (num < 10) { 
        return "0" + String(num);
    }else {
        return String(num);
    }
}

function AMorPM(h) {
    return (h < 12) ? "AM" : "PM"; 
}

function Hour(h) {
    var hour = h % 12;
    if (hour == 0) { 
        hour = 12; 
    }
    return String(hour)
}


function displayDigitalTime(){
    var chooseCountry = document.getElementById('selectCountry');
    var countryOptions = chooseCountry.options[chooseCountry.selectedIndex];
    var customImageurl = "Images/Flags/";

    var now = calcTime(countryOptions.id);
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var year = now.getUTCFullYear();
    var month = now.getUTCMonth();
    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", 
                    "Saturday" ];
    var days = weekDays[now.getUTCDay()];

    var day = now.getUTCDate();

    var dayDate = day + "/" + month + "/" + year;
    var timeString = Hour(h) + ":" + addZero(m) + ":" + addZero(s) + " " + AMorPM(h);
    document.getElementById('baseId').innerHTML = days + " " + dayDate + "<br/> " + timeString ;
    document.getElementById('baseClockDescription').innerHTML = countryOptions.text;
    document.getElementById("baseImage").src = customImageurl + countryOptions.value + ".png";
}



    function startOneTimer() {
        setInterval(displayDigitalTime, 1000);
        displayDigitalTime();   
    }
    document.addEventListener('DOMContentLoaded', startOneTimer);
    

