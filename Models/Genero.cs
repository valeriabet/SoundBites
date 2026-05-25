using System;
using System.Collections.Generic;

namespace SoundBitesAPI.Models;

public partial class Genero
{
    public int IdGenero { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public int? Votos { get; set; }


}
