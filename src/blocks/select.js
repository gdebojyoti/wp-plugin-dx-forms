wp.blocks.registerBlockType(
  "dx-forms/select",
  {
    title: "Dropdown",
    icon: "block-default",
    category: "dx-blocks",
    edit: () => {
      return (
        <select>
          <option value="">Choose any one</option>
          <option value="1">Value #1</option>
          <option value="2">Value #2</option>
        </select>
      )
    }
  }
)