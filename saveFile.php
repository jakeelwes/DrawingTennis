<?php

$dir = "svgs/";
$count = -2; // because of ./ and  ../

// Open a directory, and read its contents
if (is_dir($dir)){
  if ($dh = opendir($dir)){
    while (($file = readdir($dh)) !== false){
      // echo "filename:" . $file . "<br>";
      $count++;
    }
  }
}

  $fh = fopen('./svgs/' . 'img' . $count . '.svg', 'a');

  fwrite($fh, print_r($_REQUEST, true));

  fclose($fh);

?>
