<?php

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");

// Permitir los métodos de solicitud que se utilizarán
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Permitir ciertos encabezados en las solicitudes preflight OPTIONS, incluido Content-Type
header("Access-Control-Allow-Headers: Content-Type");


$servername = "ls-8ce02ad0b7ea586d393e375c25caa3488acb80a5.cylsiewx0zgx.us-east-1.rds.amazonaws.com";
$username = "dbmasteruser";
$password = ':&T``E~r:r!$1c6d:m143lzzvGJ$NuP;';
$dbname = "interurbano"; // Nombre de la base de datos


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
