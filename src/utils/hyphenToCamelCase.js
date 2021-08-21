// converts hyphenated case to camel case
// eg: "font-size" to "fontSize"
export default function hyphenToCamelCase (str) {
  return str.replace(/-([a-z])/g, c => c[1].toUpperCase());
}
