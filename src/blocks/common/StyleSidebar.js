import { useState } from 'react'
import {
  PanelBody,
  RangeControl,
  ColorPalette
} from '@wordpress/components'

const StyleSidebar = ({ fields, data, onChange }) => {
  return (
    <PanelBody title="Styles">
      {fields.map(field => <Field data={field} value={data[field.key]} onChange={onChange} key={field.key} />)}
    </PanelBody>
  )
}

const Field = ({ data, value, onChange }) => {
  const { key, type, title, options } = data

  const onChangeData = e => {
    console.log("data updated", e)
    onChange({ [key]: e })
  }

  switch (type) {
    case 'range': {
      const { min, max, defaultValue } = options
      console.log("oiptions", key, value, defaultValue)
      return <RangeControl
        label={title}
        value={value === undefined ? defaultValue : value}
        onChange={onChangeData}
        min={min}
        max={max}
      />
    }
    case 'color': {
      // TODO: find a way to use theme colors as sample instead
      const sampleColors = [
        { name: 'red', color: '#f00' },
        { name: 'white', color: '#fff' },
        { name: 'blue', color: '#00f' },
      ]
      return <>
        <label>{title}</label>
        <br /><br />
        <ColorPalette
          colors={sampleColors}
          value={value}
          onChange={onChangeData}
        />
      </>
    }
  }
}

export default StyleSidebar