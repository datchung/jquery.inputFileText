/**

*/
(function($) {
 
    $.fn.inputFileText = function(userOptions) {
        var MARKER_ATTRIBUTE = 'data-inputFileText';

        if(this.attr(MARKER_ATTRIBUTE) === 'true') {
            // Plugin has already been applied to input file element
            return this;
        }

        var options = $.extend({
            // Defaults
            text: 'Choose File',
            remove: false
        }, userOptions);

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
            '<input type="text" style="readonly:true; border:none; margin-left: 5px" />'
            ).insertAfter(button);

        // Open input file dialog when button clicked
        var self = this;
        button.click(function() {
            self.click();
        });

        // Update text when input file chosen
        this.change(function() {
            // Chrome puts C:\fakepath\... for file path
            text.val(self.val().replace('C:\\fakepath\\', ''));
        });
 
        // Mark that this plugin has been applied to the input file element
        return this.attr(MARKER_ATTRIBUTE, 'true');
    };
 
}(jQuery));