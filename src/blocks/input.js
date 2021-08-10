import { useEffect } from 'react'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, Button, TextControl, SelectControl } from '@wordpress/components'

const basicSettings = [
  {
    key: 'label',
    label: 'Label'
  },
  {
    key: 'placeholder',
    label: 'Placeholder'
  },
  {
    key: 'id',
    label: 'Field ID (used for database)',
    isReadOnly: true
  }
]

wp.blocks.registerBlockType(
  "dx-forms/input",
  {
    title: "Text field (single line)",
    icon: "block-default",
    category: "dx-blocks",
    attributes: {
      id: {
        type: "string"
      },
      value: {
        type: "string"
      },
      label: {
        type: "string"
      },
      placeholder: {
        type: "string"
      }
    },
    edit: ({ setAttributes, attributes }) => {
      const {
        id,
        value,
        label = 'TEMP_LABEL',
        placeholder = 'TEMP_PLACEHOLDER'
      } = attributes

      useEffect(() => {
        if (!id) {
          console.log("not found..")
          setAttributes({
            id: `field-${new Date().getTime()}` // TODO: add a random number instead of relying on just timestamps
          })
        } else {
          console.log("ID already assigned", id)
        }
      }, [])

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
          <TextControl
            id={id}
            label={label}
            placeholder={placeholder}
            onChange={onChange}
          />
          <InspectorControls key="setting">
            <div id="gutenpride-controls">
              {/* TODO: cleanup; use data models */}
              <PanelBody title="Basic settings" initialOpen>
                {basicSettings.map(({key, label, isReadOnly}) => (
                  <TextControl
                    label={label}
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
