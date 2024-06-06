<?php
include '../php/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $rut = $_POST['rut'];
    $nombre = $_POST['nombre'];
    $fecha = $_POST['fecha'];
    $rfid = $_POST['rfid'];

    $sql = "UPDATE cardConductores SET rut=?, nombre=?, fecha=?, rfid=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssi", $rut, $nombre, $fecha, $rfid, $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Conductor actualizado exitosamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar el conductor."]);
    }

    $stmt->close();
    $conn->close();
}
?>
