import { useEffect } from 'react'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, Button, TextControl } from '@wordpress/components'

const basicSettings = [
  {
    key: 'label',
    label: 'Label'
  }
]

wp.blocks.registerBlockType(
  "dx-forms/button",
  {
    title: "Button",
    icon: "block-default",
    category: "dx-blocks",
    attributes: {
      label: {
        type: "string",
        default: "Submit"
      }
    },
    edit: ({ setAttributes, attributes }) => {
      const {
        label
      } = attributes

      const onChange = value => {
        setAttributes({
          value
        })
      }

      const onChangeBasicSettings = (property, value) => {
        setAttributes({
          [property]: value
        })
      }

      return (
        <>
          <Button>{label}</Button>
          <InspectorControls key="setting">
            <div id="gutenpride-controls">
              <PanelBody title="Basic settings" initialOpen>
                {basicSettings.map(({key, label, isReadOnly}) => (
                  <TextControl
                    label='Button label'
                    value={attributes[key]}
                    onChange={data => isReadOnly ? null : onChangeBasicSettings(key, data)}
                    readOnly={isReadOnly}
                    key={key}
                  />
                ))}
              </PanelBody>
            </div>
          </InspectorControls>
        </>
      )
    },
    save: () => null
  }
)
