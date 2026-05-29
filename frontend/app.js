function registrar() {
    console.log("Intentando registrar...");

    fetch(API + "/usuarios/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: document.getElementById("nombre").value,
            correo: document.getElementById("correo").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => {
        console.log("Respuesta recibida:", res);
        return res.json();
    })
    .then(data => {
        console.log("Respuesta JSON:", data);
        alert("Usuario creado ✅");
    })
    .catch(error => {
        console.error("ERROR:", error);
        alert("Algo falló ❌");
    });
}
