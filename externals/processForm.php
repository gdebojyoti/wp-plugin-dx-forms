<?php

  $formData = $_POST;

  // status flags; 0 = success, 1 = error
  $res = Array(
    "status" => 1
  );
  
  if (isset($formData) && count($formData) > 0) {
    // TODO: check if there is a way to avoid loading wp
    // load wordpress stuff
    $path = preg_replace('/wp-content.*$/', '', __DIR__);
    require_once($path . "wp-load.php");

    // save details in DB
    require_once('../php/DxFormsDatabase.php'); // TODO: avoid relative URL
    $dxFormsDatabase = new DxFormsDatabase();
    $submitted = $dxFormsDatabase->saveFormData($formData);

    if ($submitted) {
      $res["status"] = 0;
    }
  }

  header('Content-Type: application/json');
  echo json_encode($res);

?>