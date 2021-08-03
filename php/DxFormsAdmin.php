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
      ?>
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

        <hr><hr>

        <h3>Form details</h3>
        <!-- TODO: fetch form IDs dynamically from a separate table (form meta data) -->
        <?php $this->fetchData("111") ?>
        <!-- <?php $this->fetchData("form-1627941872878") ?> -->
      </form>
      <?php
    }

    function fetchData ($formId) {
      global $wpdb;
      $table_name = $wpdb->prefix . "dx_forms_data";
      $charset_collate = $wpdb->get_charset_collate(); // TODO: find out wtf this is
      $myLink = $wpdb->get_results( "SELECT * FROM $table_name WHERE form_id = '$formId'" );
      
      // loop through all form submissions (i.e., messages)
      foreach ($myLink as $row) {
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
  }

?>