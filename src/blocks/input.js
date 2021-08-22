import { useEffect } from 'react'
import { InspectorControls, PanelColorSettings, withColors } from '@wordpress/block-editor'
import {
  PanelBody,
  Button,
  TextControl
} from '@wordpress/components'

import StyleSidebar from './common/StyleSidebar'

import getElementStyleObject from '../utils/getElementStyleObject'
import { inputStyles } from '../data/all.json'

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

      const labelStyle = getElementStyleObject(inputStyles, styles, 'label')
      const inputStyle = getElementStyleObject(inputStyles, styles, 'input')

      useEffect(() => {
        if (!id) {
          setAttributes({
            id: `field-${new Date().getTime()}` // TODO: add a random number instead of relying on just timestamps
          })
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
          {/* in-editor version */}
          <div className="dx-forms__input-block">
            <label
              className="dx-forms__input-label"
              for={id}
              style={labelStyle}
            >
              {label}
            </label>
            <div>
              <input
                type="text"
                id={id}
                placeholder={placeholder}
                className="dx-forms__input-field"
                onChange={onChange}
                style={inputStyle}
              />
            </div>
          </div>

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
            </div>
          </InspectorControls>
        </>
      )
    },
    save: () => null
  }
)
