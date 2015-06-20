# jquery.inputFileText
JQuery plugin to change input file element's text.

1. Download this plugin from `src/jquery-input-file-text.js`.
2. Add this script after JQuery.

        <script src='jquery-input-file-text.js'></script>

3. Create an input file element.

        <input type="file" id="choose-file" />
                
4. Apply this plugin on the input file element.

        $(document).ready(function() {
            $('#choose-file').inputFileText( { text: 'Select File' } );
        });

**Result**

![Image of result](https://raw.githubusercontent.com/datchung/jquery.inputFileText/master/doc/images/pluginResult.PNG)