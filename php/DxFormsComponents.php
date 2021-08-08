<?php

  // this class is responsible for rendering HTML components (such as input fields and dropdowns) for forms

  class DxFormsComponents {
    function renderComponent ($index, $field) {
      $type = isset($field['type']) ? $field['type'] : '';
      $html;

      // TODO: use correct `name` in input fields
      $id = "dx_forms_first_$index";
      $name = "name_$index";
      
      switch ($type) {
        case 'options': {
          $options = $field['options'];
          $html = $this->renderDropdown(
            $id,
            $name,
            $field['placeholder'],
            $options
          );
          break;
        }
        case 'textarea': {
          $html = $this->renderTextarea(
            $id,
            $name,
            $field['placeholder']
          );
          break;
        }
        default: {
          $html = $this->renderText(
            $id,
            $name,
            $field['placeholder']
          );
        }
      }
      
      return $html;
    }

    function renderDropdown ($id, $name, $placeholder, $options) {
      ob_start(); ?>
        <select
          data-is-field
          id=<?= $id ?>
          name=<?= $name ?>
          placeholder="<?= $placeholder ?>"
        >
          <option value=""><?= $placeholder ?></option>
          <?php
            foreach ($options as $index => $option) {?>
              <option value="<?= $option ?>">
                <?= $option ?>
              </option>
            <?php }
          ?>
        </select>
      <?php return ob_get_clean();
    }

    function renderTextarea ($id, $name, $placeholder) {
      ob_start(); ?>
        <textarea
          data-is-field
          name=<?= $name ?>
          id=<?= $id ?>
          placeholder="<?= $placeholder ?>"
        ></textarea>
      <?php return ob_get_clean();
    }

    function renderText ($id, $name, $placeholder) {
      ob_start(); ?>
        <input
          data-is-field
          type="text"
          name=<?= $name ?>
          id=<?= $id ?>
          placeholder="<?= $placeholder ?>"
        >
      <?php return ob_get_clean();
    }
  }

?>