import { Button, TextControl } from '@wordpress/components'

import Sidebar from '../Sidebar'

import config from '../../config/'
const { basePrefix } = config

console.clear()

const Editor = ({ setAttributes, attributes }) => {
  const {
    cta: {
      text: ctaText
    },
    fields = []
  } = attributes
  
  const onChange = (e, isEvent) => {
    setAttributes({
      cta: isEvent ? e.target.value : e
    })
  }

  return (
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
  )

}

export default Editor
