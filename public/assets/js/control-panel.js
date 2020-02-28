$(function () {
    console.log("./control-panel.js is loaded.");

    // Change entry title
    $(".clause-display-title").click(function(e) {
        e.preventDefault();

        id = $(this).data("display-title-id");
        console.log("id:", id);
        
        $(this).toggleClass("d-none");
        $("*[data-input-group-id=" + id +"]").removeClass("d-none");
    })

    $(".edit-title-button").on("click", function(e) {
        e.preventDefault();

        // Determine id and values for entry to edit
        const id = $(this).data("edit-title-button-id")
        const inputVal = $($("*[data-edit-title-id="+id+"]")).val().trim();
        console.log("id:", id);
        console.log("inputVal:", inputVal);

        // Change data value for input group to pull later
        $($("*[data-input-group-id="+id+"]")).attr("data-edit-title-value", inputVal);
        //
        $("*[data-edit-title-id="+id+"]").attr("placeholder", inputVal);
        // Hide input group
        $($("*[data-input-group-id="+id+"]")).toggleClass("d-none");
        // Show display group
        $("*[data-display-title-id=" + id +"]").removeClass("d-none");
        // Change data value for display group to pull later
        $("*[data-display-title-id=" + id +"]").attr("data-display-title-value", inputVal);
        // Change display text on HTML doc
        $("*[data-display-title-id=" + id +"]").text(inputVal);
    })

    // Select if entry should be changed or deleted
    $(".delete-check").on("click", function(e) {
        e.preventDefault();
        console.log($(this).data("delete-state"));
        console.log($(this).data("delete-id"));

        if ($(this).data("delete-state") === true) {
            $(this).data("delete-state", false);
            console.log("switched?");
            console.log($(this).data("delete-state"));
        } else {
            $(this).data("delete-state", true);
            console.log("switched?");
            console.log($(this).data("delete-state"));
        }

        $(this).toggleClass("btn-warning btn-danger");
    })

    // Dropdown Item (OUI, NON or DEP changing)
    $(".clause-dropdown-item").on("click", function(e) {
        e.preventDefault();

        const id = $(this).data("require-id");
        console.log("id", id);
        const value = $(this).data("require-value");
        const $dropdown = $("*[data-button-require-id='" + id + "']");
        console.log("value:", value);
        console.log($dropdown);
        $dropdown.data("button-answer", value);
        $dropdown.text(value);
    });

    // Make PUT or DELETE request
    $(".confirm").on("click", function(e) {
        e.preventDefault();
        
        console.log("[data-delete-id]=" + $(this).data("update-id"));
        const thisDelete = $("*[data-delete-id='" + $(this).data("update-id") + "']")
        const thisDeleteState = thisDelete.data("delete-state");
        console.log("thisDeleteState:", thisDeleteState);
        const id = $(this).data("update-id");
        console.log("id:", id);
        const clauseTitle = $("*[data-display-title-id=" + id + "]").data("display-title-value");
        console.log("clauseTitle:", clauseTitle);
        const $dropdown = $("*[data-button-require-id='" + id + "']");
        const clauseRequires = $dropdown.data("button-answer");
        const putData = {
            id: id,
            clause_title: clauseTitle,
            clause_requires: clauseRequires
        }
        console.log("putData:", putData)
        console.log("thisDeleteState", thisDeleteState);

        if (!thisDeleteState) {
            console.log("thisDeleteState !== true");
            $.ajax("/api/control-panel/" + id, {
                type: "PUT",
                data: {
                    id: id,
                    clause_title: clauseTitle,
                    clause_requires: clauseRequires
                }
            }).then(
                () => {
                    console.log("updated clause with id of ", id);
                    // Reload the page to get the updated list
                    location.reload();
                }
            );

        } else {
            console.log("thisDeleteState === true");
            $.ajax("/api/control-panel/" + id, {
                type: "DELETE",
                data: {
                    id: id,
                }
            }).then(
                () => {
                    console.log("updated clause with id of ", id);
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        }
    })

    // $("#clause-submit-button").on("click", function(event) {
    //     event.preventDefault();

    //     console.log('#clause-submit-button click event');

    //     $.ajax("/api/clause", {
    //         type: "POST",
    //         data: {
    //             clause_url: $("#clause-url").val().trim(),
    //             clause_title: $("#clause-title").val().trim(),
    //             clause_requires: $("#clause-requires").val().trim(),
    //         }
    //     }).then(
    //         () => {
    //             console.log("created new clause");
    //             // Reload the page to get the updated list
    //             location.reload();
    //         }
    //     );
    // });

})