<?php
$dir = "svgs/";
$count = -2;

// Open a directory, and read its contents
if (is_dir($dir)){
  if ($dh = opendir($dir)){
    while (($file = readdir($dh)) !== false){
      echo "filename:" . $file . "<br>";
      $count++;
    }
    closedir($dh);
    echo $count;
  }
}
?>
