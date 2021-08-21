<?php

  // this class is responsible for rendering the final HTML form for end users

  class DxFormsOutput {
    function __construct () {
      // init style property mappings
      $string = file_get_contents(DX_FORMS_PLUGIN_PATH . "/src/data/styleMappings.json");
      $this->styleMappings = json_decode($string);
    }

    function render ($attributes, $content) {
      ob_start(); ?>
      
      <form class='dx-forms'>
        <h3><?= $attributes['info']['heading'] ?></h3>
        <div><?= $attributes['info']['subheading'] ?></div>
        
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
        
        window.onSubmitDxForms = window.onSubmitDxForms || ((e) => {
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
        })
        
        // prevent multiple forms in a single page from attaching multiple event handlers
        window.removeEventListener("submit", window.onSubmitDxForms)
        window.addEventListener("submit", window.onSubmitDxForms)
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
      $placeholder = isset($attributes['placeholder']) ? $attributes['placeholder'] : "";

      $styles = $this->readJson();

      $labelStyle = isset($attributes['styles']) ? $this->getStyles($attributes['styles'], $styles, 'label') : "";
      $inputStyle = isset($attributes['styles']) ? $this->getStyles($attributes['styles'], $styles, 'input') : "";
      
      ob_start(); ?>

      <div class="dx-forms__input-block">
        <label
          class="dx-forms__input-label"
          for="<?= $id ?>"
          style="<?= $labelStyle ?>"
        ><?= $label ?></label>
        <div>
          <input
            type="text"
            data-is-field
            id="<?= $id ?>"
            name="<?= $id ?>"
            placeholder="<?= $placeholder ?>"
            class="dx-forms__input-field"
            style="<?= $inputStyle ?>"
          >
        </div>
      </div>

      <?php return ob_get_clean();
    }

    function renderSelect ($attributes) {
      $id = isset($attributes['id']) ? $attributes['id'] : "";
      $label = isset($attributes['label']) ? $attributes['label'] : "";
      $placeholder = isset($attributes['placeholder']) ? $attributes['placeholder'] : "";
      $options = isset($attributes['options']) ? $attributes['options'] : array();

      ob_start(); ?>

      <div class="dx-forms__input-block">
        <label class="dx-forms__input-label" for="<?= $id ?>"><?= $label ?></label>
        <div>
          <select
            data-is-field
            id="<?= $id ?>"
            name="<?= $id ?>"
            placeholder="<?= $placeholder ?>"
            class="dx-forms__input-field"
          >
            <option value=""><?= $placeholder ?></option>
            <?php
              foreach($options as $option) {
                echo "<option value=$option>$option</option>";
              }
            ?>
          </select>
        </div>
      </div>

      <?php return ob_get_clean();
    }

    function renderButton ($attributes) {
      $label = isset($attributes['label']) ? $attributes['label'] : "";

      ob_start(); ?>

      <div class="dx-forms__input-block">
        <button type="submit" class="dx-forms__cta"><?= $label ?></button>
      </div>

      <?php return ob_get_clean();
    }

    function readJson () {
      $string = file_get_contents(DX_FORMS_PLUGIN_PATH . "/src/data/all.json");
      $jsonData = json_decode($string);
      return $jsonData->inputStyles;
    }

    function getStyles ($styles, $json, $key) {
      $validKeys = $this->styleMappings->{$key};
      $computedStyles = "";

      foreach ($json as $style) {
        if (in_array($style->key, $validKeys)) {
          if (isset($styles[$style->key])) {
            $computedStyles .= $style->prop . ":" . $styles[$style->key];

            // TODO: consider fetching suffix data from JSON file
            // add suffix
            $computedStyles .= in_array($style->prop, ['font-size', 'border-width', 'border-radius']) ? "px;" : ";";
          }
        }
      }

      return $computedStyles;
    }
  }

?>