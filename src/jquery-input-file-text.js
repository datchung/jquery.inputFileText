(function($) {
 
    $.fn.inputFileText = function(userOptions) {
        var MARKER_ATTRIBUTE = 'data-inputFileText';
        var DISPLAY_ATTRIBUTE = 'data-inputFileText-display';

        // Shortcut for plugin reference
        var P = $.fn.inputFileText;

        var options = P.getOptions(userOptions);

        if(options.remove && this.attr(MARKER_ATTRIBUTE) === 'true') {
            // Remove plugin from input file element
            this.next('input[type=button]').remove();
            this.next('span').remove();
            return this.attr(MARKER_ATTRIBUTE, null)
                .css({
                    display: this.attr(DISPLAY_ATTRIBUTE)
                })
                .attr(DISPLAY_ATTRIBUTE, null);
        }
        else if(this.attr(MARKER_ATTRIBUTE) === 'true') {
            // Plugin has already been applied to input file element
            return this;
        }

        // Keep track of input file element's display setting
        this.attr(DISPLAY_ATTRIBUTE, this.css('display'));

        // Hide input file element
        this.css({
            display: 'none'
            //width:  0
        });

        // Insert button after input file element
        var button = $(
            '<input type="button" value="' + options.text + '" />'
            ).insertAfter(this);

        // Insert text after button element
        var text = $(
            '<span style="margin-left: 5px"></span>'
            ).insertAfter(button);

        // Open input file dialog when button clicked
        var self = this;
        button.click(function() {
            self.click();
        });

        // Update text when input file chosen
        this.change(function() {
            // Chrome puts C:\fakepath\... for file path
            text.text(self.val().replace('C:\\fakepath\\', ''));
        });
 
        // Mark that this plugin has been applied to the input file element
        return this.attr(MARKER_ATTRIBUTE, 'true');
    };

    $.fn.inputFileText.getOptions = function(userOptions) {
        return $.extend({
            // Defaults
            text: 'Choose File',
            remove: false
        }, userOptions);
    };
 
}(jQuery));