window.onload=function (){


    var body = document.getElementById("displays");

    var list = ["/clock-cat.html","/clock-circles.html","/clock-diagonal.html","/clock-floating.html","/clock-gradient.html","/clock.html","/clock-squares.html","/clock-wave-bottom.html","/clock-wave.html"];
    body.innerHTML ="";
    for(l in list){
        console.log(list[l]);

        body.innerHTML += "<div class=\"clock\">\n" +
            "            <iframe src=\""+list[l]+"\" ></iframe>\n" +
            "            <button onclick=\"window.location.href='"+list[l]+"'\">Preview</button>\n" +
            "            <button onclick=\"window.location.href='/selectpie"+list[l]+"'\">Set on Pie</button>\n" +

            "        </div>"
    }

    var update_logs = (text) =>{
        logs_div.innerHTML = "<code>"+text+"</code>";
        logs_div.scrollTop = logs_div.scrollHeight;
    };

    var get_info = (type) =>{
        if(type){
            last_gotten = type;
        }
        if(last_gotten === null){
            last_gotten = "t";
        }
        httpGetAsync("/info/"+last_gotten,(text)=>{
            update_logs(JSON.parse(text).result);
            if(loop_duration !== 0){
                setTimeout(get_info,loop_duration*1000);
            }
        });
    };

    var get_top = document.getElementById("get_top");
    var get_disk = document.getElementById("get_disk");
    var get_temp = document.getElementById("get_temp");
    var get_all = document.getElementById("get_all");

    var loop_one = document.getElementById("loop_one");
    var loop_five = document.getElementById("loop_five");

    var logs_div = document.getElementById("results");

    var loop_duration = 0;
    var last_gotten = null;

    get_top.onclick = function (){
        get_info("t");
    }
    get_disk.onclick = function (){
        get_info("d");
    }
    get_temp.onclick = function (){
        get_info("c");
    }
    get_all.onclick = function (){
        get_info("a");
    }

    header.onclick = function (){
        window.location.href='/';
    }

    loop_one.onclick = function (){
        if(loop_duration === 1){
            loop_duration = 0;
            loop_one.style.backgroundColor = "darkred";
        }else{
            loop_duration = 1;
            loop_one.style.backgroundColor = "lawngreen";
            loop_five.style.backgroundColor = "darkred";
        }
        get_info();
    }

    loop_five.onclick = function (){
        if(loop_duration === 5){
            loop_duration = 0;
            loop_five.style.backgroundColor = "darkred";
        }else{
            loop_duration = 5;
            loop_one.style.backgroundColor = "darkred";
            loop_five.style.backgroundColor = "lawngreen";
        }
        get_info()
    }

    get_info("c");


};

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

