<?
$file="log.svg";
$text=serialize($_POST);
$fh = fopen($file, 'a') or die();
    fwrite($fh, $text."\n");
    fclose($fh);
}
?>
