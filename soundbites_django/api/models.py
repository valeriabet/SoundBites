from django.db import models


class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)

    class Meta:
        db_table = 'Categorias'

    def __str__(self):
        return self.nombre


class Plato(models.Model):
    id_plato = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=200, null=True, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    id_categoria = models.IntegerField()
    imagen = models.CharField(max_length=300, null=True, blank=True)

    class Meta:
        db_table = 'Platos'

    def __str__(self):
        return self.nombre


class Genero(models.Model):
    id_genero = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        db_table = 'Generos'

    def __str__(self):
        return self.nombre

    @property
    def votos_count(self):
        """Contar votos de este género"""
        return self.voto_set.count()


class Usuario(models.Model):
    ROL_CHOICES = [
        ('admin', 'admin'),
        ('usuario', 'usuario'),
    ]
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    correo = models.CharField(max_length=50, unique=True)
    contrasena = models.CharField(max_length=255, db_column='contraseña')
    rol = models.CharField(
        max_length=13,
        choices=ROL_CHOICES,
        null=True,
        blank=True,
        default='usuario'
    )

    class Meta:
        db_table = 'Usuario'

    def __str__(self):
        return self.nombre

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False


class Favorito(models.Model):
    id_favorito = models.AutoField(primary_key=True)
    id_usuario = models.IntegerField()
    id_plato = models.IntegerField()
    fecha_agregado = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        db_table = 'Favoritos'
        unique_together = ('id_usuario', 'id_plato')

    def __str__(self):
        return f'Favorito {self.id_favorito}'


class Reserva(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada'),
        ('completada', 'Completada'),
    ]
    
    id_reserva = models.AutoField(primary_key=True)
    id_usuario = models.IntegerField()
    fecha = models.DateTimeField(null=True, blank=True)
    numero_personas = models.IntegerField()
    id_genero = models.IntegerField()
    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default='pendiente'
    )
    notas = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'Reservas'

    def __str__(self):
        return f'Reserva {self.id_reserva}'


class Voto(models.Model):
    id_voto = models.AutoField(primary_key=True)
    id_usuario = models.IntegerField()
    id_genero = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        db_table = 'Votos'
        unique_together = ('id_usuario', 'id_genero')

    def __str__(self):
        return f'Voto {self.id_voto}'