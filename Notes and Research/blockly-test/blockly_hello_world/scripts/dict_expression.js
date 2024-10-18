Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "dict_expression",
        "message0": "Create dictionary with: name %1 , key %2 value %3 , key %4 value %5",
        "args0": [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "dict"
            },
            {
                "type": "field_input",
                "name": "KEY1",
                "text": "x_1"
            },
            {
                "type": "field_number",
                "name": "VALUE1",
                "value": 0
            },
            {
                "type": "field_input",
                "name": "KEY2",
                "text": "x_2"
            },
            {
                "type": "field_number",
                "name": "VALUE2",
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

python.pythonGenerator.forBlock['dict_expression'] = function (block) {
    var name = block.getFieldValue('NAME');
    var key1 = block.getFieldValue('KEY1');
    var val1 = block.getFieldValue('VALUE1');
    var key2 = block.getFieldValue('KEY2');
    var val2 = block.getFieldValue('VALUE2');
    // TODO: Assemble python into code variable.
    var code = name + ' = {"' + key1 + '": ' + val1 + ', "' + key2 + '": ' + val2 + '}\n';
    return code;
};
