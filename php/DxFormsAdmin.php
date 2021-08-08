<?php

  // this class is responsible for creating settings page in WP admin panel

  class DxFormsAdmin {
    function __construct () {
      // create menu item
      add_action( 'admin_menu', array($this, "createMenuItem") );
    }

    function createMenuItem () {
      $page_title = 'WordPress Extra Post Info';
      $menu_title = 'Dx Forms';
      $capability = 'manage_options';
      $menu_slug  = 'dx-forms';
      $function   = array($this, "renderPage");
      $icon_url   = 'dashicons-clipboard';
      $position   = null;
      add_menu_page(
        $page_title,
        $menu_title,
        $capability,
        $menu_slug,
        $function,
        $icon_url,
        $position
      );
    }

    function renderPage () {
      $this->fetchAllForms();
      
      ?>
      <hr><hr>
      
      <h1 class="wp-heading-inline">Hello there!</h1>
      <form method="post" action="options.php">
        <?php settings_fields( 'extra-post-info-settings' ); ?>
        <?php do_settings_sections( 'extra-post-info-settings' ); ?>
        <table class="form-table">
          <tr valign="top">
            <th scope="row">Extra post info:</th>
            <td>
              <input type="text" name="extra_post_info" value="<?= get_option( 'extra_post_info' ) ?>"/>
            </td>
          </tr>
        </table>
        <?php submit_button(); ?>
      </form>
      <?php

      $this->renderFooter();
    }

    // fetch list of all forms
    function fetchAllForms () {
      global $wpdb;
      $table_name = $wpdb->prefix . "dx_forms_meta_data";
      $dbResults = $wpdb->get_results( "SELECT * FROM $table_name" );

      echo "<h1>All forms</h1>";

      // loop through all forms
      foreach ($dbResults as $row) {
        ?>
          <div>Created on: <?= date("F j, Y. g:i A",strtotime($row->timestamp)) ?></div>
          <div><?= $row->form_name ?></div>
          <!-- <br><br> -->
          <h3>Form details</h3>
        <?php
        $this->fetchFormData($row->form_id);
      }

      echo "<hr>";
    }

    // fetch data for a particular form
    function fetchFormData ($formId) {
      global $wpdb;
      $table_name = $wpdb->prefix . "dx_forms_data";
      $dbResults = $wpdb->get_results( "SELECT * FROM $table_name WHERE form_id = '$formId'" );
      
      // loop through all form submissions (i.e., messages)
      foreach ($dbResults as $row) {
        // pretty print date
        echo date("F j, Y. g:i A",strtotime($row->timestamp));
        echo "<br>";
        
        // print form data in "field : value" format
        $formData = json_decode($row->data);
        foreach ($formData as $column => $value) {
          echo($column . " : " . $value);
          echo "<br>";
        }

        echo "<hr>";
      }
    }

    function renderFooter () {
      ?>
        <footer>
          <div>
            Created by <a href="https://www.debojyotighosh.com" target="_blank">Debojyoti Ghosh</a>.
          </div>
        </footer>
      <?php
    }
  }

?>