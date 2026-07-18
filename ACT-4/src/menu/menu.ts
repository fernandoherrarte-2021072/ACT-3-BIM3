import { rl } from "../utils/readline";
import { UsuarioService } from "../services/usuarioService";

const service = new UsuarioService();

export async function menu() {

    let opcion = 0;

    do {

        console.log("\n===== CRUD USUARIOS =====");
        console.log("1. Agregar");
        console.log("2. Listar");
        console.log("3. Buscar");
        console.log("4. Actualizar");
        console.log("5. Eliminar");
        console.log("6. Importar usuarios desde API");
        console.log("7. Salir");

        opcion = Number(await rl.question("Opción: "));

        switch (opcion) {

            case 1:

                const id = Number(await rl.question("ID: "));
                const nombre = await rl.question("Nombre: ");
                const email = await rl.question("Email: ");
                const telefono = await rl.question("Telefono: ");

                await service.agregar({
                    id,
                    nombre,
                    email,
                    telefono
                });

            break;

            case 2:

                console.table(await service.listar());

            break;

            case 3:

                const buscar = Number(await rl.question("ID: "));

                console.log(await service.buscar(buscar));

            break;

            case 4:

                const idActualizar = Number(
                    await rl.question("ID: ")
                );

                const nombreNuevo = await rl.question("Nombre: ");
                const emailNuevo = await rl.question("Email: ");
                const telefonoNuevo = await rl.question("Telefono: ");

                const actualizado = await service.actualizar({

                    id: idActualizar,
                    nombre: nombreNuevo,
                    email: emailNuevo,
                    telefono: telefonoNuevo

                });

                console.log(
                    actualizado
                        ? "Actualizado"
                        : "No existe"
                );

            break;

            case 5:

                const eliminar = Number(
                    await rl.question("ID: ")
                );

                const eliminado = await service.eliminar(eliminar);

                console.log(
                    eliminado
                        ? "Eliminado"
                        : "No encontrado"
                );

            break;

            case 6:

                await service.importarDesdeAPI();

            break;

        }

    } while (opcion !== 7);

    rl.close();

}