from django.apps import AppConfig

class ReservasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField' # Se define el campo automático para la base de datos
    name = 'reservas'