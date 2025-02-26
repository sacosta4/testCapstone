Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "term_block",
        "message0": "coefficient %1 variable name %2",
        "args0": [
            {
                "type": "field_number",
                "name": "NUM",
                "value": 0
            },
            {
                "type": "field_input",
                "name": "NAME",
                "text": "x_1"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
    }
]);

python.pythonGenerator.forBlock['term_block'] = function (block) {
    var value = block.getFieldValue('NUM');
    var key = block.getFieldValue('NAME');
    // TODO: Assemble python into code variable.
    var code = 'dictionary[' + key + '] = ' + value + '\n';
    return code;
};