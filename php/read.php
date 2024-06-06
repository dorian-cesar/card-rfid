<?php
include '../php/db.php';

$sql = "SELECT * FROM cardConductores";
$result = $conn->query($sql);

$conductores = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $conductores[] = $row;
    }
}

echo json_encode($conductores);

$conn->close();
?>
