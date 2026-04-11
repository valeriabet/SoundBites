from cliente import Cliente #Importacion del cliente
from  administrador import Administrador #Importacion del administrador

class SistemaUsuarios:
    def __init__(self): #Constructor que incializa una lista de los usuarios
        self.usuarios = []
        
    def registro(self, nombre, correo, contraseña, rol): #Metodo para registrar un usuario
        if self.buscar_correo(correo): #Valida si ya existe otro usuario con el mismo correo
            return "Error, ya existe un usuario registrado con ese correo"
        
        rol = rol.strip().lower()
        
        #Se valida el rol para crear el usuario cliente o administrador
        if rol == "cliente": 
            nuevo_usuario = Cliente(nombre, correo, contraseña)
        elif rol == "administrador":
            nuevo_usuario = Administrador(nombre, correo, contraseña)
        else:
            return "Error, el rol no es válido. Solo se admite 'cliente' y 'administrador'"
        
        self.usuarios.append(nuevo_usuario) #Agrega el usuario creado a la lista de usuarios
        return f"Usuario registrado exitosamente con ID: {nuevo_usuario.id}"

    def listar_usuarios(self): #Metodo que da la lista de los usuarios registrados
        if not self.usuarios:
            return "No hay usuarios registrados."
        return "\n".join([u.mostrar_datos() for u in self.usuarios])
    
    def buscar_correo(self, correo): #Metodo para buscar un usuario por correo
        for usuario in self.usuarios:
            if usuario.correo == correo:
                return usuario
        return None
    
    def buscar_id(self, id_usuario): #Metodo para buscar un usuario por ID
        for usuario in self.usuarios:
            if usuario.id == id_usuario:
                return usuario
        return None
    
    def eliminar_usuario(self, id_usuario): #Metodo para eliminar un usuario por ID
        usuario = self.buscar_id(id_usuario)
        if usuario:
            self.usuarios.remove(usuario)
            return f"Usuario eliminado exitosamente"
        return "Error, no se encontró un usuario con ese ID"

    #Metodo para iniciar sesion
    def inicio_sesion(self, correo, contraseña):
        usuario = self.buscar_correo(correo)
        if usuario and usuario.verificar_contraseña(contraseña):
            return usuario  #ahora devuelve el objeto
            
        return None #Si no se encuentra el usuario, devuelve None