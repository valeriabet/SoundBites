using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoundBitesAPI.Models;

namespace SoundBitesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReservaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("listarreservas")]
        public async Task<ActionResult<IEnumerable<Reserva>>> ListarReservas()
        {
            var reservas = await _context.Reservas.ToListAsync();
            return Ok(reservas);
        }

        public class ReservaDto
        {
            public int IdUsuario { get; set; }
            public DateTime? Fecha { get; set; }
            public int NumeroPersonas { get; set; }
            public int IdGenero { get; set; }
            public string? GeneroNombre { get; set; }
        }

        [HttpPost("guardarreserva")]
        public async Task<ActionResult<Reserva>> GuardarReserva(ReservaDto dto)
        {
            // Validaciones básicas
            if (dto.IdUsuario <= 0)
            {
                return BadRequest("IdUsuario inválido");
            }

            if (dto.NumeroPersonas < 1 || dto.NumeroPersonas > 8)
            {
                return BadRequest("NumeroPersonas debe estar entre 1 y 8");
            }

            // Mapear DTO a entidad Reserva
            var reserva = new Reserva
            {
                IdUsuario = dto.IdUsuario,
                Fecha = dto.Fecha ?? DateTime.Now,
                NumeroPersonas = dto.NumeroPersonas,
                IdGenero = dto.IdGenero
            };

            // Agregar la reserva al contexto
            _context.Reservas.Add(reserva);

            // Intentar incrementar votos: primero por IdGenero, si no existe buscar por nombre (si viene)
            try
            {
                Genero? genero = null;

                if (reserva.IdGenero > 0)
                {
                    genero = await _context.Generos.FindAsync(reserva.IdGenero);
                }

                if (genero == null && !string.IsNullOrWhiteSpace(dto.GeneroNombre))
                {
                    var nombre = dto.GeneroNombre.Trim();
                    genero = await _context.Generos.FirstOrDefaultAsync(g => g.Nombre.ToLower() == nombre.ToLower());
                    if (genero != null)
                    {
                        reserva.IdGenero = genero.IdGenero;
                    }
                }

                if (genero != null)
                {
                    genero.Votos = (genero.Votos ?? 0) + 1;
                }
            }
            catch
            {
                // No bloquear la creación de la reserva por fallo en incremento de votos
            }

            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status201Created, reserva);
        }

        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
            {
                return NotFound();
            }
            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("buscar/{id}")]
        public async Task<ActionResult<Reserva>> BuscarPorId(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
            {
                return NotFound();
            }
            return Ok(reserva);
        }
    }
}