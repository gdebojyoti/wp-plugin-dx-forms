import { useEffect } from 'react'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, Button, TextControl } from '@wordpress/components'

const Sidebar = ({setAttributes, attributes}) => {
  const {
    cta,
    cta: {
      text: ctaText
    },
    fields = []
  } = attributes

  const onChangeCtaText = (text) => {
    const newCta = { ...cta }
    newCta.text = text
    setAttributes({ cta: newCta })
  }

  // when any property (label, placeholder, etc) of an input field is changed
  const onChangeFieldDetails = (index, property, data) => {
    const newFields = [...fields]
    const newFieldData = newFields[index] || {}
    newFieldData[property] = data
    fields[index] = newFieldData
    setAttributes({
      fields: newFields
    })
  }

  const addField = () => {
    setAttributes({
      fields: [...fields, {}]
    })
  }

  return (
    <InspectorControls key="setting">
      <div id="gutenpride-controls">
        {fields.map(({ label, placeholder, type }, index) => (
          <PanelBody title={`${label} settings`} initialOpen>
            <TextControl
              label="Label"
              value={label}
              onChange={data => onChangeFieldDetails(index, 'label', data)}
            />
            <TextControl
              label="Placeholder"
              value={placeholder}
              onChange={data => onChangeFieldDetails(index, 'placeholder', data)}
            />
          </PanelBody>
        ))}

        <PanelBody title="Action button settings">
          <TextControl
            label="Button text"
            value={ctaText}
            onChange={onChangeCtaText}
          />
        </PanelBody>

        <PanelBody title="More Settings" initialOpen>
          <Button variant='primary' onClick={addField}>
            Add Field
          </Button>
        </PanelBody>
      </div>
    </InspectorControls>
  )
}

export default Sidebar
