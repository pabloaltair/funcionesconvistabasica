// Función para registrar un usuario mediante AJAX con validación de campos y duplicados
function registerUser() {
    const username = $('#registerUsername').val().trim();
    const email = $('#registerEmail').val().trim();
    const password = $('#registerPassword').val().trim();
  
    if (!username || !email || !password) {
      $('#result').text('Por favor, complete todos los campos.');
      return;
    }
  
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'GET',
      success: function(users) {
        const userExists = users.some(u => u.username === username || u.email === email);
  
        if (userExists) {
          $('#result').text('El nombre de usuario o correo electrónico ya están registrados. Por favor, elija otros.');
        } else {
          $.ajax({
            url: 'http://localhost:3000/users',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ username, email, password }),
            success: function(response) {
              $('#result').text('Usuario registrado exitosamente. ID: ' + response.id);
              $('#registerForm')[0].reset();
            },
            error: function(error) {
              $('#result').text('Error al registrar el usuario.');
            }
          });
        }
      },
      error: function(error) {
        $('#result').text('Error al verificar el usuario.');
      }
    });
  }
  
  // Función para iniciar sesión con nombre de usuario o correo electrónico y contraseña
  function loginUser() {
    const identifier = $('#loginUsername').val().trim();
    const password = $('#loginPassword').val().trim();
  
    if (!identifier || !password) {
      $('#result').text('Por favor, complete todos los campos.');
      return;
    }
  
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'GET',
      success: function(users) {
        const user = users.find(u => (u.username === identifier || u.email === identifier) && u.password === password);
  
        if (user) {
          $('#result').text('Inicio de sesión exitoso. Bienvenido, ' + user.username + '!');
          $('#loginForm')[0].reset();
        } else {
          $('#result').text('Nombre de usuario/correo o contraseña incorrectos.');
        }
      },
      error: function(error) {
        $('#result').text('Error al intentar iniciar sesión.');
      }
    });
  }
  
  // Función para borrar un usuario con confirmación
  function deleteUser() {
    const identifier = $('#deleteUsername').val().trim();
    const password = $('#deletePassword').val().trim();
  
    if (!identifier || !password) {
      $('#result').text('Por favor, complete todos los campos.');
      return;
    }
  
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'GET',
      success: function(users) {
        const user = users.find(u => (u.username === identifier || u.email === identifier) && u.password === password);
  
        if (user) {
          if (confirm(`¿Está seguro de que desea eliminar al usuario "${user.username}"?`)) {
            $.ajax({
              url: `http://localhost:3000/users/${user.id}`,
              type: 'DELETE',
              success: function(response) {
                $('#result').text('Usuario eliminado exitosamente.');
                $('#deleteForm')[0].reset();
              },
              error: function(error) {
                $('#result').text('Error al eliminar el usuario.');
              }
            });
          }
        } else {
          $('#result').text('Nombre de usuario/correo o contraseña incorrectos.');
        }
      },
      error: function(error) {
        $('#result').text('Error al intentar eliminar el usuario.');
      }
    });
  }
  