using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SoundBitesAPI.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categoria> Categorias { get; set; }
    public virtual DbSet<Favorito> Favoritos { get; set; }
    public virtual DbSet<Genero> Generos { get; set; }
    public virtual DbSet<Plato> Platos { get; set; }
    public virtual DbSet<Usuario> Usuarios { get; set; }
    public virtual DbSet<Reserva> Reservas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.IdCategoria).HasName("PK__Categori__CD54BC5A19BD4F0E");
            entity.Property(e => e.IdCategoria).HasColumnName("id_categoria");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Favorito>(entity =>
        {
            entity.HasKey(e => e.IdFavorito).HasName("PK__Favorito__78F875AECE2C7E54");
            entity.HasIndex(e => new { e.IdUsuario, e.IdPlato }, "uq_favorito").IsUnique();
            entity.Property(e => e.IdFavorito).HasColumnName("id_favorito");
            entity.Property(e => e.IdPlato).HasColumnName("id_plato");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
        });

        modelBuilder.Entity<Genero>(entity =>
        {
            entity.HasKey(e => e.IdGenero).HasName("PK__Generos__99A8E4F9B6982DCF");
            entity.Property(e => e.IdGenero).HasColumnName("id_genero");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(200)
                .HasColumnName("descripcion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("nombre");
            entity.Property(e => e.Votos)
                .HasDefaultValue(0)
                .HasColumnName("votos");
        });

        modelBuilder.Entity<Plato>(entity =>
        {
            entity.HasKey(e => e.IdPlato).HasName("PK__Platos__04D4F2C09CDBE993");
            entity.Property(e => e.IdPlato).HasColumnName("id_plato");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(200)
                .HasColumnName("descripcion");
            entity.Property(e => e.IdCategoria).HasColumnName("id_categoria");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precio");
            entity.Property(e => e.Imagen)
    .HasMaxLength(300)
    .HasColumnName("imagen");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("pk_id_usuario");
            entity.ToTable("Usuario");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Contraseña)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("contraseña");
            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("correo");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Rol)
                .HasMaxLength(13)
                .IsUnicode(false)
                .HasColumnName("rol");
        });

        modelBuilder.Entity<Reserva>(entity =>
        {
            entity.HasKey(e => e.IdReserva).HasName("PK_Reservas");
            entity.ToTable("Reservas");
            entity.Property(e => e.IdReserva).HasColumnName("id_reserva");
            entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.NumeroPersonas).HasColumnName("numero_personas");
            entity.Property(e => e.IdGenero).HasColumnName("id_genero");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}