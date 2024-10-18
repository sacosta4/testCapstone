Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "custom_variable",
        "message0": "var %1 = %2",
        "args0": [
            {
                "type": "field_input",
                "name": "VAR_NAME",
                "text": ""
            },
            {
                "type": "input_value",
                "name": "VAR_VALUE",
                "check": null
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230
    }
]);

python.pythonGenerator.forBlock['custom_variable'] = function (block, generator) {
    var name = block.getFieldValue('VAR_NAME');
    var value = generator.valueToCode(
        block, 'VAR_VALUE', Blockly.Javascript.ORDER_ATOMIC);
    var code = 'var ' + name + ' = ' + value + ';\n';
    return code;
};




