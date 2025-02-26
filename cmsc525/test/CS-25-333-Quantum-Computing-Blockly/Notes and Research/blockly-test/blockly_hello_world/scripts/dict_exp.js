Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "dict_exp",
        "message0": "key %1 value %2 , key %3 value %4",
        "args0": [
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
        "output": "dict",
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
      }        
]);

python.pythonGenerator.forBlock['dict_exp'] = function (block, generator) {
    var key1 = block.getFieldValue('KEY1');
    var val1 = block.getFieldValue('VALUE1');
    var key2 = block.getFieldValue('KEY2');
    var val2 = block.getFieldValue('VALUE2');

    var value_terms = generator.statementToCode(block, 'TERMS', python.Order.ATOMIC);

    // TODO: Assemble python into code variable.
    var code = '{"' + key1 + '": ' + val1 + ', "' + key2 + '": ' + val2 + '}\n';
    return code;
};
