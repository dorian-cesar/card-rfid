<?php
include '../php/db.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $rut = $_POST['rut'];
    $nombre = $_POST['nombre'];
    $fecha = $_POST['fecha'];
    $rfid = $_POST['rfid'];

    // Verificar si el RUT o RFID ya existen y no son del mismo registro que se está actualizando
    $checkSql = "SELECT * FROM cardConductores WHERE (rut = ? OR rfid = ?) AND id != ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("ssi", $rut, $rfid, $id);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "El RUT o RFID ya existen en otro registro."]);
    } else {
        $sql = "UPDATE cardConductores SET rut=?, nombre=?, fecha=?, rfid=? WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssi", $rut, $nombre, $fecha, $rfid, $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Conductor actualizado exitosamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al actualizar el conductor."]);
        }

        $stmt->close();
    }
    $checkStmt->close();
    $conn->close();
}
