$(function () {

    $("form input").blur(function() {
        validateFormElements($(this));    
    });

    $("form textarea").blur(function() {
        validateTextarea($(this));    
    });

    $("form textarea").change(function() {
        validateTextarea($(this));    
    });

    $("form select").blur(function() {
        validateFormSelectElements($(this));    
    });


    function isValid(element, validClass = "is-valid", invalidClass = "is-invalid") {
        $(element).addClass(validClass);
        $(element).removeClass(invalidClass);
    }

    function isInvalid(element, validClass = "is-valid", invalidClass = "is-invalid") {
        $(element).addClass(invalidClass);
        $(element).removeClass(validClass);
    }  


    function validateFormElements(input) {
        let min = 2;

        if($(input).attr("type") === "text" && $(input).prop("required")) {

            if($(input).data("id") === "firstName") {
                min = 2;
                validateInputValue()

            } else if($(input).data("id") === "surname") {
                min = 2;
                validateInputValue()

            } else {
                validateInputValue(input,`Måste innehålla minst ${min} tecken`, min);
            }
        }  

        if($(input).attr("type") === "email" && $(input).prop("required")) {
            validateEmail(input);
        }

        if($(input).attr("type") === "password" && $(input).prop("required")) {
            let comparePassword = findComparePassword();

            if($(input).data("comparewith") !== undefined) {
                validatePassword(comparePassword[0], comparePassword[1]);
            } else {
                min = 8;
                validateInputValue(input,`Måste minst innehålla ${min} antal tecken`, min);
                validatePassword(comparePassword[0], comparePassword[1]);            
            }
        }

        if($(input).attr("type") === "radio" && $(input).prop("required")) {
            validateRadioButton(input);
        }

        if($(input).attr("type") === "checkbox" && $(input).prop("required")) {
            validateCheckbox(input);
        }

        if(!$(input).val() && !$(input).prop("required")) {
            isValid(input);
        }
    }


    //Email
    function validateEmail(input) {
        let invalidFeedbackId = "#" + $(input).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = "E-postadressen är ogiltig. Ange en giltig e-postadress";
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9])+$/;

        if(!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if(!regex.test($(input).val())) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);
        } else {
            isValid(input);
        }
    }

    //Password
    function validatePassword(input, compareWith) {
        let invalidFeedbackId = input + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = "Lösenorden matchar inte varandra!";
        let result = ($(input).val() === $(compareWith).val()) ? true : false;

        if(!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);

        } else if(!result) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);

        } else {
            isValid(input);
        }
    }

    function findComparePassword() {
        let arr = [];
        $("form input").each(function(i, input) {
            if($(input).attr("type") === "password" && $(input).prop("required")) {
                if($(this).data("comparewith") !== undefined) {
                    arr.push("#" + $(input).attr("id"));
                    arr.push($(input).data("comparewith"));
                }
            }
        });
        return arr;
    }

    //Input
    function validateInputValue(input, error, min = 1, max =  4096) {
        let invalidFeedbackId = "#" + $(input).attr("id") + "-invalid-feedback";
        let invalidFeedbackDefault = $(invalidFeedbackId).html();
        let invalidFeedback = error;     
        
        if(!$(input).val()) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedbackDefault);
        } else if($(input).val().length < min) {
            isInvalid(input);
            $(invalidFeedbackId).html(invalidFeedback);
        } else {
            isValid(input);
        }
    }



    //Radio Button
    function validateRadioButton(radio){
        var checked = true;
        $("input:radio").each(function() {
            var name = $(this).attr("name");
            if($("input:radio[name="+name+"]:checked").length == 0){
                checked = false;
                isInvalid(radio)
            }
            if (checked) {
                isValid(radio);
            }
        });
    }


    //Select
    function validateFormSelectElements(select) {
        if(!$(select).val() && $(select).prop("required")) {
            isInvalid(select);
        } else {
            isValid(select);           
        }
    }

    //Textarea
    function validateTextarea(textarea, max = 250) {
        if($(textarea).val().length > max) {
            isInvalid(textarea);
        } else if($(textarea).val()) {
            isValid(textarea);
        } else {
            isValid(textarea);
        }
    }

    $("#comment").keyup(function () {
        var max = 250;
        var len = $(this).val().length;
        
        if (len >= max) {
            $("#textCounter").text(" Du har uppnått 250 tecken");
        } else {
          var numbers = max - len;
          $("#textCounter").text(numbers + " / 250");
        }
    });

    //Checkbox
    function validateCheckbox(checkbox) {
        if($(checkbox).prop("checked")) {
            $(checkbox).removeClass("is-invalid");
            $(checkbox).addClass("is-valid");
        } else {
            $(checkbox).addClass("is-invalid");
        }
    }

    

});