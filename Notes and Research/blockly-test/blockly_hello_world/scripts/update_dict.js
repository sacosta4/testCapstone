Blockly.common.defineBlocksWithJsonArray([
    {
        "type": "update_dict",
        "message0": "Add to dict  %1 : key %2 value %3",
        "args0": [
          {
            "type": "field_input",
            "name": "NAME",
            "text": "dict"
          },
          {
            "type": "field_input",
            "name": "KEY",
            "text": "x_3"
          },
          {
            "type": "field_number",
            "name": "VALUE",
            "value": 0
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 245,
        "tooltip": "",
        "helpUrl": ""
      }
]);

python.pythonGenerator.forBlock['update_dict'] = function (block) {
    var name = block.getFieldValue('NAME');
    var key = block.getFieldValue('KEY');
    var val = block.getFieldValue('VALUE');
    // TODO: Assemble python into code variable.
    var code = name + '.update({"' + key + '": ' + val + '})\n'
    return code;
};
