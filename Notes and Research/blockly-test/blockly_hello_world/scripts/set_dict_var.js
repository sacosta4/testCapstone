Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "set_dict_var",
        "message0": "%{BKY_VARIABLES_SET}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
            },
            {
                "type": "input_value",    // This expects an input of any type
                "name": "VALUE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
    }
]);

python.pythonGenerator.forBlock['set_dict_var'] = function (block, generator) {
    var name = block.getFieldValue('VAR');
    var val = generator.valueToCode(block, 'VALUE', Order.ATOMIC);
    // TODO: Assemble python into code variable.
    var code = name + ' = ' + val + ';\n'
    return code;
};
