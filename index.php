<html>
<head>
  <!-- <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"> -->
  <!-- for iphone check doc https://github.com/processing/p5.js/issues/350 -->
  <title>DrawingTennis</title>

  <script src="js/p5.js"></script>
  <script src="js/p5.svg.js"></script>
  <script src="js/dat.gui.min.js"></script>
  <script src="js/jquery-2.1.4.min.js"></script>

  /*<style>
  div#defaultCanvas {
      padding: 0;
      margin: auto;
      display: block;
      width: 800px;
      height: 600px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-style: solid;
      border-color: #ffffff;
  }
  </style>*/

</head>

<body bgcolor="#000000">

  <div id="dom-target" style="display: none;">
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
        closedir($dh);
        // echo $count;
        echo htmlspecialchars($count);
      }
    }
    ?>
  </div>

    <div id="canvas"></div>
    <script src="script.js"></script>

</body>
</html>