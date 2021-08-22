import { useEffect } from 'react'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, TextControl } from '@wordpress/components'

import StyleSidebar from './common/StyleSidebar'

import getElementStyleObject from '../utils/getElementStyleObject'
import { buttonStyles } from '../data/all.json'

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
      },
      styles: {
        type: "object",
        default: {}
      }
    },
    edit: ({ setAttributes, attributes }) => {
      const {
        label,
        styles
      } = attributes

      const buttonStyle = getElementStyleObject(buttonStyles, styles, 'button')

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

      return (
        <>
          <button style={{...buttonStyle, borderStyle: 'solid'}}>{label}</button>
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

              <StyleSidebar
                fields={buttonStyles}
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
