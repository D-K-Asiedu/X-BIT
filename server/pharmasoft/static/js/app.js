// $(document).ready(function () {
//     setInterval('refreshPage()', 5000);
// });

// function refreshPage(){
//     location.reload()
// }

$(document).ready(function () {
    function update() {
        req = $.ajax({
            type: "GET",
            url: "/get-transactions",
            data: "data",
        });

        req.done(function (data) {
            $("#transactions").html(data);
            console.log(data)
        });
    }

    setInterval(update(), 30000);

    $(document).on('click', '#complete', function () {
        let transaction_id = $(this).attr("transaction_id")

        req = $.ajax({
            type: "POST",
            url: "/pharmacy/complete-order",
            data: {"id": transaction_id},
        });

        req.done(function (data) {
            update()
            console.log(data)
        })
    });


});