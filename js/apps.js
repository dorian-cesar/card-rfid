$(document).ready(function() {
  let editMode = false;
  let editId = null;

  // Leer conductores al cargar la página
  leerConductores();

  $('#saveButton').on('click', function() {
    const rut = $('#rut').val().trim();
    const nombre = $('#nombre').val().trim();
    const rfid = $('#rfid').val().trim();
    const fecha = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

    if (rut && nombre && rfid) {
      const data = {
        rut: rut,
        nombre: nombre,
        fecha: fecha,
        rfid: rfid
      };

      if (editMode) {
        data.id = editId;
        $.post('./php/update.php', data, function(response) {
          if (response.success) {
            leerConductores();
          }
          alert(response.message);
        }, 'json');
        editMode = false;
        editId = null;
      } else {
        $.post('./php/create.php', data, function(response) {
          if (response.success) {
            leerConductores();
          }
          alert(response.message);
        }, 'json');
      }

      $('#conductorForm')[0].reset();
      $('#conductorModal').modal('hide');
    }
  });

  function leerConductores() {
    $.get('./php/read.php', function(conductores) {
      $('#conductoresTableBody').empty();
      conductores.forEach(conductor => {
        agregarConductorATabla(conductor);
      });
    }, 'json');
  }

  function agregarConductorATabla(conductor) {
    const row = `
      <tr id="conductor-${conductor.id}">
        <td>${conductor.id}</td>
        <td>${conductor.rut}</td>
        <td>${conductor.nombre}</td>
        <td>${conductor.fecha}</td>
        <td>${conductor.rfid}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarConductor(${conductor.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarConductor(${conductor.id})">Eliminar</button>
        </td>
      </tr>
    `;
    $('#conductoresTableBody').append(row);
  }

  window.editarConductor = function(id) {
    $.get('./php/read.php', function(conductores) {
      const conductor = conductores.find(conductor => conductor.id == id);
      if (conductor) {
        $('#rut').val(conductor.rut);
        $('#nombre').val(conductor.nombre);
        $('#rfid').val(conductor.rfid);
        $('#conductorId').val(conductor.id);
        $('#conductorModalLabel').text('Editar Conductor');
        $('#saveButton').text('Actualizar');
        $('#conductorModal').modal('show');
        editMode = true;
        editId = id;
      }
    }, 'json');
  };

  window.eliminarConductor = function(id) {
    $.post('./php/delete.php', { id: id }, function(response) {
      if (response.success) {
        leerConductores();
      }
      alert(response.message);
    }, 'json');
  };

  $('#conductorModal').on('hidden.bs.modal', function () {
    $('#conductorForm')[0].reset();
    $('#conductorModalLabel').text('Asignar Tarjeta RFID');
    $('#saveButton').text('Guardar');
    editMode = false;
    editId = null;
  });
});
