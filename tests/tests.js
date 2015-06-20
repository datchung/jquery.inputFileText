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