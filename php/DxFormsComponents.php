<?php

  // this class is responsible for rendering HTML components (such as input fields and dropdowns) for forms

  class DxFormsComponents {
    function renderComponent ($field) {
      $type = isset($field['type']) ? $field['type'] : '';
      $html;

      $id = $field['id'];
      
      switch ($type) {
        case 'options': {
          $options = $field['options'];
          $html = $this->renderDropdown(
            $id,
            $field['placeholder'],
            $options
          );
          break;
        }
        case 'textarea': {
          $html = $this->renderTextarea(
            $id,
            $field['placeholder']
          );
          break;
        }
        default: {
          $html = $this->renderText(
            $id,
            $field['placeholder']
          );
        }
      }
      
      return $html;
    }

    function renderDropdown ($id, $placeholder, $options) {
      ob_start(); ?>
        <select
          data-is-field
          id=<?= $id ?>
          name=<?= $id ?>
          placeholder="<?= $placeholder ?>"
        >
          <option value=""><?= $placeholder ?></option>
          <?php
            foreach ($options as $option) {?>
              <option value="<?= $option ?>">
                <?= $option ?>
              </option>
            <?php }
          ?>
        </select>
      <?php return ob_get_clean();
    }

    function renderTextarea ($id, $placeholder) {
      ob_start(); ?>
        <textarea
          data-is-field
          name=<?= $id ?>
          id=<?= $id ?>
          placeholder="<?= $placeholder ?>"
        ></textarea>
      <?php return ob_get_clean();
    }

    function renderText ($id, $placeholder) {
      ob_start(); ?>
        <input
          data-is-field
          type="text"
          name=<?= $id ?>
          id=<?= $id ?>
          placeholder="<?= $placeholder ?>"
        >
      <?php return ob_get_clean();
    }
  }

?>