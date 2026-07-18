import { Usuario } from "../models/usuario";
import { UsuarioRepository } from "../data/usuarioRepository";
import { obtenerUsuariosAPI } from "../client/cliente";

export class UsuarioService {

    private repository = new UsuarioRepository();

    async listar(): Promise<Usuario[]> {

        return await this.repository.obtenerUsuarios();

    }

    async agregar(usuario: Usuario): Promise<void> {

        try {

            const usuarios = await this.repository.obtenerUsuarios();

            usuarios.push(usuario);

            await this.repository.guardarUsuarios(usuarios);

            console.log("Usuario agregado.");

        } catch (error) {

            console.log("Error al agregar usuario.");

        }

    }

    async buscar(id: number): Promise<Usuario | undefined> {

        const usuarios = await this.repository.obtenerUsuarios();

        return usuarios.find(u => u.id === id);

    }

    async actualizar(usuario: Usuario): Promise<boolean> {

        try {

            const usuarios = await this.repository.obtenerUsuarios();

            const indice = usuarios.findIndex(
                u => u.id === usuario.id
            );

            if (indice === -1) {

                return false;

            }

            usuarios[indice] = usuario;

            await this.repository.guardarUsuarios(usuarios);

            return true;

        } catch (error) {

            return false;

        }

    }

    async eliminar(id: number): Promise<boolean> {

        try {

            const usuarios = await this.repository.obtenerUsuarios();

            const nuevos = usuarios.filter(
                u => u.id !== id
            );

            if (usuarios.length === nuevos.length) {

                return false;

            }

            await this.repository.guardarUsuarios(nuevos);

            return true;

        } catch (error) {

            return false;

        }

    }

async importarDesdeAPI(): Promise<void> {

    try {

        const usuariosAPI = await obtenerUsuariosAPI();

        if (usuariosAPI.length === 0) {

            console.log(
                "No se recibieron datos."
            );

            return;

        }

        const usuarios: Usuario[] =
            usuariosAPI.map((u: any) => ({

                id: u.id,
                nombre: u.name,
                email: u.email,
                telefono: u.phone

            }));

        await this.repository.guardarUsuarios(
            usuarios
        );

        console.log(
            "Usuarios importados correctamente."
        );

    } catch (error) {

        console.log(error);

    }

}

}