import Blockly from 'blockly';

// QUBO Main Block Definition
Blockly.Blocks['qubo_main_block'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('QUBO Main Block');
    for (let i = 1; i <= 9; i++) {
      this.appendValueInput(`WEIGHT${i}`)
        .setCheck('Number')
        .appendField(`x${i}`);
    }
    this.setInputsInline(false);
    this.setColour(230);
    this.setTooltip('Define weights for terms x1 to x9');
    this.setHelpUrl('');
  },
};


// Linear Term Block Definition
Blockly.Blocks['linear_term_block'] = {
  init: function () {
    this.jsonInit({
      "type": "linear_term_block",
      "message0": "Key: %1 Value: %2",
      "args0": [
        {
          "type": "field_input",
          "name": "KEY",
          "text": "key"
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "Number"
        }
      ],
      "output": "LinearTerm",
      "colour": 230,
      "tooltip": "A single linear term with key and weight.",
      "helpUrl": ""
    });
  }
};

