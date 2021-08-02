<?php

  // this class is responsible for rendering the final HTML form for end users

  class DxFormsOutput {
    function render ($attributes) {
      ob_start(); ?>
      <form>
        <?php
        foreach ($attributes['fields'] as $index => $field) {
          // print_r ($field);
          ?>
          <div>
            <label for="dx_forms_first_<?= $index ?>"><?= $field['label'] ?></label>
            <div>
              <input
                type="text"
                id="dx_forms_first_<?= $index ?>"
                placeholder="<?= $field['placeholder'] ?>"
              >
            </div>
          </div>
          <?php
        }
        ?>
        <button type="submit"><?= esc_html($attributes['cta']['text']) ?></button>
      </form>
      <?php return ob_get_clean();
    }
  }

?>