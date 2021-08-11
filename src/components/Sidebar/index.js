import { useEffect, useState } from 'react'
import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, Button, TextControl, SelectControl } from '@wordpress/components'

import { basicSettings, fieldSettings } from './data'

const Sidebar = ({setAttributes, attributes}) => {
  const {
    info,
    fields = [],
    cta,
    cta: {
      text: ctaText = 'REMOVE_CTA'
    } = {}
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
      fields: [...fields, {
        label: "New field", // TODO: constants; language
        id: `field-${new Date().getTime()}` // TODO: find better unique ID for field
      }]
    })
  }

  const onChangeBasicSettings = (property, value) => {
    const newInfo = {
      ...info,
      [property]: value
    }
    setAttributes({
      info: newInfo
    })
  }

  console.log("fields data", fields)

  return (
    <InspectorControls key="setting">
      <div id="gutenpride-controls">
        {/* TODO: cleanup; use data models */}
        <PanelBody title="Basic settings" initialOpen>
          {basicSettings.map(({key, label, isReadOnly}) => (
            <TextControl
              label={label}
              value={info[key]}
              onChange={data => isReadOnly ? null : onChangeBasicSettings(key, data)}
              readOnly={isReadOnly}
              key={key}
            />
          ))}
        </PanelBody>

        {fields.map((field, index) => (
          <PanelBody title={`${field.label} settings`} initialOpen>
            {fieldSettings.map(({key, label, type, options}) => {
              switch (type) {
                case 'options':
                  return (
                    <Select
                      label={label}
                      value={field[key]}
                      options={options}
                      dropdownData={field.options}
                      onChange={data => onChangeFieldDetails(index, key, data)}
                      onUpdateOptions={data => onChangeFieldDetails(index, 'options', data)}
                      key={key}
                    />
                  )
                case 'textarea':
                  return (
                    <TextareaControl
                      label={label}
                      value={field[key]}
                      onChange={data => onChangeFieldDetails(index, key, data)}
                      key={key}
                    />
                  )
                default:
                  return (
                    <TextControl
                      label={label}
                      value={field[key]}
                      onChange={data => onChangeFieldDetails(index, key, data)}
                      key={key}
                    />
                  )
              }
            })}
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

const Select = (props) => {
  const {
    label,
    value,
    options,
    dropdownData = [], // options to be shown in form's dropdown(s)
    onChange,
    onUpdateOptions
  } = props

  // remove 'options' property if field is not a 'Dropdown'
  useEffect(() => {
    // ignore if field type is not dropdown
    if (!value || value === 'options') {
      return
    }
    // ignore if dropdownData is already empty
    if (!dropdownData || !dropdownData.length) {
      return
    }
    onUpdateOptions()
  }, [value])
  
  const onChangeDropdownData = (index, data) => {
    const newData = [...dropdownData]
    newData[index] = data
    onUpdateOptions(newData)
  }
  
  // add a new field
  const addDropdownItem = () => {
    onChangeDropdownData(dropdownData.length, `Option #${dropdownData.length + 1}`)
  }
  
  return (
    <>
      <SelectControl
        label={label}
        value={value}
        options={options}
        onChange={onChange}
      />

      {value === 'options' && (
        <>
          {!!dropdownData && dropdownData.map((data, index) => (
            <TextControl
              label={index === 0 ? 'Dropdown options' : ''}
              value={data}
              onChange={data => onChangeDropdownData(index, data)}
            />
          ))}
    
          <Button variant='primary' onClick={addDropdownItem}>
            Add new dropdown value
          </Button>
        </>
      )}
    </>
  )
}

export default Sidebar
