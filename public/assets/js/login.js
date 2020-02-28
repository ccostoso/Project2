$(function () {

    $("#user_signin_button").on("click", function(e) {
        e.preventDefault();
        
        $.ajax("/login", {
            type: "POST",
            data: {
                user_type: "user"
            }
        }).then(
            (data) => {
                location.replace("/");
            }
        );
    });

    $("#dev_signin_button").on("click", function(e) {
        e.preventDefault();
        
        $.ajax("/login", {
            type: "POST",
            data: {
                user_type: "dev"
            }
        }).then(
            (data) => {
                location.replace("/");
            }
        );
    });
});
