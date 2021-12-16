$(document).ready(function () {
    $("#btn").click(function () { //when "calculate" button is clicked
        $(".container-2").fadeIn(500); //.container-2 fades in only on first click 
        if ($("#user-wealth").length) { $("#user-wealth").fadeIn(1000); } //#user-wealth fades in if element text is loaded
        if ($("#user-rank").length) { $("#user-rank").delay(1000).fadeIn(1000); } //#user-rank fades in if element text is loaded
    });
});

$(document).ready(function () {
    $("#btn").click(function () { //when "calculate" button is clicked
        if (($("#user-wealth").css("display") == "block") //if #user-wealth
        && ($("#user-rank").css("display") == "block")) { //and #user-rank are showing
            $("#user-wealth").css("display", "none"); //hide
            $("#user-rank").css("display", "none"); //them
        }
        if ($("#user-wealth").length) { $("#user-wealth").fadeIn(1000); } //#user-wealth fades in if element text is loaded
        if ($("#user-rank").length) { $("#user-rank").delay(1000).fadeIn(1000); } //#user-rank fades in if element text is loaded
    });
});