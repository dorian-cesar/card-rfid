$(document).ready(function () {
    let editMode = false;
    let editId = null;
    url='https://interurbano.wit.la/card-rfid/php/';

    leerConductores();
    cargarNombres();

    $('#saveButton').on('click', function () {
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
                $.post(url+'update.php', data, function (response) {
                    alert(response.message);
                    if (response.success) {
                        leerConductores();
                        $('#conductorModal').modal('hide');
                    }
                }, 'json');
            } else {
                $.post(url+'create.php', data, function (response) {
                    alert(response.message);
                    if (response.success) {
                        leerConductores();
                        $('#conductorModal').modal('hide');
                    }
                }, 'json');
            }

            $('#conductorForm')[0].reset();
        }
    });

    function leerConductores() {
        $.get(url+'read.php', function (conductores) {
            $('#conductoresCardContainer').empty();
            conductores.forEach(conductor => {
                agregarConductorACards(conductor);
            });
        }, 'json');
    }

    function agregarConductorACards(conductor) {
        const card = `
        <div class="card mt-2" id="conductor-${conductor.id}">
          <div class="card-body">
            <h5 class="card-title">${conductor.nombre}</h5>
            <p class="card-text">RUT: ${conductor.rut}</p>
            <p class="card-text">Fecha: ${conductor.fecha}</p>
            <p class="card-text">NFC: ${conductor.rfid}</p>
              <div id="botonera">
                <button class="btn btn-success " onclick="editarConductor(${conductor.id})">  Editar  </button>
                <button class="btn btn-secondary " onclick="eliminarConductor(${conductor.id})">Eliminar</button>
            </div>
          </div>
        </div>
      `;
        $('#conductoresCardContainer').append(card);
    }

    window.editarConductor = function (id) {
        $.get(url+'read.php', function (conductores) {
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

    window.eliminarConductor = function (id) {
        $.post(url+'delete.php', { id: id }, function (response) {
            alert(response.message);
            if (response.success) {
                leerConductores();
            }
        }, 'json');
    };

    $('#conductorModal').on('hidden.bs.modal', function () {
        $('#conductorForm')[0].reset();
        $('#conductorModalLabel').text('Asignar Tarjeta RFID');
        $('#saveButton').text('Guardar');
        editMode = false;
        editId = null;
    });

   /* $('#conductorModal').on('show.bs.modal', function () {
        cargarNombres();
    });*/

    function cargarNombres() {
        $.get('https://dev.wit.la/api/gpsemploy', function (response) {
            const selectNombre = $('#nombre');
            selectNombre.empty();
            selectNombre.append('<option value="" disabled selected>Selecciona un nombre</option>');

            response.forEach(person => {
                selectNombre.append(`<option value="${person.first_name} ${person.last_name}">${person.first_name} ${person.last_name}</option>`);
            });
        });
    }
});
