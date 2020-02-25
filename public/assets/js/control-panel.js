$(function () {
    console.log("./control-panel.js is loaded.");

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

    $(".dropdown-item").on("click", function(e) {
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

    $(".confirm").on("click", function(e) {
        e.preventDefault();
        
        console.log("[data-delete-id]=" + $(this).data("update-id"));
        const thisDelete = $("*[data-delete-id='" + $(this).data("update-id") + "']")
        const thisDeleteState = thisDelete.data("delete-state");
        console.log("thisDeleteState:", thisDeleteState);
        const id = $(this).data("update-id");
        console.log("id:", id);
        const clauseTitle = $("*[data-title-id='" + id + "']").text().trim();
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
})