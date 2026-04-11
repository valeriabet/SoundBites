from .usuario import Usuario #Importacion del usuario

class Cliente (Usuario): #La clase cliente hereda de la clase usuario
    def __init__(self, nombre, correo, contraseña): #Constructor asigna los atributos de un cliente
        super().__init__(nombre, correo, contraseña, "cliente") #Llama al constructor de la clase Usuario con el rol de cliente