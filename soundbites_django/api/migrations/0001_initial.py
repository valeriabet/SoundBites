from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id_categoria', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'Categorias',
            },
        ),
        migrations.CreateModel(
            name='Genero',
            fields=[
                ('id_genero', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion', models.CharField(blank=True, max_length=200, null=True)),
            ],
            options={
                'db_table': 'Generos',
            },
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id_usuario', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('correo', models.CharField(max_length=50, unique=True)),
                ('contrasena', models.CharField(db_column='contraseña', max_length=255)),
                ('rol', models.CharField(
                    blank=True,
                    choices=[('admin', 'admin'), ('usuario', 'usuario')],
                    default='usuario',
                    max_length=13,
                    null=True
                )),
            ],
            options={
                'db_table': 'Usuario',
            },
        ),
        migrations.CreateModel(
            name='Plato',
            fields=[
                ('id_plato', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.CharField(blank=True, max_length=200, null=True)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('id_categoria', models.ForeignKey(
                    blank=True,
                    db_column='id_categoria',
                    null=True,
                    on_delete=django.db.models.deletion.SET_NULL,
                    related_name='platos',
                    to='api.categoria'
                )),
                ('imagen', models.CharField(blank=True, max_length=300, null=True)),
            ],
            options={
                'db_table': 'Platos',
            },
        ),
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('id_reserva', models.AutoField(primary_key=True, serialize=False)),
                ('id_usuario', models.ForeignKey(
                    db_column='id_usuario',
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='reservas',
                    to='api.usuario'
                )),
                ('fecha', models.DateTimeField(blank=True, null=True)),
                ('numero_personas', models.IntegerField()),
                ('id_genero', models.ForeignKey(
                    blank=True,
                    db_column='id_genero',
                    null=True,
                    on_delete=django.db.models.deletion.SET_NULL,
                    related_name='reservas',
                    to='api.genero'
                )),
                ('estado', models.CharField(
                    choices=[
                        ('pendiente', 'Pendiente'),
                        ('confirmada', 'Confirmada'),
                        ('cancelada', 'Cancelada'),
                        ('completada', 'Completada'),
                    ],
                    default='pendiente',
                    max_length=20
                )),
                ('notas', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'Reservas',
            },
        ),
        migrations.CreateModel(
            name='Favorito',
            fields=[
                ('id_favorito', models.AutoField(primary_key=True, serialize=False)),
                ('id_usuario', models.ForeignKey(
                    db_column='id_usuario',
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='favoritos',
                    to='api.usuario'
                )),
                ('id_plato', models.ForeignKey(
                    db_column='id_plato',
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='favoritos',
                    to='api.plato'
                )),
                ('fecha_agregado', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'Favoritos',
            },
        ),
        migrations.AlterUniqueTogether(
            name='favorito',
            unique_together={('id_usuario', 'id_plato')},
        ),
        migrations.CreateModel(
            name='Voto',
            fields=[
                ('id_voto', models.AutoField(primary_key=True, serialize=False)),
                ('id_usuario', models.ForeignKey(
                    db_column='id_usuario',
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='votos',
                    to='api.usuario'
                )),
                ('id_genero', models.ForeignKey(
                    db_column='id_genero',
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='votos',
                    to='api.genero'
                )),
                ('fecha', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'Votos',
            },
        ),
        migrations.AlterUniqueTogether(
            name='voto',
            unique_together={('id_usuario', 'id_genero')},
        ),
    ]