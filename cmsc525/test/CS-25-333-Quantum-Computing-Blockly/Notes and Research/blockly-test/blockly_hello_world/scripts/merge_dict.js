Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "merge_dict",
        "message0": "Dictionary: %1 , Dictionary to merge %2",
        "args0": [
            {
                "type": "field_input",
                "name": "DICT1",
                "text": "dict"
            },
            {
                "type": "field_input",
                "name": "DICT2",
                "text": "dict2"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
    }
]);

python.pythonGenerator.forBlock['merge_dict'] = function (block, generator) {
    var dict1 = block.getFieldValue('DICT1');
    var dict2 = block.getFieldValue('DICT2');

    var code = dict1 + ".update(" + dict2 + ")\n";
    return code;
};

