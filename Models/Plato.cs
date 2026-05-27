using System;
using System.Collections.Generic;

namespace SoundBitesAPI.Models;

public partial class Plato
{
    public int IdPlato { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public decimal Precio { get; set; }

    public int IdCategoria { get; set; }

    public string? Imagen { get; set; }
}
