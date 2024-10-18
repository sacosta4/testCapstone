import * as Blockly from 'blockly';
import { pythonGenerator } from 'blockly/python';

export const newPythonGenerator = new Blockly.Generator('python');


pythonGenerator.scrub_ = function (block, code, thisOnly) {
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    if (nextBlock && !thisOnly) {
        return code + ',\n' + pythonGenerator.blockToCode(nextBlock);
    }
    return code;
};


pythonGenerator.forBlock['quad_pair'] = function (block) {
    var var1 = block.getFieldValue('VAR_1');
    var var2 = block.getFieldValue('VAR_2');
    var value = block.getFieldValue('MEMBER_VALUE');
    var name = var1 + ',' + var2;
    var code = '"' + name + '": ' + value;
    return code;
};

pythonGenerator.forBlock['key_pair'] = function (block) {
    var name = block.getFieldValue('MEMBER_NAME');
    var value = block.getFieldValue('MEMBER_VALUE');
    var code = '"' + name + '": ' + value;
    return code;
};

pythonGenerator.forBlock['dictionary'] = function (block, generator) {
    var name = block.getFieldValue('NAME');
    var statementMembers =
        generator.statementToCode(block, 'MEMBERS');
    var code = '"' + name + '"' + ': {\n' + statementMembers + '\n}';
    return code;
};

pythonGenerator.forBlock['update_dict'] = function (block) {
    var name = block.getFieldValue('NAME');
    var key = block.getFieldValue('KEY');
    var val = block.getFieldValue('VALUE');
    // TODO: Assemble python into code variable.
    var code = name + '.update({"' + key + '": ' + val + '})\n'
    return code;
};

pythonGenerator.forBlock['merge_dict'] = function (block, generator) {
    var name = block.getFieldValue('NAME');
    var statementMembers =
        generator.statementToCode(block, 'MEMBERS');
    var code = '"{\n' + statementMembers + '\n}"';
    return code;
};

pythonGenerator.forBlock['quad_dictionary'] = function (block, generator) {
    var name = block.getFieldValue('NAME');
    var key1_p1 = block.getFieldValue('KEY1_P1');
    var key1_p2 = block.getFieldValue('KEY1_P2');
    var val1 = block.getFieldValue('VAL1');
    var key2_p1 = block.getFieldValue('KEY2_P1');
    var key2_p2 = block.getFieldValue('KEY2_P2');
    var val2 = block.getFieldValue('VAL2');
    var key3_p1 = block.getFieldValue('KEY3_P1');
    var key3_p2 = block.getFieldValue('KEY3_P2');
    var val3 = block.getFieldValue('VAL3');
    // TODO: Assemble python into code variable.
    var code = name + ' = {"' + key1_p1 + ',' + key1_p2 + '": ' + val1 + ', "' + key2_p1 + ',' + key2_p2 + '": ' + val2 + ', "' + key3_p1 + ',' + key3_p2 + '": ' + val3 + '}\n';
    return code;
};

pythonGenerator.forBlock['update_quad_dict'] = function (block) {
    var name = block.getFieldValue('NAME');
    var key = block.getFieldValue('KEY');
    var key2 = block.getFieldValue('KEY2');
    var val = block.getFieldValue('VALUE');
    // TODO: Assemble python into code variable.
    var code = name + '.update({"' + key + ',' + key2 + '": ' + val + '})\n'
    return code;
};