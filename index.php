<?php

  /*
    Plugin Name: Ultimate Forms Dx
    Description: His first plugin
    Version: 0.1
    Author: Debojyoti "D3XT3R" Ghosh
    Author URI: https://www.debojyotighosh.com/
  */

  // add_filter('the_content', 'addToEndOfPost');

  // function addToEndOfPost ($content) {
  //   if (is_single() && is_main_query()) {
  //     return $content
  //       . "<p>This is an auto-generated line.. "
  //       . "<p>A second new line..";
  //   }
  //   return $content;
  // }

  // exit if accessed directly
  if (!defined('ABSPATH')) {
    exit;
  }

  class DxForms {
    function __construct () {
      // add_action('admin_menu', array($this, "init"));
      add_action( 'init', array($this, "adminAssets") );
    }

    // function init () {
    //   add_options_page(
    //     "Dx Forms Title", // page title
    //     "Dx Forms", // menu name
    //     "manage_options", // priviledges
    //     "dx-forms", // uri
    //     array($this, "renderHtml")
    //   );
    // }

    function adminAssets () {
      wp_register_script(
        'dx-forms-field',
        plugins_url( 'build/index.js', __FILE__ ),
        array(
          'wp-blocks',
          'wp-element',
          'wp-edit-post'
        )
      );

      register_block_type( 'dx-forms/field', array(
        'editor_script' => 'dx-forms-field',
        'render_callback' => array($this, 'renderHtml')
      ) );
    }

    function renderHtml ($attributes) {
      ob_start(); ?>
      <p>
        <button><?= esc_html($attributes['cta']) ?></button>
      </p>
      <?php return ob_get_clean();
    }
  }

  $dxForms = new DxForms();
  
?>