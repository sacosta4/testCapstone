Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "quad_dictionary",
        "implicitAlign0": "RIGHT",
        "message0": "Create quadratic dictionary with: name %1 %2 var1 %3 var2 %4 value %5 %6 var1 %7 var2 %8 value %9 %10 var1 %11 var2 %12 value %13",
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
                "name": "KEY1_P1",
                "text": "x_1"
            },
            {
                "type": "field_input",
                "name": "KEY1_P2",
                "text": "x_2"
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
                "name": "KEY2_P1",
                "text": "x_3"
            },
            {
                "type": "field_input",
                "name": "KEY2_P2",
                "text": "x_4"
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
                "name": "KEY3_P1",
                "text": "x_5"
            },
            {
                "type": "field_input",
                "name": "KEY3_P2",
                "text": "x_6"
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
python.pythonGenerator.forBlock['quad_dictionary'] = function(block, generator) {
    var name = block.getFieldValue('NAME');
    var key1_p1 = block.getFieldValue('KEY1_P1');
    var key1_p2 = block.getFieldValue('KEY1_P2');
    var val1 = block.getFieldValue('VAL1');
    var key2_p1 = block.getFieldValue('KEY2_P1');
    var key2_p2 = block.getFieldValue('KEY2_P2');
    var val2 = block.getFieldValue('VAL2');
    var key3_p1 = block.getFieldValue('KEY3_P1');
    var key3_p2 = block.getFieldValue('KEY3_P2');
    var val3 = block.getFieldValue('VAL3');
    // TODO: Assemble python into code variable.
    var code = name + ' = {"' + key1_p1 + ',' + key1_p2 + '": ' + val1 + ', "' + key2_p1 + ',' + key2_p2 + '": ' + val2 + ', "' + key3_p1 + ',' + key3_p2 + '": ' + val3 + '}\n';
    return code;
  };