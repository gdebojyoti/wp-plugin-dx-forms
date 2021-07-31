import { ColorPalette, InspectorControls } from '@wordpress/block-editor'
import { Panel, PanelBody, PanelRow, Button, TextControl } from '@wordpress/components'

import Editor from './components/Editor'

wp.blocks.registerBlockType(
  "dx-forms/field",
  {
    title: "Dx Forms Field",
    description: 'My first form block plugin',
    icon: "smiley",
    category: "common",
    attributes: {
      cta: {
        type: "string"
      },
      fields: []
    },
    example: {
      attributes: {
        fields: [],
        cta: 'Primary CTA'
      }
    },
    edit: Editor,
    save: () => null
  }
)
