/**

*/
(function($) {
 
    $.fn.inputFileText = function(userOptions) {
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
            '<input type="text" style="readonly:true; border:none;" />'
            ).insertAfter(button);

        // Open input file dialog when button clicked
        var self = this;
        button.click(function() {
            self.click();
        });

        // Update text when input file chosen
        this.change(function() {
            text.val(self.val());
        });
 
        return this;
    };
 
}(jQuery));