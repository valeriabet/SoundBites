class Usuario:
    contador_id = 1 #Inicio del contador para el ID de usuarios
    
    def __init__(self, nombre, correo, contraseña, rol): #Constructor que asigna los atributos de un usuario
        self.id = Usuario.contador_id #Asigna un ID
        Usuario.contador_id += 1 #Incrementa el contador para el siguiente usuario
        self.nombre = nombre
        self.correo = correo
        self.__contraseña = contraseña #Define la contraseña como atributo privado
        self.rol = rol
        self.favoritos = [] #Lista para almacenar los favoritos del usuario
        
    @property #Encapsulamiento de la contraseña para que no se pueda leer
    def contraseña(self):
        return ("********") #Retorna una cadena oculta en lugar de la contraseña real
    
    @contraseña.setter #Stter para cambiar la contraseña
    def contraseña(self, nueva_contraseña):
        self.__contraseña = nueva_contraseña
        
    def verificar_contraseña(self, intento): #Metodo para verificar la contraseña
        return self.__contraseña == intento
    
    def mostrar_datos(self): #Metodo para mostrar los datos de un usuario
        return f"ID: {self.id}, Nombre: {self.nombre}, Correo: {self.correo}, Rol: {self.rol}"
    
    def actualizar_nombre(self, nuevo_nombre): #Metodo para actualizar nombre
         self.nombre = nuevo_nombre
         
    def actualizar_correo(self, nuevo_correo): #Metodo para actualizar correo
        self.correo = nuevo_correo
        
    def agregar_favorito(self, plato): #Metodo para agregar un plato favorito a la cuenta del usuario
        if plato not in self.favoritos:
            self.favoritos.append(plato)
            return True
        return False


    def eliminar_favorito(self, id_plato): #Metodo para eliminar un plato favorito de la cuenta del usuario por ID del plato
        for p in self.favoritos:
            if p.id == id_plato:
                self.favoritos.remove(p)
                return True
        return False


    def listar_favoritos(self):
        if not self.favoritos:
            return "No tienes favoritos"
        return "\n".join([str(p) for p in self.favoritos])