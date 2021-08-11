<?php

  // this class is responsible for rendering the final HTML form for end users

  class DxFormsOutput {
    function render ($attributes, $content) {
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

        <!-- inner blocks (fields & CTAs) -->
        <?= $content ?>
      </form>

      <script>
        // TODO: find a way to prevent multiple forms from attaching multiple scripts
        
        // prevent multiple forms in a single page from attaching multiple event handlers
        window.removeEventListener("submit", window.onSubmitDxForms)
        window.addEventListener("submit", window.onSubmitDxForms)
        
        window.onSubmitDxForms = (e) => {
          const data = e.target.elements
          const formData = new FormData()
          
          for (let i = 0; i < data.length; i++) {
            if (data[i].dataset.isField !== undefined) {
              formData.append(data[i].name, data[i].value)
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

    function renderInput ($attributes) {
      // debug stuff for post page only
      $screen = get_current_screen();
      if (!$screen) {
        // var_dump($attributes);
      }

      $id = isset($attributes['id']) ? $attributes['id'] : "";
      $label = isset($attributes['label']) ? $attributes['label'] : "";
      $placeholder = isset($attributes['placeholder']) ? $attributes['placeholder'] : "TEMP_PLACEHOLDER";
      
      ob_start(); ?>

      <div>
        <label for="<?= $id ?>"><?= $label ?></label>
        <div>
          <input
            type="text"
            data-is-field
            id="<?= $id ?>"
            name="<?= $id ?>"
            placeholder="<?= $placeholder ?>"
          >
        </div>
      </div>

      <?php return ob_get_clean();
    }
  }

?>