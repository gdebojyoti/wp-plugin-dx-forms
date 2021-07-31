<?php

  /*
    Plugin Name: Ultimate Forms Dx
    Description: His first plugin
    Version: 0.1
    Author: Debojyoti "D3XT3R" Ghosh
    Author URI: https://www.debojyotighosh.com/
  */

  // exit if accessed directly
  if (!defined('ABSPATH')) {
    exit;
  }

  class DxForms {
    function __construct () {
      add_action( 'init', array($this, "adminAssets") );
    }

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