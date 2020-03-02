$(function () {
    console.log('this is working!');


    $("#clause-search-button").on("click", function(e) {
        e.preventDefault();

        const clause_title = $("#clause-search-input").val().trim();
        const regexedClauseTitle = clause_title.replace(/ /g, "_").replace(/à/g, "a").replace(/é/g, "e").replace(/ê/g, "e").replace(/ç/g, "c").replace(/ù/g, "u");
       
        console.log(regexedClauseTitle);
        
        $.ajax("/clause/" + regexedClauseTitle, {
            type: "GET",
            data: {
                clause_title: regexedClauseTitle
            }
        }).then(
            (data) => {
                console.log("searched for clause_title", regexedClauseTitle);
                console.log(data);
                // Reload the page to get the updated list
                location.replace("/clause/" + regexedClauseTitle);
                // console.log(data);
            }
        );
    });

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
    });


    $("#clause-submit-button-put").on("click", function(event) {
        event.preventDefault();

        console.log('#clause-submit-button-put click event');
        const putId = $("#clause-id-put").val().trim();

        $.ajax("/api/clause/" + putId, {
            type: "PUT",
            data: {
                id: putId,
                clause_title: $("#clause-title-put").val().trim(),
                clause_requires: $("#clause-requires-put").val().trim(),
            }
        }).then(
            () => {
                console.log("created new clause");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
})

//-----------------------------------------------------------------------------------------------------

    $("#book_search_button").on("click", function(event){
        event.preventDefault();
    
        var bookTitle = $("#book_search_input").val().trim(); 
        var bookReplace = bookTitle.replace(/ /g, "_").replace(/à/g, "a").replace(/é/g, "e").replace(/ê/g, "e").replace(/ç/g, "c").replace(/ù/g, "u");
        $.ajax("/book/" + bookReplace, {
            type: "GET",
            data: {
                book_title: bookReplace
            }
        }).then(
            (data) => {
                console.log("searched for book_title", bookReplace);
                // console.log(data);
                // Reload the page to get the updated list
                location.replace("/book/" + bookReplace);
            }
        );
    });


    $("#book_submit_button").on("click", function(event) {
        event.preventDefault();

        console.log('#submit_button click event');

        $.ajax("/book", {
            type: "POST",
            data: {
            //data: 이 부분이 controller.js에서 request.body에 들어가는 부분. 
                book_name: $("#book_name").val().trim(),
                book_url: $("#book_url").val().trim(),
                img_url: $("#img_url").val().trim(),
                book_desc: $("#book_desc").val().trim()
            }
        }).then(
            () => {
                console.log("created new line");
        })
    })

