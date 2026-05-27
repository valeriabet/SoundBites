using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoundBitesAPI.Models;

namespace SoundBitesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlatoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PlatoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("listar platos")]
        public async Task<ActionResult<IEnumerable<Plato>>> ListarPlatos()
        {
            var platos = await _context.Platos.ToListAsync();
            return Ok(platos); //200
        }

        [HttpPost("guardar plato")]
        public async Task<ActionResult<Plato>> GuardarPlato(Plato plato)
        {
            _context.Platos.Add(plato);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, plato);
        }
        [HttpPut("actualizar plato/{id}")]
        public async Task<ActionResult> ActualizarPlato(int id, Plato plato)
        {
            var platoActualizado = await _context.Platos.FindAsync(id);

            if (platoActualizado == null)
            {
                return NotFound(); //404
            }
            platoActualizado.Nombre = plato.Nombre;
            platoActualizado.Descripcion = plato.Descripcion;
            platoActualizado.Precio = plato.Precio;
            platoActualizado.IdCategoria = plato.IdCategoria;
            platoActualizado.Imagen = plato.Imagen;

            await _context.SaveChangesAsync();

            return Ok(platoActualizado);

        }

        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarPlato(int id)
        {
            var plato = await _context.Platos.FindAsync(id);

            if (plato == null)
            {
                return NotFound();
            }

            _context.Platos.Remove(plato);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("buscar/{id}")]
        public async Task<ActionResult<Plato>> BuscarPorId(int id)
        {
            var plato = await _context.Platos.FindAsync(id);
            if (plato == null)
            {
                return NotFound();
            }
            return Ok(plato);
        }
    }
}
