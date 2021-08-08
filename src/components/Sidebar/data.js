export const basicSettings = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'heading',
    label: 'Heading'
  },
  {
    key: 'subheading',
    label: 'Subheading'
  },
  {
    key: 'id',
    label: 'Form ID',
    isReadOnly: true
  }
]

export const fieldSettings = [
  {
    key: 'label',
    label: 'Label'
  },
  {
    key: 'type',
    label: 'Type',
    type: 'options',
    options: [
      {
        value: 'text',
        label: 'Text Field (single line)'
      },
      {
        value: 'textarea',
        label: 'Text Box (multi line)'
      },
      {
        value: 'options',
        label: 'Dropdown'
      }
    ]
  },
  {
    key: 'placeholder',
    label: 'Placeholder'
  }
]