import React from 'react';

function Login() {
  return (
    <div>
        <form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Correo electronico</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
      <div id="emailHelp" class="form-text">Tu informacion no sera compartida</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Contraseña</label>
      <input type="password" class="form-control" id="exampleInputPassword1"></input>
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Enviar</button>
</form>
    </div>
  );
}

export default Login;
