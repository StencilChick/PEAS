"use strict";

$(document).ready(function() {

    function sendAjax(action, data) {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function(result, status, xhr) {
                window.location = result.redirect;
            },
            error: function(xhr, status, error) {
				console.log(xhr.responseText);
                var messageObj = JSON.parse(xhr.responseText);
            
                console.log(messageObj.error);
            }
        });        
    }
    
    $("#submitPost").on("click", function(e) {
        e.preventDefault();
    
        if($("#contentInput").val() == '') {
            console.log("Need to actually write something to submit a post");
            return false;
        }

        sendAjax($("#makePost").attr("action"), $("#makePost").serialize());
        
        return false;
    });
    
});