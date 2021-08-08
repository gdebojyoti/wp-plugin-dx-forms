<?php

  // this class is responsible for rendering the final HTML form for end users

  class DxFormsOutput {
    function render ($attributes) {
      ob_start(); ?>

      <h3><?= $attributes['info']['heading'] ?></h3>
      <div><?= $attributes['info']['subheading'] ?></div>
      
      <form>
        <!-- hidden field to pass form ID -->
        <input
          type="hidden"
          data-is-field
          name="form_id"
          value="<?= $attributes['info']['id'] ?>"
        >
        
        <!-- form fields -->
        <?php
          require_once('DxFormsComponents.php'); // TODO: avoid relative paths
          $dxFormsComponents = new DxFormsComponents();
          
          foreach ($attributes['fields'] as $index => $field) {
            ?>
            <div>
              <label for="dx_forms_first_<?= $index ?>"><?= $field['label'] ?></label>
              <div>
                <?php
                  echo $dxFormsComponents->renderComponent($index, $field);
                ?>
              </div>
            </div>
            <?php
          }
        ?>

        <!-- form submit CTA -->
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