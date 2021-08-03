<?php

  // this class is responsible for handling everything related to MySQL DB

  class DxFormsDatabase {
    // TODO: this should run only once
    function createTable () {
      global $wpdb;
      $table_name = $wpdb->prefix . "dx_forms_data";
      $charset_collate = $wpdb->get_charset_collate(); // TODO: find out wtf this is
      // $mylink = $wpdb->get_row( "SELECT * FROM $table_name WHERE form_id = 111" );
      // print_r($mylink);

      $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        timestamp timestamp NOT NULL default CURRENT_TIMESTAMP,
        form_id varchar(20) DEFAULT '' NOT NULL,
        data varchar(10000) DEFAULT '' NOT NULL,
        UNIQUE KEY id (id)
      ) $charset_collate;";

      require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
      dbDelta( $sql );
    }

    // save data to DB when user submits form
    // return true if successful
    function saveFormData ($formData) {
      // exit if form is not valid (i.e., was not created by "Dx Forms")
      $formId = $formData['form_id'];
      if (!$formId) {
        return;
      }
      
      // remove form_id from form data
      unset($formData['form_id']);

      global $wpdb;
      $table_name = $wpdb->prefix . "dx_forms_data";
      $wpdb->insert($table_name, array(
        "form_id" => $formId,
        "data" => json_encode($formData)
      ));

      return true;
    }

    // save form meta data to DB when user updates a post
    function saveFormMetaData ($postId, $post_after, $post_before) {
      $post = get_post($postId);
      $blocks = parse_blocks($post->post_content);

      foreach ($blocks as $block) {
        foreach ($block as $key => $value) {
          // TODO: use constant for plugin name
          if ($key == "blockName" && $value == "dx-forms/form") {
            $attributes = $block['attrs'];
            $info = $attributes['info'];

            $formId = $info['id'];
            $formName = $info['name'];
          }
        }
      }

      if ($formId) {
        // TODO: create table if not available
        // TODO: separate fields for created_at & updated_at
        global $wpdb;
        $table_name = $wpdb->prefix . "dx_forms_meta_data";
        $wpdb->replace($table_name, array(
          "form_id" => $formId,
          "form_name" => $formName,
          "post_id" => $postId
        ));
      }
    }
  }

?>