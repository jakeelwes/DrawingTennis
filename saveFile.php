<?php

$dir = "svgs/";
$count = -2;

// Open a directory, and read its contents
if (is_dir($dir)){
  if ($dh = opendir($dir)){
    while (($file = readdir($dh)) !== false){
      // echo "filename:" . $file . "<br>";
      $count++;
    }
  }
}

$target_dir = "svgs/";
$target_file = $target_dir . basename($_FILES["fileToUpload"][$count]["name"]);
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
?>
