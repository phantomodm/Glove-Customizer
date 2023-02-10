export const SIZE = [
  {
      "attribute_pewc": "pewc_group_89335_89339",
      "name": "10.5\"",
      "glove": [
          "infielder",
          "pitcher"
      ],
      "seqNo": 1
  },
  {
      "attribute_pewc": "pewc_group_89335_89339",
      "glove": [
          "infielder",
          "pitcher"
      ],
      "seqNo": 2,
      "name": "11\""
  },
  {
      "seqNo": 3,
      "glove": [
          "infielder",
          "pitcher"
      ],
      "name": "11.5\"",
      "attribute_pewc": "pewc_group_89335_89339"
  },
  {
      "glove": [
          "infielder",
          "pitcher"
      ],
      "seqNo": 4,
      "attribute_pewc": "pewc_group_89335_89339",
      "name": "11.75\""
  },
  {
      "attribute_pewc": "pewc_group_89335_89339",
      "seqNo": 5,
      "glove": [
          "infielder",
          "pitcher"
      ],
      "name": "12\""
  },
  {
      "seqNo": 6,
      "glove": [
          "outfielder",
          "pitcher",
          "first base",
          "1st base"
      ],
      "name": "12.5\"",
      "attribute_pewc": "pewc_group_89335_89339"
  },
  {
      "glove": [
          "outfielder"
      ],
      "name": "12.75\"",
      "seqNo": 7,
      "attribute_pewc": "pewc_group_89335_89339"
  },
  {
      "glove": [
          "outfielder",
          "first base",
          "1st base"
      ],
      "attribute_pewc": "pewc_group_89335_89339",
      "name": "13\"",
      "seqNo": 8
  },
  {
      "seqNo": 9,
      "glove": [
          "outfielder",
          "first base",
          "1st base"
      ],
      "attribute_pewc": "pewc_group_89335_89339",
      "name": "14\""
  },
  {
      "name": "32\"",
      "attribute_pewc": "pewc_group_89335_89339",
      "seqNo": 10,
      "glove": []
  },
  {
      "seqNo": 11,
      "attribute_pewc": "pewc_group_89335_89339",
      "name": "32.50\"",
      "glove": [
          "catcher"
      ]
  },
  {
      "glove": [],
      "attribute_pewc": "pewc_group_89335_89339",
      "seqNo": 12,
      "name": "33\""
  },
  {
      "seqNo": 13,
      "name": "33.50\"",
      "glove": [
          "catcher"
      ],
      "attribute_pewc": "pewc_group_89335_89339"
  },
  {
      "name": "34\"",
      "attribute_pewc": "pewc_group_89335_89339",
      "glove": [
          "catcher"
      ],
      "seqNo": 14
  },
  {
      "name": "34.50\"",
      "attribute_pewc": "pewc_group_89335_89339",
      "glove": [
          "catcher"
      ],
      "seqNo": 15
  }
];

export const WIZARD = [
  {
    seqNo: 1,
    id: 'main-',
    disabled: false,
    includeOptions: false,
    title: 'Glove Type',
    label: 'Glove Type:',
    variations: [
      {
        attribute_pewc: 'pewc_group_89335_89336',
        name: 'Baseball',
        label: 'Glove Type',
      },
      {
        label: 'Glove Type',
        name: 'Softball',
        attribute_pewc: 'pewc_group_89335_89336',
      },
    ],
  },
  {
    seqNo: 2,
    id: 'main-',
    disabled: false,
    includeOptions: false,
    attribute_pewc: 'pewc_group_89335_89338',
    title: 'Glove Position',
    label: 'Glove Position',
    variations: [
      {
        gloveType: 'glove',
        label: 'Field Position',
        attribute_pewc: 'pewc_group_89335_89338',
        name: 'Infielder',
        gloveBase: 'inf',
      },
      {
        gloveType: 'mitt',
        name: 'Catcher',
        gloveBase: 'catcher-mitt',
        attribute_pewc: 'pewc_group_89335_89338',
        label: 'Field Position',
      },
      {
        attribute_pewc: 'pewc_group_89335_89338',
        label: 'Field Position',
        name: '1st Base',
        gloveType: 'mitt',
        gloveBase: 'fbase',
      },
      {
        name: 'Outfielder',
        attribute_pewc: 'pewc_group_89335_89338',
        label: 'Field Position',
        gloveBase: 'of',
        gloveType: 'glove',
      },
    ],
  },
  {
    seqNo: 3,
    id: 'main-',
    disabled: false,
    includeOptions: false,
    attribute_pewc: 'pewc_group_89335_89339',
    label: 'Glove Size',
    title: 'Glove Size',
    options: [],
    variations: [],
  },
  {
    seqNo: 4,
    id: 'main-',
    attribute_pewc: 'pewc_group_89335_89340',
    disabled: false,
    includeOptions: false,
    label: 'Throwing Arm',
    title: 'Throwing Arm',
    options: [],
    variations: [
      {
        name: 'Right Hand Throw',
        label: 'Throwing Arm',
        attribute_pewc: 'pewc_group_89335_89340',
      },
      {
        name: 'Left Hand Throw',
        label: 'Throwing Arm',
        attribute_pewc: 'pewc_group_89335_89340',
      },
    ],
  },
  {
    seqNo: 5,
    id: 'main-',
    disabled: false,
    label: 'Glove Brand',
    title: 'Glove Brand',
    includeOptions: true,
    options: [],
    info:{
      "title": '<h3>What is the difference between NYStix and 9P?</h3>',
      "content": '<p>NYStix was created to fulfill a need for better baseball equipment in the parks of New York City and Long Island. <br> 9P (9Positions) is a brand created for the world.</p>'
    },
    variations: [
      {
        id: 'pa_glove-brand',
        valueString: 'NYStix',
        attribute_pewc: 'pewc_group_89335_89341',
        img: 'https://nystix.com/wp-content/uploads/2021/10/nystix.svg',
        value: 'nystix',
        name: 'NYStix',
      },
      {
        name: '9Positions',
        value: '9positions',
        attribute_pewc: 'pewc_group_89335_89341',
        img: 'https://nystix.com/wp-content/uploads/2021/10/nine-positions.svg',
        id: 'pa_glove-brand',
        valueString: '9Positions',
      },
      {
        attribute_pewc: 'pewc_group_89335_89341',
        img: '//nystix.com/wp-content/uploads/2021/10/nystix-alt.svg',
        value: 'nystix-alt',
        valueString: 'NYStix Alt',
        id: 'pa_glove-brand',
        name: 'NYStix Alt',
      },
    ],
  },
  {
    seqNo: 6,
    id: 'main-',
    disabled: false,
    includeOptions: true,
    contents: [],
    title: 'Glove Designer',
    label: 'Glove Designer',
    options: [
      {
        id: '',
        type: 'leather',
        title: '',
        label: 'Surface Leather',
        header: 'glove-design-',
        info: {
          description: null,
          label: null,
        },
        input: 'buttons',
        prompt: [
          {
            active: true,
            title: 'Glove Shell',

            elementRef: 'radio',
            type: 'leather',
            gloveInputs: [
              {
                glovePart: 'thb',
                fingerId: '1',
                label: 'Thumb Finger',
                gloveType: ['mitt'],
                attribute_wp: 'pa_thumb-finger-color',
                attribute_pewc: 'pewc_group_89335_89342',
                image: null,
                required: true,
                active:true              },
              {
                glovePart: 'bfg',
                attribute_pewc: 'pewc_group_89335_89343',
                label: 'Back Finger',
                gloveType: ['mitt'],
                fingerId: '2',
                attribute_wp: 'pa_back-finger-color',required: true,
                active:true
              },
              {
                glovePart: 'thbo',
                attribute_pewc: 'pewc_group_89335_89344',
                gloveType: ['glove'],
                label: 'Thumb Outer',
                attribute_wp: 'pa_thumb-outer-color',
                image: null,
                fingerId: '1',required: true,
                active:true
              },
              {
                attribute_wp: 'pa_thumb-inner-color',
                glovePart: 'thbi',
                label: 'Thumb Inner',
                attribute_pewc: 'pewc_group_89335_89345',
                image: null,
                gloveType: ['glove'],
                fingerId: '2',required: true,
                active:true
              },
              {
                fingerId: '3',
                gloveType: ['glove'],
                label: 'Index Inner',
                glovePart: 'indi',
                attribute_pewc: 'pewc_group_89335_89346',
                attribute_wp: 'pa_index-inside-color',required: true,
                image: null,
                active:true
              },
              {
                glovePart: 'indo',
                attribute_wp: 'pa_index-outer-color',
                fingerId: '4',
                gloveType: ['glove'],
                label: 'Index Outer',
                attribute_pewc: 'pewc_group_89335_89347',required: true,
                image: null,
                active:true
              },
              {
                fingerId: '5',
                label: 'Middle Inner',
                gloveType: ['glove'],
                glovePart: 'midi',
                attribute_pewc: 'pewc_group_89335_89348',
                attribute_wp: 'pa_middle-finger-color',required: true,
                image: null,
                active:true
              },
              {
                attribute_wp: 'pa_middle-finger-color',
                fingerId: '5',
                glovePart: 'mido',
                gloveType: ['glove'],
                label: 'Middle Outer',
                attribute_pewc: 'pewc_group_89335_89349',
                image: null,
                required: true,
                active:true
              },
              {
                gloveType: ['glove'],
                fingerId: '6',
                attribute_pewc: 'pewc_group_89335_89350',
                label: 'Ring Inner',
                attribute_wp: 'pa_ring-inner-color',
                glovePart: 'rngi',required: true,
                image: null,
                active:true
              },
              {
                attribute_wp: 'pa_ring-outer-color',
                attribute_pewc: 'pewc_group_89335_89351',
                fingerId: '7',
                label: 'Ring Outer',
                glovePart: 'rngo',
                gloveType: ['glove'],required: true,
                image: null,
                active:true
              },
              {
                fingerId: '8',
                gloveType: ['glove'],
                attribute_pewc: 'pewc_group_89335_89352',
                glovePart: 'pnki',
                label: 'Pinky Inner',
                attribute_wp: 'pa_pinky-inside-color',required: true,
                image: null,
                active:true
              },
              {
                label: 'Pinky Outer',
                gloveType: ['glove'],
                attribute_wp: 'pa_pinky-outside-color',
                fingerId: '9',
                glovePart: 'pnko',
                attribute_pewc: 'pewc_group_89335_89353',required: true,
                image: null,
                active:true
              },
              {
                fingerId: '10',
                gloveType: ['glove', 'mitt'],
                attribute_pewc: 'pewc_group_89335_89354',
                label: 'Wrist Color',
                attribute_wp: 'pa_wrist-color',
                glovePart: 'wst',required: true,
                image: null,
                active:true
              },
            ],
            info: {
              description: null,
              label: null,
            },
          },
          {
            title: 'Glove Pocket',
            header: 'glove-design-',
            type: 'leather',
            elementRef: 'radio',
            active: true,
            info: {
              label: null,
              description: null,
            },
            gloveInputs: [
              {
                attribute_pewc: 'pewc_group_89335_89355',
                attribute_wp: 'pa_palm-color',
                glovePart: 'plm',
                gloveType: ['glove', 'mitt'],
                fingerId: '11',
                label: 'Palm Color',required: true,
                active:true,
                image: null
              },
              {
                attribute_pewc: 'pewc_group_89335_90148',
                attribute_wp: 'pa_lining-color',
                glovePart: 'lin',
                gloveType: ['glove', 'mitt'],
                fingerId: '11',
                label: 'Lining',required: true,
                active:true,
                image: 'https://nystix.com/wp-content/uploads/2022/10/palm-lining.jpg',
                info:{ label: null, description: 'The palm lining is inside of the glove. The color will not be visible.' }
              },
              {
                attribute_pewc: 'pewc_group_89335_89356',
                attribute_wp: 'pa_palm-color',
                glovePart: 'tgt',
                gloveType: ['mitt'],
                fingerId: '11',
                label: 'Target Color',required: false,
                active:true,
                image:"https://nystix.com/wp-content/uploads/2022/10/target-samples.jpg",
              },
            ],
          },
          {
            title: 'Finger Loop',
            header: 'glove-design-',
            active: false,
            type: 'leather',
            elementRef: 'radio',
            gloveInputs: [
              {
                attribute_wp: '',
                glovePart: 'fstrap',
                attribute_pewc: 'pewc_group_89335_89357',
                fingerId: '11',
                gloveType: ['mitt', 'glove'],
                label: 'Thumb/Little Finger Strap',
                required: false,
                active:false,
                image: null,
              },
            ],
            info: {
              label:null,
              description: 'Finger loops are the laces that secure the thumbs and pinky fingers.',

            }
          },
        ],
      },
      {
        label: 'Glove Web',
        header: 'glove-web-',
        id: 'static-',
        input: 'buttons',
        type: 'leather',
        info: {
          label: null,
          description:
            'Swipe to view all web options and select the web for your glove. ',
        },
        prompt: [
          {
            active: true,
            title: 'Webs',
            attribute_pewc: 'pewc_group_89335_89358',
            header: '',
            elementRef: 'radio',
            type: 'leather',
            gloveInputs: [
              {
                label: 'Web Color',
                glovePart: 'web',
                attribute_pewc: 'pewc_group_89335_89359',
                fingerId: '13',
                attribute_wp: 'pa_web-color',
                gloveType: ['glove', 'mitt'],
                required: true,
                active:true,
                image: null,
              },
              {
                attribute_pewc: 'pewc_group_89335_89360',
                glovePart: 'utoe',
                gloveType: ['mitt'],
                attribute_wp: 'pa_web-base-color',
                fingerId: '4',
                label: 'Web Base Color',
                required: true,
                active:true,
                image: null,
              },
            ],
            info: {
              label: null,
              description: null
            },
          },
        ],
      },
      {
        label: 'Glove Binding, Lace & Welt',
        header: 'glove-trim-',
        type: 'leather',
        info: {
          label: null,
          description:
            'Select colors for binding, lace and welt. Selections are required.',
        },
        input: 'buttons',
        prompt: [
          {
            type: 'leather',
            glovePart: 'bnd',
            title: 'Glove Trim',
            elementRef: 'radio',
            active: true,
            gloveInputs: [
              {
                attribute_wp: 'pa_binding-color',
                attribute_pewc: 'pewc_group_89335_89361',
                fingerId: '15',
                gloveType: ['glove', 'mitt'],
                label: 'Binding Color',
                glovePart: 'bnd',
                required: true,
                active:true,
                image:"https://nystix.com/wp-content/uploads/2022/10/best-binding-on-baseball-glove.jpg",
              },
              {
                attribute_wp: 'pa_lace-color',
                attribute_pewc: 'pewc_group_89335_89362',
                gloveType: ['glove', 'mitt'],
                fingerId: '14',
                label: 'Lace Color',
                glovePart: 'lce',required: true,
                active:true,
                image: null,
              },
              {
                attribute_wp: 'pa_welt-color',
                attribute_pewc: 'pewc_group_89335_89363',
                gloveType: ['glove', 'mitt'],
                fingerId: '13',
                label: 'Welt Color',
                glovePart: 'wlt',required: true,
                image:"https://nystix.com/wp-content/uploads/2022/10/best-welting-on-a-baseball-glove.jpg",
                active:true
              },
            ],
            info: {
              description: null,
              label: null,
            },
          },
        ],
      },
      {
        label: 'Glove Embroidery and Stitching',
        title: '',
        header: 'glove-thread-',
        type: 'embroidery',
        info: {
          label: null,
          description:
            'In the Logo Color section, choose the thread color for the wrist logo and personalization. The stitching tread color will be used to bind the leather parts.',
        },
        input: 'buttons',
        prompt: [
          {
            active: true,
            type: 'embroidery',
            header:'',
            glovePart: 'logo',
            title: 'Embroidery',
            elementRef: 'radio',
            gloveInputs: [
              {
                fingerId: '17',
                attribute_wp: 'pa_nystix-logo-color',
                glovePart: 'logo',
                label: 'Brand Logo Color',
                attribute_pewc: 'pewc_group_89335_89364',
                image:"https://nystix.com/wp-content/uploads/2022/10/brand-logo.jpg",
                gloveType: ['mitt', 'glove'],required: true,
                active:true
              },
              {
                glovePart: 'stch',
                gloveType: ['glove', 'mitt'],
                label: 'Stitching Color',
                fingerId: '16',
                attribute_wp: 'pa_stitching-color',
                attribute_pewc: 'pewc_group_89335_89365',
                image:"https://nystix.com/wp-content/uploads/2022/10/stitching-sample.jpg",
                required: true,
                active:true
              },
              {
                glovePart: 'psnlColor',
                gloveType: ['glove', 'mitt'],
                label: 'Personalization Embroidery Color',
                fingerId: '16',
                attribute_wp: 'pa_personalization-color',
                attribute_pewc: 'pewc_group_89335_90601',
                image:"https://nystix.com/wp-content/uploads/2022/10/personalization-sample.jpg",
                required: false,
                active:true
              }
            ],
            info: {
              label: null,
              description: null,
            },
          },
        ]
      },
      {
        id: 'static-',
        title: '',
        prompt: [
          {
            title: 'Finger Cover',
            active: true,
            elementRef: 'radio',
            header:'',
            info: {
              label: null,
              description:
                'Select the type of finger cover you want to add to your glove. It is not required to have a finger cover.',
            },
            variations: [
              {
                attribute_pewc: 'pewc_group_89335_89366',
                img: 'https://nystix.com/wp-content/uploads/2020/11/no-pad-hood.jpg',
                name: 'No Pad',
              },
              {
                name: 'Finger Pad',
                attribute_pewc: 'pewc_group_89335_89366',
                img: 'https://nystix.com/wp-content/uploads/2020/11/nystix-finger-pad.jpg',
              },
              {
                img: 'https://nystix.com/wp-content/uploads/2020/11/finger-hood.jpg',
                name: 'F. Hood',
                attribute_pewc: 'pewc_group_89335_89366',
              },
            ],
            type: 'leather',
            gloveInputs: [
            ]
          },
          {
            title: 'Pad/Hood Color',
            active: true,
            type: 'leather',
            elementRef: 'radio',
            info: {
              label: 'Not required if "No Pad" was selected in previous step.',
              description:
                'The color of the finger cover might not change in glove view.',
            },
            gloveInputs: [
              {
                glovePart: 'fpad',
                fingerId: '',
                attribute_pewc: 'pewc_group_89335_89367',
                attribute_wp: 'pa_finger-pad-color',
                label: 'Finger Pad Color',
                gloveType: ['mitt', 'glove'],
                required: false,
                image: null,
                active:true
              },
            ],
          },
        ],
        info: {
          label: null,
          description: null,
        },
        input: 'buttons',
        label: 'Finger Protection',
        header: 'finger-protector',
        type: 'leather',
      },
      {
        title: '',
        label: 'Glove Personalization',
        header: 'glove-design-',
        input: 'buttons',
        active: true,
        info: {
          label: null,
          description: null,
        },
        type: 'leather',
        id: 'static-',
        prompt: [
          {
            title: 'Glove Personalization',
            info:{ label: null, description: null},
            active: true,
            gloveInputs: [
              {
                label: 'Glove Personalization',
                glovePart: 'psnl',
                active: true,
                fingerId: null,
                attribute_pewc: 'pewc_group_89335_89368',
                elementRef: 'text',
                attribute_wp: 'pa_glove-personalization',
                gloveType: ['glove', 'mitt'],
                required: true,
                info:{ label: null, description: null}
              },
              {
                elementRef: 'text',
                attribute_pewc: 'pewc_group_89335_89369',
                label: 'Embroidery Font',
                fingerId: null,
                attribute_wp: 'pa_embroidery-font',
                active: true,
                required: false,
                variations: [
                  {
                    name: 'Script Font',
                    attribute_pewc: 'pewc_group_89335_89369',
                    label: 'Glove Embroidery',
                  },
                  {
                    name: 'Block Font',
                    attribute_pewc: 'pewc_group_89335_89369',
                    label: 'Glove Embroidery'
                  },
                ],
                glovePart: '',
                gloveType: ['glove', 'mitt'],
                info:{ label: null, description: null}
              },
              {
                label: 'Customer Notes',
                glovePart: 'lin',
                active: true,
                fingerId: null,
                attribute_pewc: 'pewc_group_89335_89568',
                elementRef: 'text',
                attribute_wp: 'pa_glove-personalization',
                gloveType: ['glove', 'mitt'],
                required: true,
                info:{ label: null, description: null}
              },
            ],

          },
        ],
      },
    ],
    variations: [],
  },
];
