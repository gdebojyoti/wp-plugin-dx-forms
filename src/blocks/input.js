wp.blocks.registerBlockType(
  "dx-forms/input",
  {
    title: "Text field (single line)",
    icon: "block-default",
    category: "dx-blocks",
    edit: () => {
      return (
        <input type="text" />
      )
    }
  }
)