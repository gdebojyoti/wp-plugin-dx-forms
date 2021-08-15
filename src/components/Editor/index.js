import { useEffect } from 'react'
import { Button, TextControl, TextareaControl, SelectControl } from '@wordpress/components'
import { InnerBlocks } from '@wordpress/block-editor'

import Sidebar from '../Sidebar'

import config from '../../config/'
const { basePrefix } = config

// TODO: remove this; for dev only
if (window.location.host === "localhost:8888") {
  console.clear()
}

const Editor = ({ setAttributes, attributes }) => {
  const {
    info,
    info: {
      id, heading, subheading
    },
    fields = []
  } = attributes

  useEffect(() => {
    // TODO: find a better way to set unique form ID
    // assign ID to form if none exists
    if (!id) {
      const newInfo = {
        ...info,
        id: `form-${new Date().getTime()}` // TODO: add a random number instead of relying on just timestamps
      }
      setAttributes({
        info: newInfo
      })
    }
  }, [])

  const allowedBlocks = [
    "dx-forms/input",
    "dx-forms/select",
    "dx-forms/button"
  ]

  return (
    <div>
      <h3>{heading}</h3>
      <div>{subheading}</div>
      <form>
        <InnerBlocks allowedBlocks={allowedBlocks} />
        {fields.map(({ label, placeholder, type, options = [] }, index) => {
          switch (type) {
            case 'options':
              const generatedOptions = options.map(data => ({
                value: data,
                label: data
              }))
              return (
                <SelectControl
                  label={label}
                  options={generatedOptions}
                  key={index}
                />
              )
            case 'textarea':
              return (
                <TextareaControl
                  label={label}
                  placeholder={placeholder}
                  key={index}
                />
              )
            default:
              return (
                <TextControl
                  label={label}
                  placeholder={placeholder}
                  key={index}
                />
              )
          }
        })}

        <Sidebar
          setAttributes={setAttributes}
          attributes={attributes}
        />
      </form>
    </div>
  )

}

export default Editor
