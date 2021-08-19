import { useEffect } from 'react'
import { InspectorControls, PanelColorSettings, withColors } from '@wordpress/block-editor'
import {
  PanelBody,
  Button,
  TextControl
} from '@wordpress/components'

import StyleSidebar from './common/StyleSidebar'
import { inputStyles } from './data'

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
      },
      styles: {
        type: "object",
        default: {
          // labelFontSize: 11
          // inputBorderWidth: 6
        }
      }
    },
    edit: ({ setAttributes, attributes }) => {
      const {
        id,
        value,
        label = 'TEMP_LABEL',
        placeholder = 'TEMP_PLACEHOLDER',
        styles
      } = attributes

      console.log("styles styles styles", styles)

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

      const onChangeStyles = (data) => {
        setAttributes({
          styles: {
            ...styles,
            ...data
          }
        })
      }

      const color = '#0f0'
      const textColor = '#f00'

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
              <PanelBody title="Basic settings" initialOpen={false}>
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

              <StyleSidebar
                fields={inputStyles}
                data={styles}
                onChange={onChangeStyles}
              />

              <PanelColorSettings
                title='Color Settings'
                colorSettings={ [
                  {
                    value: color,
                    onChange: ( colorValue ) => setAttributes( { color: colorValue } ),
                    label: 'Background Color'
                  },
                  {
                    value: textColor,
                    onChange: ( colorValue ) => setAttributes( { textColor: colorValue } ),
                    label: 'Text Color'
                  }
                ] }
              />
            </div>
          </InspectorControls>
        </>
      )
    },
    save: () => null
  }
)
