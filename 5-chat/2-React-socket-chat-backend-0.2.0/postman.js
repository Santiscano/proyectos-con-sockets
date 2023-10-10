/**
 * creamos en configuracion una variable de entorno y con esa variable de entorno
 * con esa variable hacemos el siguiente codigo
 * jsonData es la respuesta y el valor token dependeria de como yo lo definiera en el backend
 * es decir si yo entrego es jwtoken entonces seria jsonData.jwtoken
 * 
 */
const jsonData = pm.response.json();

pm.test('token guardado', () => {
    pm.environment.set('token', jsonData.token)
})


// PARA PROBARLO O ASIGNARLO SERIA EN EL VALUE QUE SE NECESITE COMO
// {{token}}