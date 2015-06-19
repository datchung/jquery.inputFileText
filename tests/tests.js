QUnit.test( "getOptions default", function( assert ) {

    var options = $.fn.inputFileText.getOptions();

    assert.equal(options.text, 
        'Choose File', 
        'Should return default text option when no text option is provided.');

    assert.equal(options.remove, 
        false, 
        'Should return default remove option when no text option is provided.');
});
