// this is the primary form block

import { InnerBlocks } from '@wordpress/block-editor'

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
      }
    },
    edit: Editor,
    save: () => <InnerBlocks.Content />
  }
)
