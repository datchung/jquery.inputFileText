(function() {
    // ID of div containing test elements in html file
    var TEST_DIV_ID = 'input-file-text-test';
    // ID of input file element in html file
    var INPUT_FILE_ID = 'input-file';

    var getModuleHooks = function(context) {
        return {
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
        };
    };


    QUnit.module('getOptions');

    QUnit.test('Default', function(assert) {
        expect(2);

        var options = $.fn.inputFileText.getOptions();

        assert.equal(options.text, 
            'Choose File', 
            'Should return default text option when no text option is provided.');

        assert.equal(options.remove, 
            false, 
            'Should return default remove option when no remove option is provided.');
    });

    QUnit.test('User provided', function(assert) {
        expect(2);

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

    
    QUnit.module('hasInputFileText', getModuleHooks());

    QUnit.test('Plugin has been applied to input file element', function(assert) {
        expect(2);

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

    QUnit.test('Plugin has not been applied to input file element', function(assert) {
        expect(2);
        
        var inputFileElement = $(this.inputFileElement);

        assert.equal(inputFileElement.attr($.fn.inputFileText.MARKER_ATTRIBUTE), 
            null, 
            'Input file element should have not data attribute to mark that the plugin has been applied.');

        assert.equal(inputFileElement.attr($.fn.inputFileText.DISPLAY_ATTRIBUTE), 
            null, 
            'Input file element should not have data attribute to keep track of original ' + 
            'display setting after the plugin has been applied.');
    });


    QUnit.module('shouldRemoveInputFileText', getModuleHooks());

    QUnit.test('Plugin has been applied to input file element then un-apply', function(assert) {
        expect(1);
        
        var inputFileElement = this.inputFileElement;

        // Apply plugin to element
        inputFileElement = $(inputFileElement).inputFileText();

        var remove = true;
        assert.equal($.fn.inputFileText.shouldRemoveInputFileText(inputFileElement, remove), 
            true, 
            'Should remove plugin from input file element.');
    });

    QUnit.test('Plugin has not been applied to input file element then un-apply', function(assert) {
        expect(1);
        
        var inputFileElement = this.inputFileElement;

        var remove = true;
        assert.equal($.fn.inputFileText.shouldRemoveInputFileText($(inputFileElement), remove), 
            false, 
            'Should not remove plugin from input file element.');
    });


    QUnit.module('apply/unapply inputFileText');

    QUnit.test('Apply plugin to input file element with default options', function(assert) {
        expect(5);
        
        // Apply plugin to element
        var inputFileElement = $('#' + INPUT_FILE_ID).inputFileText();

        assert.equal(inputFileElement.attr($.fn.inputFileText.MARKER_ATTRIBUTE), 
            'true', 
            'Input file element should have data attribute after plugin has been applied.');

        assert.equal(inputFileElement.css('display'), 
            'none', 
            'Input file element should not be visible.');

        assert.equal(inputFileElement.next('input[type=button]').length, 
            1, 
            'File select button should be added after input file element.');

        assert.equal(inputFileElement.next('input[type=button]').val(), 
            'Choose File', 
            'File select button should be have default value.');

        assert.equal(inputFileElement.next('input[type=button]').next('span').length, 
            1, 
            'File text box should be added after input file element.');
    });

    QUnit.test('Unapply plugin to input file element', function(assert) {
        expect(4);
        
        // Remove plugin from element
        var inputFileElement = $('#' + INPUT_FILE_ID);
        var originalDisplay = inputFileElement.attr($.fn.inputFileText.DISPLAY_ATTRIBUTE);
        inputFileElement = inputFileElement.inputFileText({ remove: true });

        assert.equal(inputFileElement.attr($.fn.inputFileText.MARKER_ATTRIBUTE),
            null, 
            'Input file element should not have data attribute after plugin has been removed.');

        assert.equal(inputFileElement.css('display'), 
            originalDisplay, 
            'Input file element should be visible.');

        assert.equal(inputFileElement.next('input[type=button]').length, 
            0 ,
            'File select button should be removed after input file element.');

        assert.equal(inputFileElement.next('span').length, 
            0, 
            'File text box should be removed after input file element.');
    });
})();