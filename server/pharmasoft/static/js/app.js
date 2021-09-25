// $(document).ready(function () {
//     setInterval('refreshPage()', 5000);
// });

// function refreshPage(){
//     location.reload()
// }

$(document).ready(function () {

    setInterval(function () {
        req = $.ajax({
            type: "GET",
            url: "/get-transactions",
            data: "data",
        });

        req.done(function (data) {
            $("#transactions").html(data);
            console.log(data)
        });
    }, 5000)
});