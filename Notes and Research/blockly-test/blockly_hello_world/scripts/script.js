const toolbox = {
    'kind': 'categoryToolbox',
    'contents': [
        {
            'kind': 'category',
            'name': 'Logic',
            'categorystyle': 'logic_category',
            'contents': [
                {
                    'kind': 'block',
                    'type': 'controls_if',
                },
                {
                    'kind': 'block',
                    'type': 'logic_compare',
                },
                {
                    'kind': 'block',
                    'type': 'logic_operation',
                },
                {
                    'kind': 'block',
                    'type': 'logic_negate',
                },
                {
                    'kind': 'block',
                    'type': 'logic_boolean',
                },
                {
                    'kind': 'block',
                    'type': 'logic_null',
                },
                {
                    'kind': 'block',
                    'type': 'logic_ternary',
                },
            ],
        },
        {
            'kind': 'category',
            'name': 'Loops',
            'categorystyle': 'loop_category',
            'contents': [
                {
                    'kind': 'block',
                    'type': 'controls_repeat_ext',
                    'inputs': {
                        'TIMES': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 10,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'controls_whileUntil',
                },
                {
                    'kind': 'block',
                    'type': 'controls_for',
                    'inputs': {
                        'FROM': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 1,
                                },
                            },
                        },
                        'TO': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 10,
                                },
                            },
                        },
                        'BY': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 1,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'controls_forEach',
                },
                {
                    'kind': 'block',
                    'type': 'controls_flow_statements',
                },
            ],
        },
        {
            'kind': 'category',
            'name': 'Math',
            'categorystyle': 'math_category',
            'contents': [
                {
                    'kind': 'block',
                    'type': 'math_number',
                    'fields': {
                        'NUM': 123,
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_arithmetic',
                    'inputs': {
                        'A': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 1,
                                },
                            },
                        },
                        'B': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 1,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_single',
                    'inputs': {
                        'NUM': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 9,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_trig',
                    'inputs': {
                        'NUM': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 45,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_constant',
                },
                {
                    'kind': 'block',
                    'type': 'math_number_property',
                    'inputs': {
                        'NUMBER_TO_CHECK': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 0,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_round',
                    'fields': {
                        'OP': 'ROUND',
                    },
                    'inputs': {
                        'NUM': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 3.1,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_on_list',
                    'fields': {
                        'OP': 'SUM',
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_modulo',
                    'inputs': {
                        'DIVIDEND': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 64,
                                },
                            },
                        },
                        'DIVISOR': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 10,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_constrain',
                    'inputs': {
                        'VALUE': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 50,
                                },
                            },
                        },
                        'LOW': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 1,
                                },
                            },
                        },
                        'HIGH': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 100,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_random_int',
                    'inputs': {
                        'FROM': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 1,
                                },
                            },
                        },
                        'TO': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 100,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'math_random_float',
                },
                {
                    'kind': 'block',
                    'type': 'math_atan2',
                    'inputs': {
                        'X': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 1,
                                },
                            },
                        },
                        'Y': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 1,
                                },
                            },
                        },
                    },
                },
            ],
        },
        {
            'kind': 'category',
            'name': 'Text',
            'categorystyle': 'text_category',
            'contents': [
                {
                    'kind': 'block',
                    'type': 'text',
                },
                {
                    'kind': 'block',
                    'type': 'text_multiline',
                },
                {
                    'kind': 'block',
                    'type': 'text_join',
                },
                {
                    'kind': 'block',
                    'type': 'text_append',
                    'inputs': {
                        'TEXT': {
                            'shadow': {
                                'type': 'text',
                                'fields': {
                                    'TEXT': '',
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_length',
                    'inputs': {
                        'VALUE': {
                            'shadow': {
                                'type': 'text',
                                'fields': {
                                    'TEXT': 'abc',
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_isEmpty',
                    'inputs': {
                        'VALUE': {
                            'shadow': {
                                'type': 'text',
                                'fields': {
                                    'TEXT': '',
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_indexOf',
                    'inputs': {
                        'VALUE': {
                            'block': {
                                'type': 'variables_get',
                            },
                        },
                        'FIND': {
                            'shadow': {
                                'type': 'text',
                                'fields': {
                                    'TEXT': 'abc',
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_charAt',
                    'inputs': {
                        'VALUE': {
                            'block': {
                                'type': 'variables_get',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_getSubstring',
                    'inputs': {
                        'STRING': {
                            'block': {
                                'type': 'variables_get',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_changeCase',
                    'inputs': {
                        'TEXT': {
                            'shadow': {
                                'type': 'text',
                                'fields': {
                                    'TEXT': 'abc',
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_trim',
                    'inputs': {
                        'TEXT': {
                            'shadow': {
                                'type': 'text',
                                'fields': {
                                    'TEXT': 'abc',
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_count',
                    'inputs': {
                        'SUB': {
                            'shadow': {
                                'type': 'text',
                            },
                        },
                        'TEXT': {
                            'shadow': {
                                'type': 'text',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_replace',
                    'inputs': {
                        'FROM': {
                            'shadow': {
                                'type': 'text',
                            },
                        },
                        'TO': {
                            'shadow': {
                                'type': 'text',
                            },
                        },
                        'TEXT': {
                            'shadow': {
                                'type': 'text',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_reverse',
                    'inputs': {
                        'TEXT': {
                            'shadow': {
                                'type': 'text',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_print',
                    'inputs': {
                        'TEXT': {
                            'shadow': {
                                'type': 'text',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'text_prompt_ext',
                    'inputs': {
                        'TEXT': {
                            'shadow': {
                                'type': 'text',
                                'fields': {
                                    'TEXT': 'abc',
                                },
                            },
                        },
                    },
                },
            ],
        },
        {
            'kind': 'category',
            'name': 'Lists',
            'categorystyle': 'list_category',
            'contents': [
                {
                    'kind': 'block',
                    'type': 'lists_create_with',
                },
                {
                    'kind': 'block',
                    'type': 'lists_create_with',
                },
                {
                    'kind': 'block',
                    'type': 'lists_repeat',
                    'inputs': {
                        'NUM': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 5,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'lists_length',
                },
                {
                    'kind': 'block',
                    'type': 'lists_isEmpty',
                },
                {
                    'kind': 'block',
                    'type': 'lists_indexOf',
                    'inputs': {
                        'VALUE': {
                            'block': {
                                'type': 'variables_get',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'lists_getIndex',
                    'inputs': {
                        'VALUE': {
                            'block': {
                                'type': 'variables_get',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'lists_setIndex',
                    'inputs': {
                        'LIST': {
                            'block': {
                                'type': 'variables_get',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'lists_getSublist',
                    'inputs': {
                        'LIST': {
                            'block': {
                                'type': 'variables_get',
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'lists_split',
                    'inputs': {
                        'DELIM': {
                            'shadow': {
                                'type': 'text',
                                'fields': {
                                    'TEXT': ',',
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'lists_sort',
                },
                {
                    'kind': 'block',
                    'type': 'lists_reverse',
                },
            ],
        },
        {
            'kind': 'category',
            'name': 'Color',
            'categorystyle': 'colour_category',
            'contents': [
                {
                    'kind': 'block',
                    'type': 'colour_picker',
                },
                {
                    'kind': 'block',
                    'type': 'colour_random',
                },
                {
                    'kind': 'block',
                    'type': 'colour_rgb',
                    'inputs': {
                        'RED': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 100,
                                },
                            },
                        },
                        'GREEN': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 50,
                                },
                            },
                        },
                        'BLUE': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 0,
                                },
                            },
                        },
                    },
                },
                {
                    'kind': 'block',
                    'type': 'colour_blend',
                    'inputs': {
                        'COLOUR1': {
                            'shadow': {
                                'type': 'colour_picker',
                                'fields': {
                                    'COLOUR': '#ff0000',
                                },
                            },
                        },
                        'COLOUR2': {
                            'shadow': {
                                'type': 'colour_picker',
                                'fields': {
                                    'COLOUR': '#3333ff',
                                },
                            },
                        },
                        'RATIO': {
                            'shadow': {
                                'type': 'math_number',
                                'fields': {
                                    'NUM': 0.5,
                                },
                            },
                        },
                    },
                },
            ],
        },
        {
            'kind': 'sep',
        },
        {
            'kind': 'category',
            'name': 'Variables',
            'categorystyle': 'variable_category',
            'custom': 'VARIABLE',
        },
        {
            'kind': 'category',
            'name': 'Functions',
            'categorystyle': 'procedure_category',
            'custom': 'PROCEDURE',
        },
        {
            "kind": "category",
            "name": "Quantum",
            "colour": "245",
            "contents": [
              {
                "kind": "block",
                "type": "term_block"
              },
              {
                "kind": "block",
                "type": "linear_expression"
              },
              {
                "kind": "block",
                "type": "qubo_block"
              },
              {
                "kind": "block",
                "type": "var_block"
              },
              {
                "kind": "block",
                "type": "dict_expression"
              },
              {
                "kind": "block",
                "type": "update_dict"
              },
              {
                "kind": "block",
                "type": "dict_exp"
              },
              {
                "kind": "block",
                "type": "get_dict_var"
              },
              {
                "kind": "block",
                "type": "set_dict_var"
              },
              {
                "kind": "block",
                "type": "dictionary"
              },
              {
                "kind": "block",
                "type": "quad_dictionary"
              },
              {
                "kind": "block",
                "type": "update_quad_dict"
              },
              {
                "kind": "block",
                "type": "merge_dict"
              },
              {
                'kind': 'block',
                'type': 'object'
              },
              {
                'kind': 'block',
                'type': 'member'
              },
              {
                'kind': 'block',
                'type': 'custom_variable'
              }
            ]
        },
    ],
};


const workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox });

var generateButton = document.getElementById('generate')

generateButton.addEventListener('click', function () {
    const pythonCode = python.pythonGenerator.workspaceToCode(workspace);
    console.log("code is")
    console.log(pythonCode)
    document.getElementById('textarea').innerHTML = "<pre>" + pythonCode + "</pre>"
})

var executeButton = document.getElementById('execute')

executeButton.addEventListener('click', function () {
    const pythonCode = python.pythonGenerator.workspaceToCode(workspace)
    fetch('http://127.0.0.1:5000/quantum', {
        method: 'POST',                    // HTTP method
        headers: {                         // Request headers
            'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify({              // Request body data (converted to JSON)
            code: pythonCode
        })
    })
        .then(response => response.json())  // Handle the response
        .then(data => {
            console.log(data);               // Log the response data
        })
        .catch(error => {
            console.error('Error:', error);  // Handle any errors
        });
})