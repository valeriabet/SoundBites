class Usuario:
    contador_id = 1 #Inicio del contador para el ID de usuarios
    
    def __init__(self, nombre, correo, contraseña, rol): #Constructor que asigna los atributos de un usuario
        self.id = Usuario.contador_id #Asigna un ID
        Usuario.contador_id += 1 #Incrementa el contador para el siguiente usuario
        self.nombre = nombre
        self.correo = correo
        self.__contraseña = contraseña #Define la contraseña como atributo privado
        self.rol = rol
        
    @property #Encapsulamiento de la contraseña para que no se pueda leer
    def contraseña(self):
        raise AttributeError("La contraseña no se puede leer directamente") #Error si se intenta acceder a la contraseña de forma directa
    
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