Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "object",
        "message0": "Create dictionary with name %1 %2 { %3 %4 }",
        "args0": [
          {
            "type": "field_input",
            "name": "NAME",
            "text": "dict"
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_statement",
            "name": "MEMBERS"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
      }
]);


python.pythonGenerator.forBlock['object'] = function (block, generator) {
    var name = block.getFieldValue('NAME');
    var statementMembers =
        generator.statementToCode(block, 'MEMBERS');
    var code = '"' + name + '"' + ': {\n' + statementMembers + '\n}';
    return code;
}