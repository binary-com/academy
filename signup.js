$(function() {

    function validate($parent) {
        $parent.find('input, select').each(function() {
            console.log($(this).val());
            if ($(this).val() === '') {
                var $el = $(this);
                if ($el.parent().is('p')) {
                    $el = $el.parent();
                }
                if ($el.parent().is('.dob')) {
                    $el = $el.parent().parent();
                }
                $el.after('<div class="error">You can\'t leave this empty</div>');
            }
        });
        $('.error + .error').remove();
        return $('.error').length === 0;
    }

    $('.login-button, .dialog, .overlay').on('click', function() {
        $('.overlay').toggleClass('hidden');
    })

    $('form[novalidate]').on('submit', function(e) {
        var $form = $(this);
        $form.find('.error').remove();
        if (validate($form)) {
            $form.find('img').toggleClass('progress-spinner');
        }
        e.preventDefault();
    });
    $('.language-selector select').on('change', function() {
        var idx = this.selectedIndex;
        $('.flag').css('background-position', '0 -' + idx * 15 + 'px');
    })
});