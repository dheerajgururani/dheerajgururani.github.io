<!DOCTYPE html>
<html>

<head>
    <title>File Upload</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        form {
            margin-bottom: 20px;
        }

        pre {
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <h1>File Upload</h1>

    <?php
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $tmp_name = $file['tmp_name'];
        $output = shell_exec("sh hello.sh $tmp_name");
        echo "<pre>$output</pre>";
    }
    ?>

    <form method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <input type="submit" value="Upload">
    </form>
</body>

</html>