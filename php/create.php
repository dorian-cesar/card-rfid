<?php
include '../php/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $rut = $_POST['rut'];
    $nombre = $_POST['nombre'];
    $fecha = $_POST['fecha'];
    $rfid = $_POST['rfid'];

    // Verificar si el RUT o RFID ya existen
    $checkSql = "SELECT * FROM cardConductores WHERE rut = ? OR rfid = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("ss", $rut, $rfid);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "El RUT o RFID ya existen."]);
    } else {
        $sql = "INSERT INTO cardConductores (rut, nombre, fecha, rfid) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", $rut, $nombre, $fecha, $rfid);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Conductor creado exitosamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al crear el conductor."]);
        }

        $stmt->close();
    }
    $checkStmt->close();
    $conn->close();
}
?>
