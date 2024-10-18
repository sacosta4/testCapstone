Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "var_block",
        "message0": "coefficient %1 *x_ %2  %3",
        "args0": [
          {
            "type": "field_number",
            "name": "NUM",
            "value": 0
          },
          {
            "type": "field_number",
            "name": "SUB",
            "value": 0
          },
          {
            "type": "input_value",
            "name": "TERM",
            "check": "var_block"
          }
        ],
        "output": null,
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
      }
]);

python.pythonGenerator.forBlock['var_block'] = function(block) {
    var num = block.getFieldValue('NUM');
    var sub = block.getFieldValue('SUB');
    var value_term = generator.valueToCode(block, 'TERM', python.Order.ATOMIC);
    // TODO: Assemble python into code variable.
    var code = '(' + sub + ', ' + sub + '): ' + num;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.python.ORDER_NONE];
  };