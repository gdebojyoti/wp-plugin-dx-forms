// this is the primary form block

import Editor from '../components/Editor'

wp.blocks.registerBlockType(
  "dx-forms/form",
  {
    title: "Dx Forms",
    description: 'The ultimate form plugin for WP Gutenberg',
    icon: "block-default",
    category: "dx-blocks",
    attributes: {
      info: {
        type: "object",
        default: {
          id: "",
          name: "",
          heading: "",
          subheading: ""
        }
      },
      fields: {
        type: "array",
        default: [
          {
            label: "Name",
            placeholder: "Please enter your name"
          },
          {
            label: "Email",
            placeholder: "Please enter your email ID"
          },
        ]
      },
      cta: {
        type: "object",
        default: {
          text: "Submit"
        }
      }
    },
    example: {
      attributes: {
        fields: [{label: "Label"}],
        cta: {text: "Primary CTA"}
      }
    },
    edit: Editor,
    save: () => null
  }
)
