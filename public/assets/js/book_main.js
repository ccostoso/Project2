$(function () {

    $("#user_button").on("click", function(e) {
        e.preventDefault();
        
        $.ajax("/book_main", {
            type: "POST",
            data: {
                user_type: "user"
            }
        }).then(
            (data) => {
                location.replace("/book");
            }
        );
    });

    $("#dev_button").on("click", function(e) {
        e.preventDefault();
        
        $.ajax("/book_main", {
            type: "POST",
            data: {
                user_type: "dev"
            }
        }).then(
            (data) => {
                location.replace("/book");
            }
        );
    });
});
