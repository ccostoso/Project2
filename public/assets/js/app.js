$(function () {
    console.log('this is working!');

    $("#clause-search-button").on("click", function(e) {
        e.preventDefault();

        const clause_title = $("#clause-search-input").val().trim();
        const regexedClauseTitle = clause_title.replace(/ /g, "-");;
        console.log(clause_title);
        
        $.ajax("/" + regexedClauseTitle, {
            type: "GET",
            data: {
                clause_title: regexedClauseTitle
            }
        }).then(
            (data) => {
                console.log("searched for clause_title", regexedClauseTitle);
                console.log(data);
                // Reload the page to get the updated list
                location.replace("/" + cregexedClauseTitle);
                // console.log(data);
            }
        );
    })

    $("#clause-submit-button").on("click", function(event) {
        event.preventDefault();

        console.log('#clause-submit-button click event');

        $.ajax("/api/clause", {
            type: "POST",
            data: {
                clause_url: $("#clause-url").val().trim(),
                clause_title: $("#clause-title").val().trim(),
                clause_requires: $("#clause-requires").val().trim(),
            }
        }).then(
            () => {
                console.log("created new clause");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    })
})