<?php

  // this class is responsible for rendering the final HTML form for end users

  class DxFormsOutput {
    function render ($attributes) {
      ob_start(); ?>
      
      <form>
        <!-- TODO: use correct form ID -->
        <input type="hidden" data-is-field name="form_id" value="USE-CORRECT-ID">
        <?php
        foreach ($attributes['fields'] as $index => $field) {
          // print_r ($field);
          ?>
          <div>
            <label for="dx_forms_first_<?= $index ?>"><?= $field['label'] ?></label>
            <div>
              <!-- TODO: use correct `name` in input fields -->
              <input
                data-is-field
                type="text"
                name="name_<?= $index ?>"
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

      <script>
        window.addEventListener("submit", onSubmitDxForms)
        function onSubmitDxForms (e) {
          const data = e.target.elements
          const formData = new FormData()
          
          for (let i = 0; i < data.length; i++) {
            if (data[i].dataset.isField !== undefined) {
              formData.append(data[i].name, data[i].value);
            }
          }

          try {
            const req = new XMLHttpRequest()
            req.open("POST", "<?= DX_FORMS_PLUGIN_PATH ?>/externals/processForm.php")
            req.onload = e => {
              // TODO: show success msg
              try {
                const res = JSON.parse(req.responseText)
                console.log("success", res)
              } catch (e) {
                console.info("An error occurred while submitting the form. Section 2.")
                console.info("Error details:", e)
              }
            }
            req.send(formData)
          } catch (e) {
            console.info("An error occurred while submitting the form.")
            console.info("Error details:", e)
          }

          e.preventDefault()
          return false
        }
      </script>

      <?php return ob_get_clean();
    }
  }

?>