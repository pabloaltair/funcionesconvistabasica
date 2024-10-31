// Función para registrar un usuario mediante AJAX
function registerUser() {
    const username = $('#registerUsername').val();
    const password = $('#registerPassword').val();
  
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: function(response) {
        $('#result').text('Usuario registrado exitosamente. ID: ' + response.id);
        $('#registerForm')[0].reset();
      },
      error: function(error) {
        $('#result').text('Error al registrar el usuario.');
      }
    });
  }
  
  // Función para iniciar sesión mediante AJAX
  function loginUser() {
    const username = $('#loginUsername').val();
    const password = $('#loginPassword').val();
  
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'GET',
      success: function(users) {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          $('#result').text('Inicio de sesión exitoso. Bienvenido, ' + username + '!');
        } else {
          $('#result').text('Nombre de usuario o contraseña incorrectos.');
        }
      },
      error: function(error) {
        $('#result').text('Error al intentar iniciar sesión.');
      }
    });
  }
  
  // Función para borrar un usuario mediante AJAX
  function deleteUser() {
    const username = $('#deleteUsername').val();
    const password = $('#deletePassword').val();
  
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'GET',
      success: function(users) {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          if (confirm('¿Estás seguro de que deseas eliminar el usuario?')) {
            $.ajax({
              url: `http://localhost:3000/users/${user.id}`, // Eliminar por ID de usuario
              type: 'DELETE',
              success: function() {
                $('#result').text('Usuario eliminado exitosamente.');
                $('#deleteForm')[0].reset(); // Limpiar formulario de eliminación
              },
              error: function(error) {
                $('#result').text('Error al intentar eliminar el usuario.');
              }
            });
          } else {
            $('#result').text('Eliminación de usuario cancelada.');
          }
        } else {
          $('#result').text('Nombre de usuario o contraseña incorrectos.');
        }
      },
      error: function(error) {
        $('#result').text('Error al intentar eliminar el usuario.');
      }
    });
  }

  





  maxlength