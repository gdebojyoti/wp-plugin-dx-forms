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
  "dx-forms/select",
  {
    title: "Dropdown",
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
      },
      options: {
        type: "array"
      }
    },
    edit: ({ setAttributes, attributes }) => {
      const {
        id,
        value,
        label = 'TEMP_LABEL',
        placeholder = 'TEMP_PLACEHOLDER',
        options = [""]
      } = attributes

      useEffect(() => {
        if (!id) {
          setAttributes({
            id: `select-${new Date().getTime()}` // TODO: add a random number instead of relying on just timestamps
          })
        }
      }, [])

      const onChangeBasicSettings = (property, value) => {
        setAttributes({
          [property]: value
        })
      }

      // when any of the dropdown options is updated
      const onChangeDropdownData = (index, data) => {
        const newOptions = [...options]
        newOptions[index] = data
        setAttributes({
          options: newOptions
        })
      }

      // add a new option whose default value is "Option #n"
      const addDropdownItem = () => {
        onChangeDropdownData(options.length, `Option #${options.length + 1}`)
      }

      // options to be shown in the in-editor dropdown
      const editorSelectOptions = [
        { label: placeholder, value: "" },
        ...(options.map(option => ({label: option, value: option})))
      ]

      return (
        <>
          <SelectControl
            id={id}
            label={label}
            placeholder={placeholder}
            options={editorSelectOptions}
          />
          <InspectorControls key="setting">
            <div id="gutenpride-controls">
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

                {!!options && options.map((data, index) => (
                  <TextControl
                    label={index === 0 ? 'Dropdown options' : ''}
                    value={data}
                    onChange={data => onChangeDropdownData(index, data)}
                  />
                ))}
          
                <Button variant='primary' onClick={addDropdownItem}>
                  Add new dropdown value
                </Button>
              </PanelBody>
            </div>
          </InspectorControls>
        </>
      )
    },
    save: () => null
  }
)
