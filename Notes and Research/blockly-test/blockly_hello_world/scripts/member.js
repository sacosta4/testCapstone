Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "member",
        "message0": "key %1 : value %2",
        "args0": [
            {
                "type": "field_input",
                "name": "MEMBER_NAME",
                "text": "x_1"
            },
            {
                "type": "field_number",
                "name": "MEMBER_VALUE",
                "value": 0
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 245
    }
]);

python.pythonGenerator.scrub_ = function(block, code, thisOnly) {
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + ',\n' + python.pythonGenerator.blockToCode(nextBlock);
    }
    return code;
};


python.pythonGenerator.forBlock['member'] = function (block, generator) {
    var name = block.getFieldValue('MEMBER_NAME');
    var value = block.getFieldValue('MEMBER_VALUE');
    var code = '"' + name + '": ' + value;
    return code;
};





