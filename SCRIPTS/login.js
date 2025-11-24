(function(){
  const fonts = ["cursive","sans-serif","serif","monospace"];
  let captchaValue = "";
  
  // Lista de usuarios
  const usuarios = {
    "Enzo": "1234",
    "wilson":"9876",
    "Said": "5678",
    "Nahuel": "pass123"
    
  };

  function generateCaptcha(){
    let value = btoa(Math.random()*1000000000);
    value = value.substr(0,5+Math.random()*5);
    captchaValue = value;
  }

  function setCaptcha(){
    let html = captchaValue.split("").map((char)=>{
      const rotate = -20 + Math.trunc(Math.random()*30);
      const font = Math.trunc(Math.random()*fonts.length);
      return `<span
        style="transform:rotate(${rotate}deg); font-family:${fonts[font]}">
        ${char}
      </span>`;
    }).join("");
    document.querySelector(".login-form .captcha .preview").innerHTML = html;
  }

  function initCaptcha(){
    document.querySelector(".captcha-refresh").addEventListener("click",function(){
      generateCaptcha();
      setCaptcha();
    });
    generateCaptcha();
    setCaptcha();
  }

  initCaptcha();

  document.querySelector("#login-btn").addEventListener("click", function(){

    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let inputCaptchaValue = document.querySelector(".captcha input").value;

    // Validación de captcha
    if(inputCaptchaValue !== captchaValue){
      swal("Captcha incorrecto");
      return;
    }

    // Validación de usuario
    if(usuarios[username] && usuarios[username] === password){
    swal("Bienvenido " + username, "Login exitoso", "success")
      .then(() => {
        // Redirección
        window.location.href = "INDEX.html";  // <--- cámbialo si tu archivo tiene otra ruta
      });
  } else {
    swal("Usuario o contraseña incorrectos");
  }
  });

})();
