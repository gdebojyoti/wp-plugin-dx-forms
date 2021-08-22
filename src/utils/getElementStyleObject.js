import styleMappings from '../data/styleMappings.json'
import hyphenToCamelCase from './hyphenToCamelCase'

export default function getElementStyleObject (json, styles, element) {
  const styleObj = {}

  // get mappings for element
  const mappings = styleMappings[element]

  // return empty style object for invalid element
  if (!mappings || !mappings.length) {
    return {}
  }

  mappings.forEach(key => {
    // fetch value set in "attributes"
    const value = styles[key]

    // exit if no value is found
    if (value === undefined) {
      return
    }

    // get CSS property name for `key`
    const { prop: cssProperty } =
      json.find(style => style.key === key) || {}

    // exit for invalid `key`
    if (!cssProperty) {
      return
    }
    
    // convert the css property to camel case
    styleObj[hyphenToCamelCase(cssProperty)] = value
  })

  return styleObj
}