var canvas = document.querySelector("canvas");
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
baseb = 255;
baseg = 0;
baser = 100;
var speedb = baseb / 100;
var speedg = baseg / 100;
var speedr = baser / 100;
var darkness = 0;
var poppy = 0;
var gravMP = 0.02;
function sqr(num) {
    return num * num;   //returns the square value of a number
}
function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';
} unloadScrollBars();
var c = canvas.getContext("2d");
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener("load", function(){
    init();
})
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

); addEventListener("click", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    if (isAiming === false){
    if (physics == 1) {
        gCenter = [mouse.x, mouse.y];
    };
        console.log(mouse);
        for (d = circleArray.length - 1; d > 0; d--) {
            circleArray[d].distance = Math.sqrt(sqr(mouse.x - circleArray[d].x) + sqr(mouse.y - circleArray[d].y));
            if (poppy == 1) {
                if (circleArray[d].radius >= circleArray[d].distance) {
                    circleArray.splice(d, 1);     //praskani kolecek      
                    break;
                }
            }
        }
        if (physics == 0) {
            for (i = 0; i < circleArray.length; i++) {
                var k = (mouse.x - circleArray[i].x) / (mouse.y - circleArray[i].y);
                var v = Math.sqrt(circleArray[i].dx * circleArray[i].dx + circleArray[i].dy * circleArray[i].dy);
                circleArray[i].dy = Math.sqrt((v * v) / (k * k + 1));
                circleArray[i].dx = Math.sqrt((v * v) / (1 / k / k + 1));
                if (circleArray[i].x > mouse.x) {
                    circleArray[i].dx = -Math.sqrt((v * v) / (1 / k / k + 1));
                }
                if (circleArray[i].y > mouse.y) {
                    circleArray[i].dy = -Math.sqrt((v * v) / (k * k + 1));
                }
                if (circleArray[i].x < mouse.x) {
                    circleArray[i].dx = Math.sqrt((v * v) / (1 / k / k + 1));
                }
                if (circleArray[i].y < mouse.y) {
                    circleArray[i].dy = Math.sqrt((v * v) / (k * k + 1));
                }
            }
        }
    } else {
                
                var i = circleArray.length - 1;
                var mouseDist = Math.sqrt(sqr(circleArray[i].y - mouse.y) * sqr(circleArray[i].x - mouse.x));
                var k = (mouse.x - circleArray[i].x) / (mouse.y - circleArray[i].y);
                var v = Math.sqrt(Math.sqrt(mouseDist / 100) /*Change these ones to change speed modifier*/ + Math.sqrt(mouseDist / 100));
                console.log(k);
                console.log(v);
                circleArray[i].dy = Math.sqrt((v * v) / (k * k + 1));
                circleArray[i].dx = Math.sqrt((v * v) / (1 / k / k + 1));
                if (circleArray[i].x > mouse.x) {
                    circleArray[i].dx = -Math.sqrt((v * v) / (1 / k / k + 1));
                    console.log(circleArray[i].dx);
                }
                if (circleArray[i].y > mouse.y) {
                    circleArray[i].dy = -Math.sqrt((v * v) / (k * k + 1));
                    console.log(circleArray[i].dy);
                }
                if (circleArray[i].x < mouse.x) {
                    circleArray[i].dx = Math.sqrt((v * v) / (1 / k / k + 1));
                    console.log(circleArray[i].dx);
                }
                if (circleArray[i].y < mouse.y) {
                    circleArray[i].dy = Math.sqrt((v * v) / (k * k + 1));
                    console.log(circleArray[i].dy);
                }
        isAiming = false;

    }
})



var gCenter = [window.innerWidth / 2, window.innerHeight / 2];
var barvy = [
   "#330136",
   "#5E1742",
   "#962E40",                //Helouv�n
   "#C9463D",
   "#FF5E35"

 //"#450003",
 //"#5C0002",
 //"#94090D",
 //"#D40D12",                   //Cervene motivy
 //"#FF1D23"

 // "#2D174C",
 // "#261340",
 // "#261340",                 //Fialove motivy
 // "#170B26",
 // "#532A8C"
]
var stuckness = 0;
var borders = 1;
var full = 1;
var shrinky = 0;
var totalMass = 0;
var isAiming = false;


function Circle(x, y, dx, dy, radius, baseradius) {
    this.distance = 0;
    this.x = x;
    this.y = y;
    this.ydif = 0;
    this.xdif = 0;
    this.dx = dx;
    this.dy = dy;
    this.minradius = 5;
    this.radius = radius;
    this.baseradius = baseradius;
    this.g = radius / 100000;
    this.rnd = Math.random()  ; //100;  //Colors
    this.gnd = Math.random()  ; //0;    //Colors
    this.bnd = Math.random() ; //255;  //Colors
    this.a = Math.random();  //Alpha value
    this.shrinking = 0;
    this.color = barvy[Math.floor(Math.random() * barvy.length)];
    this.draw = function () {
                                
        c.beginPath();         //Vykreslí kruh "Arc" na plátno             
        if (this.shrinking == 1 && this.radius >= this.minradius) {
            this.radius--
        } else if (this.radius < this.baseradius && shrinky == 0 && this.shrinking == 2) {
            this.radius++
        }
        if (this.radius <= this.minradius) {
            this.shrinking = 0;
        }
        if (this.radius >= this.baseradius) {
            this.shrinking = 0;
        }
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        if(full == 1){
              c.fillStyle = "rgba(" + this.rnd * baser + "," + this.gnd * baseg + "," + this.bnd  * baseb + "," + this.a + ")"; //Barvy z color pickeru
               // c.fillStyle = this.color  //Barvy z arraye
              c.fill() //Alter between full circles and outlines
        } else {
          c.strokeStyle = "rgba(" + this.rnd * baser + "," + this.gnd * baseg + "," + this.bnd  * baseb + "," + this.a + ")";
        c.stroke();
        } 
      
        
    }
    this.update = function () {
    if(borders == 1){
        if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
    
    
    }
    if (physics == 0) {
        if (this.x - this.radius >= innerWidth) {   //this.x - this.radius <= 0
            this.x = 0 - this.radius;
        } else if (this.x + this.radius <= 0) {
            this.x = window.innerWidth + this.radius;
        }
        if (this.y - this.radius >= innerHeight) {        //this.y - this.radius <= 0
            this.y = 0 - this.radius;
        }
        else if (this.y + this.radius <= 0) {
            this.y = window.innerHeight + radius;
        }
    } else if (physics == 1) {
        let dist = Math.sqrt(Math.pow(gCenter[0] - this.x, 2) + Math.pow(gCenter[1] - this.y, 2));
        this.xdif = gCenter[0] - this.x;
        this.ydif = gCenter[1] - this.y;
        this.dx += this.xdif / dist * gravMP;
        this.dy += this.ydif / dist * gravMP;
    }
        this.x += this.dx;
        this.y += this.dy;
         
        this.draw();
    }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Experimental stuffs
var culors = 1;
var physics = 0;
var timer = 0;
var helpHidden = true;
var commands = [
    "Right Arrow - Increase the speed of currently existing circles",
    "Left Arrow - Decrease the speed of currently existing circles",
    "UpArrow - Increase the size of currently existing circles",
    "DownArrow - Decrease the size of currently existing circles",
    "B - Stop the circles from bouncing off the screen's edge, instead they teleport to the other side!",
    "C - Teleport the circles into some kind of a circle around your cursor",
    "D - The circles now leave a trail behind them (On by default)",
    "E - F*ck the circles, KILL THEM ALL!!!",
    "F - Toggle if the circles are full or just outlines",
    "G - Summon a group of circles (100) at the cursor's location",
    "H - Show or hide this menu",
    "I - Turn the timer and color picker invisible",
    "M - Teleport all circles to the cursors position",
    "N - Summon a single circle at the cursor's location",
    "P - Change the behavior of circles, wherever you click, becomes the center of gravity they're attracted to. If 'B' is active, the circles no longer teleport, they just go off the screen and possibly return later",
    "Q - Clicking on a circle will kill it!",
    "R - Align all circles to the Y level of the cursor",
    "S - Shrink all the circles to the same size!",
    "T - Circles will continually change their color",
    "U - Save the poor stuck circles and throw them back into the middle of the screen!",
    "Most of these are toggles (Off/On), often pressing the button again will disable the feature",
    "",
    "Send your suggestions at hernifea@seznam.cz",
    "Developed by Marek Chwistek"];
document.onkeydown = function (e) {
    
    switch (e.keyCode) {  //detects keypresses
        case 73:
            if (document.getElementById("timer").style.display == "none") { //I
                document.getElementById("timer").style.display = "";
                document.getElementById("pick").style.display = "";
            } else {
                document.getElementById("timer").style.display = "none";
                document.getElementById("pick").style.display = "none";
            }
            break;
        case 79:
            if(timer == 1){timer = 0} else {timer = 1} //Subject to change
            break;
        case 39: for (var x = 0; x < circleArray.length; x++){
            circleArray[x].dx = circleArray[x].dx * 1.1;
            circleArray[x].dy = circleArray[x].dy * 1.1;    //RightArrow
        };
            break;
        case 38: 
            for (var b = 0 ; b < circleArray.length ; b++ ) {
                circleArray[b].radius++;    //UpArrow
            };
            break;
        case 37: for(var x = 0; x < circleArray.length ; x++){
            circleArray[x].dy = circleArray[x].dy / 1.1;  //LeftArrow
            circleArray[x].dx = circleArray[x].dx / 1.1;
        }    
            break;
        case 65: gravMP = prompt("Change the gravity multiplier for physics"); 
        break;
        case 40:
            for (var s = 0 ; s < circleArray.length ; s++) {
                if (circleArray[s].radius > circleArray[s].minradius) {
                    circleArray[s].radius--;  //DownArrow
              }
            };
            break;
        case 77:
            for (var se = 0 ; se < circleArray.length ; se++) {
                circleArray[se].x = mouse.x;    //M
                circleArray[se].y = mouse.y;   
            };
            break;
        case 78:
              circleArray.push(new Circle(mouse.x, mouse.y, 0, 0,20, 20));  //N
              circleArray[circleArray.length - 1].draw();
              isAiming = true;
            break;
        case 70:
              if(full == 1){full = 0} else {full = 1} //F
            break;
        case 83:
            if (shrinky == 1) {
                for (x = 0; x < circleArray.length; x++) {
                    circleArray[x].shrinking = 2;
                }
                shrinky = 0
            } else {
                for (x = 0; x < circleArray.length; x++) {
                    circleArray[x].shrinking = 1;
                }
                shrinky = 1
            }  //S
            break;
        case 82:
            for (x = 0; x < circleArray.length; x++) {  //R
                circleArray[x].y = mouse.y;
            }
            break;
        case 71:
            for (x = 0; x < 100; x++) {
                let rradius = Math.random() * 20 + 1;
              circleArray.push(new Circle(mouse.x, mouse.y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, rradius, rradius)); //G
            }
            break;
        case 66:
            if(borders == 0){borders = 1} else {borders = 0}; //B
        break;
        case 85:
        for(x = 0;x<circleArray.length;x++){
        if(circleArray[x].y + circleArray[x].radius > window.innerHeight || circleArray[x].x + circleArray[x].radius > window.innerWidth || circleArray[x].x - circleArray[x].radius < 0 || circleArray[x].y - circleArray[x].radius < 0){ //U
            circleArray[x].x = window.innerWidth / 2;
            circleArray[x].y = window.innerHeight / 2;
        }
        
    }
        break;
        case 69: circleArray = [];break; //E
        case 80:
            if (physics != 1) { physics = 1; } else {physics = 0}; //P
        break;
        case 72:                        //H
            if (helpHidden == true) {
                document.getElementById("textBox").innerHTML = "";
                for (i = 0; i < commands.length; i++) {
                    document.getElementById("textBox").innerHTML += commands[i] + "<br>";
                }
                helpHidden = false;
            } else {
                helpHidden = true;
                document.getElementById("textBox").innerHTML = "";
            }
        break;
case 68:
		if(clear == 1){clear = 0} else {clear = 1} //D
	break;
        case 67: //C
            for(x = 0; x < circleArray.length; x++){
                switch(x%8){
                    case 1:circleArray[x].x =mouse.x;circleArray[x].y = mouse.y + 150;     break;
                    case 2:circleArray[x].x =mouse.x + 100;circleArray[x].y = mouse.y + 100;     break;
                    case 3:circleArray[x].x =mouse.x + 150;circleArray[x].y = mouse.y;     break;
                    case 4:circleArray[x].x =mouse.x + 100;circleArray[x].y = mouse.y - 100;     break;
                    case 5:circleArray[x].x =mouse.x;circleArray[x].y = mouse.y - 150;     break;
                    case 6:circleArray[x].x =mouse.x - 100;circleArray[x].y = mouse.y - 100;     break;
                    case 7:circleArray[x].x =mouse.x - 150;circleArray[x].y = mouse.y;     break;
                    case 0:circleArray[x].x =mouse.x - 100;circleArray[x].y = mouse.y + 100;     break;
                } 
            }
        case 81:
        if(poppy == 0){poppy = 1} else {poppy = 0}; //Q
        break;
        case 84: //T
        rainbows = 1;
        bufferstring = prompt("Choose a color to flash with(green,red,blue) To turn rainbowing off, input 0");
        switch(bufferstring){
            case "green":rainbowg = Number(prompt("Choose a speed!(Higher is faster)"));break;
            case "red":rainbowr = Number(prompt("Choose a speed!(Higher is faster)"));break;
            case "blue":rainbowb = Number(prompt("Choose a speed!(Higher is faster)"));break;
            case "0": rainbowg = 0;rainbowr = 0;rainbowb = 0;rainbows = 0;alert("Rainbows be no more!");break;
            default: alert("Invalid input");rainbows = 0;break;
        }
    }
       
        //case 38: nocircles++; init();break;
        //case 39: nocircles--; init();break;
    }
var gogo = 0;
var bufferstring = "";
var rainbows = 0;
var rainbowr = 0;
var rainbowb = 0;
var rainbowg = 0;
//    function culorcheck() {
//
//    switch (culors) {
//        case 0: culors = 9; culorcheck();break;
//        case 1: for (i = 0; i < circleArray.length; i++) {
//                circleArray[i].rnd = Math.random() * 100;
//                circleArray[i].gnd = Math.random() * 0;
//                circleArray[i].bnd = Math.random() * 255;
//        }; break;
//        case 9: for (i = 0; i < circleArray.length; i++) {
//            circleArray[i].rnd = Math.random()*255;
//            circleArray[i].gnd = Math.random()*255;
//            circleArray[i].bnd = Math.random()*255;
//        }; break;
//        case 8: for (i = 0; i < circleArray.length; i++) {
//            circleArray[i].rnd = Math.random() * 255;
//            circleArray[i].gnd = Math.random() * 255;
//            circleArray[i].bnd = circleArray[i].rnd;
//        }; break;
//        case 7: for (i = 0; i < circleArray.length; i++) {
//            circleArray[i].rnd = Math.random() * 255;
//            circleArray[i].gnd = circleArray[i].rnd;
//            circleArray[i].bnd = Math.random() * 255;
//        }; break;
//        case 6: for (i = 0; i < circleArray.length; i++) {
//            circleArray[i].rnd = Math.random() * 255;
//            circleArray[i].gnd = Math.random() * 255;
//            circleArray[i].bnd = circleArray[i].gnd;
//        }; break;
//        case 5: for (i = 0; i < circleArray.length; i++) {
//            circleArray[i].rnd = Math.random() * 255;
//            circleArray[i].gnd = circleArray[i].rnd;
//            circleArray[i].bnd = circleArray[i].rnd;
//        }; break;
//        case 4: for (i = 0; i < circleArray.length; i++) {
//            circleArray[i].bnd = Math.random() * 255;
//            circleArray[i].gnd = 0;
//            circleArray[i].rnd = 0;
//        }; break;
//        case 3: for (i = 0; i < circleArray.length; i++) {
//                    circleArray[i].gnd = Math.random() * 255;
//                    circleArray[i].rnd = 0;
//                    circleArray[i].bnd = 0;
//        }; break;
//        case 2: for (i = 0; i < circleArray.length; i++) {
//            circleArray[i].rnd = Math.random() * 255;
//            circleArray[i].gnd = 0;
//            circleArray[i].bnd = 0;
//        }; break;
//        case 10: culors = 1; culorcheck();break;
//    }
// 
//}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var colore = 1;
//document.onkeydown = function (e) {
//    switch (e.keyCode) {
//        case 38: colore++; break;
//        case 40: colore--; break;
//        case 37: switch (colore) {
//            case 1: for (i = 0; i < circleArray.length; i++) {
//                circleArray[i].rnd -= 5
//            }; break;
//            case 2: for (i = 0; i < circleArray.length; i++) {
//                circleArray[i].gnd -= 5
//            }; break;
//            case 3: for (i = 0; i < circleArray.length; i++) {
//                circleArray[i].bnd -= 5
//            }; break;
//        }
//        case 36: switch (colore) {
//            case 1: for (i = 0; i < circleArray.length; i++) {
//                circleArray[i].rnd += 5
//            }; break;
//            case 2: for (i = 0; i < circleArray.length; i++) {
//                circleArray[i].gnd += 5
//            }; break;
//            case 3: for (i = 0; i < circleArray.length; i++) {
//                circleArray[i].bnd += 5
//            }; break;
//        }
//    }
//}


var dirg = 0;
var dirb = 0;
var dirr = 0;

window.setInterval(tensec,10000)

function tensec(){
   
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                document.getElementById("timespent").innerHTML ="Days: " + Math.floor(this.responseText / 86400) +" and "+ new Date(this.responseText * 1000).toISOString().substr(11, 8);
            }
        };
        xmlhttp.open("GET", "timerevent.php", true);
        xmlhttp.send();
    
}


var circleamount = window.innerHeight * window.innerWidth / 2000;
var circleArray = [];
                                                                       
function init() {
    circleArray = [];
    for (var i = 0; i < circleamount; i++) {
        var radius = Math.random() * 20 + 1;
        var baseradius = radius;
        var a = Math.random();
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;                              
        circleArray.push(new Circle(x, y, dx, dy, radius, baseradius));  //Pushne nove kolco

    };
    document.getElementById('body').children[document.getElementById('body').children.length-1].remove()
    console.log("Removed the ad");
}
var clear = 0;
function animate() {
    requestAnimationFrame(animate);
    
    
    if (rainbows == 1){
        if(baseg > 255 || baseg < 0){
            rainbowg = -rainbowg;
        };
        if(baser > 255 || baser < 0){
            rainbowr = -rainbowr;
        };
        if(baseb > 255 || baseb < 0){
            rainbowb = -rainbowb;
        };
        baseg += rainbowg;
        baser += rainbowr;
        baseb += rainbowb;
    }
    if(isAiming === false){
        if(clear == 1) { c.clearRect(0, 0, innerWidth, innerHeight); }
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        }
}
}
tensec();
animate();