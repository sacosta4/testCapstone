Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "qubo_block",
        "message0": "Q = %1",
        "args0": [
            {
                "type": "input_value",
                "name": "TERMS",
                "check": "dict"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
    }
]);

python.pythonGenerator.forBlock['qubo_block'] = function (block, generator) {
    
    const value_terms = generator.valueToCode(block, 'VAR', python.Order.ATOMIC);
    var define_blocks =  block.getInputTargetBlock('TERMS');

    // TODO: Assemble python into code variable.
    var code = 'Q = {' + define_blocks + '}\n';
    return code;
};