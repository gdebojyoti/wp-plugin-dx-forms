<?php

  /*
    Plugin Name: Dx Forms
    Description: The ultimate form plugin for WP Gutenberg
    Version: 0.1
    Author: Debojyoti "D3XT3R" Ghosh
    Author URI: https://www.debojyotighosh.com/
  */

  // exit if accessed directly
  if (!defined('ABSPATH')) {
    exit;
  }

  if (!defined('DX_FORMS_PLUGIN_PATH')) {
    define('DX_FORMS_PLUGIN_PATH', plugins_url('', __FILE__));
  }

  class DxForms {
    function __construct () {
      add_action( 'init', array($this, "adminAssets") );
      add_action( 'block_categories_all', array($this, "addBlockCategory") );

      // create table for form
      require_once('php/DxFormsDatabase.php');
      $dxFormsDatabase = new DxFormsDatabase();
      $dxFormsDatabase->createTable();
      
      // event listener for when post is updated
      add_action( 'post_updated', array($dxFormsDatabase, "saveFormMetaData"), 10, 3 );

      // create setting page in admin panel
      require_once('php/DxFormsAdmin.php');
      new DxFormsAdmin();
    }

    function adminAssets () {
      wp_register_script(
        'dx-forms',
        plugins_url( 'build/index.js', __FILE__ ),
        array(
          'wp-blocks',
          'wp-element',
          'wp-edit-post'
        )
      );

      require_once('php/DxFormsOutput.php');
      $output = new DxFormsOutput();

      register_block_type( 'dx-forms/form', array(
        'editor_script' => 'dx-forms',
        'render_callback' => array($output, 'render')
      ) );

      register_block_type( 'dx-forms/input', array(
        'editor_script' => 'dx-forms',
        'render_callback' => array($output, 'renderInput')
      ) );
    }

    // create a new category for all blocks
    function addBlockCategory ($block_categories) {
      return array_merge(
        $block_categories,
        [
          [
            'slug'  => 'dx-blocks',
            'title' => 'Dx Blocks',
            'icon'  => 'wordpress', // Slug of a WordPress Dashicon or custom SVG
          ],
        ]
      );
    }
  }

  $dxForms = new DxForms();
  
?>