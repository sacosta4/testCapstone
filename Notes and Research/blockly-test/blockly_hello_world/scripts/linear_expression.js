Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "linear_expression",
        "message0": "Q = %1 *x_ %2 + %3 *x_ %4",
        "args0": [
            {
                "type": "field_number",
                "name": "NUM1",
                "value": 0
            },
            {
                "type": "field_number",
                "name": "SUB1",
                "value": 0
            },
            {
                "type": "field_number",
                "name": "NUM2",
                "value": 0
            },
            {
                "type": "field_number",
                "name": "SUB2",
                "value": 0
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
    }
]);

python.pythonGenerator.forBlock['linear_expression'] = function (block) {
    var num1 = block.getFieldValue('NUM1');
    var sub1 = block.getFieldValue('SUB1');
    var num2 = block.getFieldValue('NUM2');
    var sub2 = block.getFieldValue('SUB2');
    // TODO: Assemble python into code variable.
    var code = 'Q = {(' + sub1 + ', ' + sub1 + '): ' + num1 + ', (' + sub2 + ', ' + sub2 + '): ' + num2 + '}\n'
    return code;
};
