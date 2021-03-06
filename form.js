// import jquery
src="https://code.jquery.com/jquery-3.4.1.js"
integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
crossorigin="anonymous"

// form submission jquery code that we stole
function SubForm (){
    $.ajax({
        url:'https://api.apispreadsheets.com/data/15990/',
        type:'post',
        data:$("#myForm").serializeArray(),
        success: function(){
            alert("Form Data Submitted :)")
        },
        error: function(){
            alert("There was an error :(")
        }
    });
}

// saves "fullName" locally so that we can use it for the certificate later 
function SaveName(){
    var inputName= document.getElementById("fullName");
    sessionStorage.setItem("fullName", inputName.value);
}

// will make the fullName show up when you hit the button
const listen = event => {
        const p = document.createElement('p');
        
        var storedValue = sessionStorage.getItem("fullName");
        p.innerText = storedValue;
        document.querySelector('#container').appendChild(p);
}

// initialize the canvas
window.onload = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "30px Verdana";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Your certificate will show up here!", 550, 50);
}

// make the small certificate show up on the webpage
function DrawCanvas(){
    var storedValue = sessionStorage.getItem("fullName");
    if (storedValue == null) alert('You have not submitted your name to the payload yet! Please fill out the form and click the "Send your name and message to the ISS!" button before generating your certificate!');
    else {
        window.onclick = function() {
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            
            img.onload = function() {
                ctx.drawImage(img, 0, 0, 1100, 850);
                ctx.font = "30px Verdana";
                ctx.textAlign = "center";
                ctx.fillStyle = "black";
                ctx.fillText(storedValue, 550, 425);
            }
            img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Escargato.png/1600px-Escargato.png';
        }
    }
}

// make the large certificate for downloading
function DrawCanvas2(){
    var storedValue = sessionStorage.getItem("fullName");
    window.onclick = function() {
        var c = document.getElementById("myCanvas2");
        var ctx = c.getContext("2d");
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = function() {
            ctx.drawImage(img, 10, 10, 4400, 3300);
            ctx.font = "120px Verdana";
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.fillText(storedValue, 2200, 1700);

            var dataUrl = String(c.toDataURL());
            sessionStorage.setItem("storedURL", dataUrl);
        }
        img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Escargato.png/1600px-Escargato.png';
    }
}

// save the certificate
function save2() {
    var dataUrl = sessionStorage.getItem("storedURL");

    if (dataUrl == null) alert('You have not generated your certificate yet. Please click on the "Generate your certificate!" button and then press the "Save your certificate!" button afterwards.');
    else {
        var a  = document.createElement('a');
        a.href = dataUrl;
        a.download = 'image.png';

        a.click()
    }
    
}
