window.onload=function (){

    var clock_div = document.getElementById("clock");
    var date_div = document.getElementById("date");


    const update_date = setInterval(function () {
        var today = new Date();
        var day = today.toLocaleDateString("IE", { weekday: 'long' })+' '+(today.getDate() < 10 ? '0'+today.getDate() : today.getDate());
        var month = today.toLocaleDateString("IE", { month: 'long' })+' '+(today.getMonth()+1 < 10 ? '0'+today.getMonth()+1 : today.getMonth()+1);
        var year = today.getFullYear();

        date_div.innerHTML = "<h1>"+day+"</h1>"
            +"<h1>"+month+"</h1>"
            +"<h1>"+year+"</h1>";

        var time = (today.getHours() < 10 ? '0'+today.getHours() : today.getHours())
            +":"
            +(today.getMinutes() < 10 ? '0'+today.getMinutes() : today.getMinutes())
            +":"
            +(today.getSeconds() < 10 ? '0'+today.getSeconds() : today.getSeconds());
        clock_div.innerHTML = "<h1>"+time+"</h1>";
    },1000);



};

