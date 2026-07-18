const URL = "https://jsonplaceholder.typicode.com/users";

export async function obtenerUsuariosAPI(): Promise<any[]> {

    try {

        console.log("Consumiendo API...");

        const inicio = Date.now();

        const respuesta = await fetch(URL);

        if (!respuesta.ok) {

            throw new Error(
                `Error HTTP: ${respuesta.status}`
            );

        }

        const usuarios = await respuesta.json();

        const fin = Date.now();

        console.log(
            `Tiempo de ejecución: ${fin - inicio} ms`
        );

        return usuarios;

    } catch (error) {

        console.log(
            "Error al consumir API:"
        );

        console.log(error);

        return [];

    }

}