$(document).ready(function () {
    $("#btn").click(function () {
        $(".container-2").fadeIn(500);
        if ($("#user-wealth").length) { $("#user-wealth").fadeIn(1500); }
        if ($("#user-rank").length) { $("#user-rank").delay(1500).fadeIn(1500); }
    });
});


$(document).ready(function () {
    $("#btn").click(function () {
        if (($("#user-wealth").css("display") == "block") && ($("#user-rank").css("display") == "block")) {
            $("#user-wealth").css("display", "none");
            $("#user-rank").css("display", "none");
        }
        if ($("#user-wealth").length) { $("#user-wealth").fadeIn(1500); }
        if ($("#user-rank").length) { $("#user-rank").delay(1500).fadeIn(1500); }
    });
});