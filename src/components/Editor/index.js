import { Button, TextControl } from '@wordpress/components'

import Sidebar from '../Sidebar'

import config from '../../config/'
const { basePrefix } = config

const Editor = ({ setAttributes, attributes }) => {
  const { cta, fields = [] } = attributes

  // wp.apiFetch({
  //   url: `${basePrefix}/wp-json/wp/v2/categories`
  // }).then(cat => console.log("cat", cat))
  
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
      <input
        type="text"
        onChange={e => onChange(e, true)}
        value={cta}
      />

      <Sidebar
        setAttributes={setAttributes}
        attributes={attributes}
      />
    </form>
  )

}

export default Editor
