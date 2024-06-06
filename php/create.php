<?php
include '../php/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $rut = $_POST['rut'];
    $nombre = $_POST['nombre'];
    $fecha = $_POST['fecha'];
    $rfid = $_POST['rfid'];

    $sql = "INSERT INTO cardConductores (rut, nombre, fecha, rfid) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $rut, $nombre, $fecha, $rfid);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Conductor creado exitosamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al crear el conductor."]);
    }

    $stmt->close();
    $conn->close();
}
?>
