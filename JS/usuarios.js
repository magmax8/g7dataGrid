// Array de Usuarios inicial contine objetos por cada usuario
const usuarios = [
        { idUser: 1,
          tDoc: "CC",
          nDoc: "111111",
          nombre: "Lukas Pérez",
          correo: "lukas@gmail.com",
          clave: "123" 
        },
        { idUser: 2,
            tDoc: "Ex",
            nDoc: "222222",
            nombre: "Sofía Salas",
            correo: "sofi@gmail.com",
            clave: "345" 
          }
];

// Mostrar lista de usuarios cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarTablaUsuarios();
});



function registrarUsuario() {
    // Obtener los valores de los inputs
    const tDoc = document.getElementById('tDoc').value;
    const nroDoc = document.getElementById('nroDoc').value;
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;

    // Validar que todos los campos estén llenos
    if (!tDoc || !nroDoc || !nombre || !correo || !clave) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Crear un nuevo objeto usuario
    const nuevoUsuario = {
        idUser: usuarios.length + 1, // Asignar un nuevo ID
        tDoc: tDoc,
        nDoc: nroDoc,
        nombre: nombre,
        correo: correo,
        clave: clave
    };

    // Agregar el nuevo usuario al array de usuarios
    usuarios.push(nuevoUsuario);

    // Opcional: Limpiar el formulario
    document.querySelector('.formulario').reset();

    // Informar al usuario que se registró correctamente
    alert('Usuario registrado exitosamente!');
    console.log(usuarios); // Mostrar el array actualizado en la consola

    // Actualizar la tabla de usuarios
    actualizarTablaUsuarios();
};


function actualizarTablaUsuarios() {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos elementos

    // Iterar sobre el array de usuarios y crear filas
    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${usuario.idUser}</th>
            <td>${usuario.tDoc}</td>
            <td>${usuario.nDoc}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>
                <button class="btnMenu" onmouseover="mouseOn(this)" onmouseout="mouseOff(this)">Ver</button>
                <button class="btnMenu" onmouseover="mouseOn(this)" onmouseout="mouseOff(this)" onclick="editarUsuario(${usuario.idUser})" > Edit</button>
                <button class="btnMenu" onmouseover="mouseOn(this)" onmouseout="mouseOff(this)">Delete</button>
            </td>
        `; //OJO con la comilla que sierra
        tbody.appendChild(row);
    });
}


let usuarioEnEdicion = null; // Para almacenar el usuario que se está editando
function editarUsuario(idUser) {
    // Buscar el usuario por ID
    usuarioEnEdicion = usuarios.find(usuario => usuario.idUser === idUser);
    if (usuarioEnEdicion) {
        // Cargar los datos en el formulario
        document.getElementById('tDoc').value = usuarioEnEdicion.tDoc;
        document.getElementById('nroDoc').value = usuarioEnEdicion.nDoc;
        document.getElementById('nombre').value = usuarioEnEdicion.nombre;
        document.getElementById('correo').value = usuarioEnEdicion.correo;
        document.getElementById('clave').value = usuarioEnEdicion.clave;
        // Cambiar el texto y la función al button
        var boton = document.getElementById('submitButton');
        boton.textContent = 'Save Edit';
        boton.onclick = saveEdit;

        // Asignar una función anónima para evitar la ejecución inmediata
        boton.onclick = function() {
            saveEdit(idUser);
        };
    }
}

function saveEdit(idUser){
    // Obtener los valores de los inputs
    const tDoc = document.getElementById('tDoc').value;
    const nroDoc = document.getElementById('nroDoc').value;
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const clave = document.getElementById('clave').value;

    // Validar que todos los campos estén llenos
    if (!tDoc || !nroDoc || !nombre || !correo || !clave) {
        alert('Por favor, complete todos los campos.');
        return;
    } else {
        // Crear el objeto a editar
        const datosUsuario = {
            idUser: idUser,
            tDoc: tDoc,
            nDoc: nroDoc,
            nombre: nombre,
            correo: correo,
            clave: clave
        };
        const usuarioEdicion = usuarios.find(usuario => usuario.idUser === idUser);
        if (usuarioEdicion){
            Object.assign(usuarioEdicion,datosUsuario);
            alert('Los datos de ' + usuarioEdicion.nombre + ' fueron modificados con Éxito');
        }else { 
            alert('Error no se logro actulizar los datos de ' + usuarioEdicion.nombre);
        }
        // Opcional: Limpiar el formulario
        document.querySelector('.formulario').reset();
        // Cambiar el texto y la función al button
        var boton = document.getElementById('submitButton');
        boton.textContent = 'New User';
        boton.onclick = registrarUsuario;

        // Actualizar la tabla de usuarios
        actualizarTablaUsuarios();
    }
}