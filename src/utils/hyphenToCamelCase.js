// converts hyphenated case to camel case
// eg: "font-size" to "fontSize"
const hyphenToCamelCase = str =>
  str.replace(/-([a-z])/g, c => c[1].toUpperCase())

export default hyphenToCamelCase
