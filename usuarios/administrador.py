from .usuario import Usuario #Importacion del usuario

class Administrador (Usuario): #La clase administrador hereda de la clase usuario
    def __init__(self, nombre, correo, contraseña): #Construcctor asigna los atributos de un administrador
        super().__init__(nombre, correo, contraseña, "administrador") #Llama al constructor de la clase usuario con el rol de administrador