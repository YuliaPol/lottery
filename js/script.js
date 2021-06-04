//resize textarea

var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function initTeaxtarea () {
    //resize textarea
    var textareas = document.querySelectorAll('.textara-resize');
    for (let i = 0; i < textareas.length; i++) {
        function resize () {
            textareas[i].style.height = 'auto';
            textareas[i].style.height = textareas[i].scrollHeight + 2 + 'px';
        }
        /* 0-timeout to get the already changed text */
        function delayedResize () {
            window.setTimeout(resize, 0);
        }
        observe(textareas[i], 'change',  resize);
        observe(textareas[i], 'cut',     delayedResize);
        observe(textareas[i], 'paste',   delayedResize);
        observe(textareas[i], 'drop',    delayedResize);
        observe(textareas[i], 'keydown', delayedResize);
    
        // textareas[i].focus();
        // textareas[i].select();
        resize();
    }
}
initTeaxtarea();
var formValid = document.getElementsByClassName('form-valid')[0];
$('.valid-form-send').click(function () {
    $(this).parents('form').submit(function (e) {
        e.preventDefault();
        var erroreArrayElemnts = [];

        var el = document.querySelectorAll('.form-valid input[type="radio"]');
        for (var i = 0; i < el.length; i++) {
            var name = el[i].getAttribute('name');
            if (document.querySelectorAll('[name=' + name + ']:checked').length === 0) {
                if ($(el[i]).parents('.hidden-question').length != 0) {
                    console.log($(el[i]).parents('.hidden-question').is(':visible'));
                    if($(el[i]).parents('.hidden-question').is(':visible')){
                        erroreArrayElemnts.push(el[i]);
                        $(el[i]).parents('.hidden-question').addClass('has-error');
                        $('.hidden-question input').change(function (e) {
                            $(e.target).parents('.hidden-question').removeClass('has-error');
                        });
                    }
                }
                else if ($(el[i]).parents('.question-block').length != 0) {
                    erroreArrayElemnts.push(el[i]);
                    $(el[i]).parents('.question-block').addClass('has-error');
                    $('.question-block input').change(function (e) {
                        $(e.target).parents('.question-block').removeClass('has-error');
                    });
                }
            }
        }

        var el = document.querySelectorAll('.form-valid [data-reqired]');
        for (var i = 0; i < el.length; i++) {
            if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                erroreArrayElemnts.push(el[i]);
                $(el[i]).parents('.question-block').addClass('has-error');
                $(el[i]).focus(function (e) {
                    $(e.target).parents('.question-block').removeClass('has-error');
                });
            }
        }
        var el = document.querySelectorAll('.form-valid .hidden-input');
        for (var i = 0; i < el.length; i++) {
            if($(el[i]).is(':visible')){
                if (el[i].value === '' || el[i].value === ' ' || el[i].value === '-') {
                    erroreArrayElemnts.push(el[i]);
                    $(el[i]).parents('.hidden-question').addClass('has-error');
                    $(el[i]).focus(function (e) {
                        $(e.target).parents('.hidden-question').removeClass('has-error');
                    });
                }
            }
        }
        if (erroreArrayElemnts.length == 0) {
            formValid.submit();
        }
        if (erroreArrayElemnts.length > 0) {
            console.log('error');
            $([document.documentElement, document.body]).animate({
                scrollTop: $(erroreArrayElemnts[0]).parents('.question-block').offset().top
            }, 1000);
            return false;
        }
    });
});
jQuery(function ($) {
    $(document).ready(function () {
        $('.open-hidden').change(function(e){
            let hiddenEl = '#' + $(this).attr('data-hidden');
            console.log($(this).is(':checked'));
            if($(this).is(':checked')) {
                $(hiddenEl).fadeIn(300);
            }
            else {
                $(hiddenEl).find('.has-error').removeClass('has-error');
                $(hiddenEl).fadeOut(300);
            }
        });
        $('.hide-hidden').change(function(e){
            let hiddenEl = '#' + $(this).attr('data-hidden');
            console.log($(this).is(':checked'));
            if($(this).is(':checked')) {
                $(hiddenEl).fadeOut(300);
                $(hiddenEl).find('.has-error').removeClass('has-error');
            }
            else {
                $(hiddenEl).fadeIn(300);
            }
        });
    });
});