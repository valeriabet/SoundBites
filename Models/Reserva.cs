namespace SoundBitesAPI.Models
{
    public class Reserva
    {
        public int IdReserva { get; set; }
        public int IdUsuario { get; set; }
        public DateTime? Fecha { get; set; }
        public int NumeroPersonas { get; set; }
        public int IdGenero { get; set; }

        // Navigation property to Genero
        public virtual Genero? Genero { get; set; }
    }
}