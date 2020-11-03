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





};

