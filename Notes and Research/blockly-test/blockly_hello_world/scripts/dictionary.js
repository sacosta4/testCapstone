Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "dictionary",
        "implicitAlign0": "RIGHT",
        "message0": "Create dictionary with: name %1 %2 key %3 value %4 %5 key %6 value %7 %8 key %9 value %10",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "dict"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "KEY1",
                "text": "x_1"
            },
            {
                "type": "field_number",
                "name": "VAL1",
                "value": 0
            },
            {
                "type": "input_dummy",
                "align": "RIGHT"
            },
            {
                "type": "field_input",
                "name": "KEY2",
                "text": "x_2"
            },
            {
                "type": "field_number",
                "name": "VAL2",
                "value": 0
            },
            {
                "type": "input_dummy",
                "align": "RIGHT"
            },
            {
                "type": "field_input",
                "name": "KEY3",
                "text": "x_3"
            },
            {
                "type": "field_number",
                "name": "VAL3",
                "value": 0
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
    }
]);

// Initialize dictionary block code generation in Python
python.pythonGenerator.forBlock['dictionary'] = function (block) {
    var name = block.getFieldValue('NAME');
    var key1 = block.getFieldValue('KEY1');
    var val1 = block.getFieldValue('VAL1');
    var key2 = block.getFieldValue('KEY2');
    var val2 = block.getFieldValue('VAL2');
    var key3 = block.getFieldValue('KEY3');
    var val3 = block.getFieldValue('VAL3');
    // TODO: Assemble python into code variable.
    var code = name + ' = {"' + key1 + '": ' + val1 + ', "' + key2 + '": ' + val2 + ', "' + key3 + '": ' + val3 + '}\n';
    return code;
};

