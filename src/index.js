import { ColorPalette, InspectorControls } from '@wordpress/block-editor'
import { Panel, PanelBody, PanelRow, Button, TextControl } from '@wordpress/components'

import Editor from './components/Editor'

wp.blocks.registerBlockType(
  "dx-forms/form",
  {
    title: "Dx Forms",
    description: 'The ultimate form plugin for WP Gutenberg',
    icon: "block-default",
    category: "common",
    attributes: {
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
        cta: 'Primary CTA'
      }
    },
    edit: Editor,
    save: () => null
  }
)
