QUnit.module('getOptions');

QUnit.test("Default", function(assert) {

    var options = $.fn.inputFileText.getOptions();

    assert.equal(options.text, 
        'Choose File', 
        'Should return default text option when no text option is provided.');

    assert.equal(options.remove, 
        false, 
        'Should return default remove option when no remove option is provided.');
});

QUnit.test("User provided", function(assert) {

    var text = 'Select File';
    var remove = true;
    var options = $.fn.inputFileText.getOptions({
        text: text,
        remove: remove
    });

    assert.equal(options.text, 
        text, 
        'Should return user\'s text option when it is provided.');

    assert.equal(options.remove, 
        remove, 
        'Should return user\'s remove option when it is provided.');
});


QUnit.module('hasInputFileText', {
    beforeEach: function() {
        // Create input file element
        this.inputFileElement = document.createElement('input');
        this.inputFileElement.type = 'file';

        // Set display style
        this.display = 'inline';
        $(this.inputFileElement).css({ display: this.display });
    },
    afterEach: function() {
        delete this.inputFileElement;
        delete this.display;
    }
});

QUnit.test("Plugin has been applied to input file element", function(assert) {
    var inputFileElement = this.inputFileElement;
    var display = this.display;

    // Apply plugin to element
    inputFileElement = $(inputFileElement).inputFileText();

    assert.equal(inputFileElement.attr($.fn.inputFileText.MARKER_ATTRIBUTE), 
        'true', 
        'Input file element should have data attribute to mark that the plugin has been applied.');

    assert.equal(inputFileElement.attr($.fn.inputFileText.DISPLAY_ATTRIBUTE), 
        display, 
        'Input file element should have data attribute to keep track of original ' + 
        'display setting after the plugin has been applied.');
});

QUnit.test("Plugin has not been applied to input file element", function(assert) {
    var inputFileElement = $(this.inputFileElement);

    assert.equal(inputFileElement.attr($.fn.inputFileText.MARKER_ATTRIBUTE), 
        null, 
        'Input file element should have not data attribute to mark that the plugin has been applied.');

    assert.equal(inputFileElement.attr($.fn.inputFileText.DISPLAY_ATTRIBUTE), 
        null, 
        'Input file element should not have data attribute to keep track of original ' + 
        'display setting after the plugin has been applied.');
});