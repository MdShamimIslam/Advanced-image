<?php
/**
 * Plugin Name: Advanced Image Block
 * Description: A customizable image block with enhanced editing and display features..
 * Version: 1.0.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: b-blocks 
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'ADIB_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'ADIB_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'ADIB_DIR_PATH', plugin_dir_path( __FILE__ ) );

if( !class_exists( 'ADIBPlugin' ) ){
	class ADIBPlugin{
		function __construct(){
			add_action( 'init', [ $this, 'onInit' ] );
		}

		function onInit(){
			register_block_type( __DIR__ . '/build' );
		}
	}
	new ADIBPlugin();
}