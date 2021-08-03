import { useEffect } from 'react'
import { Button, TextControl } from '@wordpress/components'

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
    fields = [],
    cta: {
      text: ctaText
    }
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
  
  const onChange = (e, isEvent) => {
    setAttributes({
      cta: isEvent ? e.target.value : e
    })
  }

  return (
    <div>
      <h3>{heading}</h3>
      <div>{subheading}</div>
      <form>
        {fields.map(({ label, placeholder, type }, index) => (
          <TextControl
            label={label}
            placeholder={placeholder}
            key={index}
          />
        ))}

        {/* CTA */}
        <button>
          {ctaText}
        </button>

        <Sidebar
          setAttributes={setAttributes}
          attributes={attributes}
        />
      </form>
    </div>
  )

}

export default Editor
