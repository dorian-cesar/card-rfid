<?php
include '../php/db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];

    $sql = "DELETE FROM cardConductores WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Conductor eliminado exitosamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al eliminar el conductor."]);
    }

    $stmt->close();
    $conn->close();
}
?>
