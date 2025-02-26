Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "get_dict_var",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": ["dict"],    // Specifies what types to put in the dropdown
                "defaultType": "dict"
            }
        ],
        "output": "dict",
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
    }
]);

python.pythonGenerator.forBlock['get_dict_var'] = function (block, generator) {
    const name = block.getFieldValue('VAR');
    const innerCode = generator.statementToCode(block, 'TERMS', Order.ATOMIC);
    // TODO: Assemble python into code variable.
    var code = name
    return code;
};
