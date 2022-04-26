
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

function amOrPm(h) {
    return (h < 12) ? "AM" : "PM"; 
}

function hour(h) {
    var hour = h % 12;
    if (hour == 0) { 
        hour = 12; 
    }
    return String(hour)
}
function loopTime() {
    var clockOffsets = ["0", "3", "10", "1", "-4", "-3"];
    for (i = 0; i <= clockOffsets.length; i++) {

    var describe = 'clockDescription' + i;
    var now = calcTime(clockOffsets[i]);
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    var d = new Date();
    var year = now.getUTCFullYear();
    var month = now.getUTCMonth();
    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", 
                    "Saturday" ];
    var days = weekDays[now.getUTCDay()];

    var day = now.getUTCDate();

    var dayDate = day + "/" + month + "/" + year;
    var timeString = hour(h) + ":" + addZero(m) + ":" + addZero(s) + " " + amOrPm(h);
    document.getElementById(clockOffsets[i]).innerHTML = days + " " + dayDate + "<br/> " + timeString ;

      
    }
}

function loopAllTime () {
        setInterval(loopTime, 1000);
        loopTime();
}

document.addEventListener('DOMContentLoaded', loopAllTime);

    
/***************************************************************** */

function displayTime(clockId, offset) {

    // --- Analog clock ---//
    const radianValue = Math.PI/180;
    const radiusSize = 75;
    const secondHandLength = radiusSize * 0.9;
    const minuteHandLength = radiusSize * 0.7;
    const hourHandLength = radiusSize * 0.5;
    var cx;
    var cy;
    var canvas;
    var context;
    var _animationFrame;
    var _startTime;
 
    function loop(time) {
        var diffTime = Math.abs(time - _startTime);
        if(diffTime >= 1000)
        {
            update();
            _startTime = time;
        }
 
        _animationFrame(loop);
    }
    // draw line from {x1, y1} to {x2,y2}
    function drawLine(x1,y1,x2,y2,lineWidth,color){
 
        context.save();
        context.lineWidth = lineWidth;
        if(color)
            context.strokeStyle = color;
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2, y2);
        context.closePath();
        context.stroke();
        context.restore();
    }
    // draw circle with the center at {cx, cy}
    function drawCircle(cx,cy,radius){
        context.beginPath();
        context.arc(cx,cy, radius, 0, Math.PI*2, true);
        context.closePath();
        context.fill();
    }
 
    function update(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Display Numbers
        drawCircle(cx,cy,4);
        for(var i=0;i<60;i++){
            var angle = 6*i*radianValue;
            var x = cx + Math.cos(angle)*radiusSize;
            var y = cy + Math.sin(angle)*radiusSize;
            var radius = 1;
            if(i%5==0)
            {
                radius = 3;
                var hour = (i/5+3)%12;
                if(hour == 0)
                    hour = 12;
 
                // text width
                var tw = context.measureText(hour).width;
                // text location
                var tx = cx + Math.cos(angle)*secondHandLength-tw/2;
                var ty = cy + Math.sin(angle)*secondHandLength+6;
                context.fillText(hour,tx,ty);
            }
 
            drawCircle(x,y,radius);
        }
 
        // Draw clock hands 
 
        var now = calcTime(offset);
        //var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
 
        // Draw second hand
        var angle = radianValue*seconds*6;
        var x = cx + Math.sin(angle)*secondHandLength;
        var y = cx - Math.cos(angle)*secondHandLength;
        drawLine(cx,cy,x,y,1);
 
        // Draw minute hand
        angle = radianValue*minutes*6;
        x = cx + Math.sin(angle)*minuteHandLength;
        y = cx - Math.cos(angle)*minuteHandLength;
        drawLine(cx,cy,x,y,2,"blue");
 
        // Draw hour hand
        angle = radianValue * (hours+minutes/60)*30;
        x = cx + Math.sin(angle)*hourHandLength;
        y = cx - Math.cos(angle)*hourHandLength;
        drawLine(cx,cy,x,y,4,"#900000");
    }
    
    
    canvas = document.getElementById(clockId);
    context = canvas.getContext("2d");

    context.font = "14px Arial";
    cx = canvas.width/2;
    cy = canvas.height/2;
    _animationFrame = window.requestAnimationFrame  ||
                window.mozRequestAnimationFrame     ||
                window.webkitRequestAnimationFrame  ||
                window.msRequestAnimationFrame      ||
                window.oRequestAnimationFrame       ;
 
    if(_animationFrame){
        _startTime = Date.now();
        _animationFrame(loop);
    } else
        alert("Your browser don't support requestAnimationFrame.");
}


function callTimer(clockId, offset) {
    function startTimer() {
        setInterval(displayTime(clockId, offset), 1000);
        displayTime(clockId, offset);
    }
    document.addEventListener('DOMContentLoaded', startTimer);
}


callTimer('clockCanvas0', 0);
callTimer('clockCanvas1', 3);
callTimer('clockCanvas2', 10);
callTimer('clockCanvas3', 1);
callTimer('clockCanvas4', -4);
callTimer('clockCanvas5', -3);



