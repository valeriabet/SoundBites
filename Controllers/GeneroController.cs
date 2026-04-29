using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoundBitesAPI.Models;

namespace SoundBitesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneroController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GeneroController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("listar generos")]
        public async Task<ActionResult<IEnumerable<Genero>>> ListarGeneros()
        {
            var generos = await _context.Generos.ToListAsync();
            return Ok(generos); //200
        }

        [HttpPost("guardar genero")]
        public async Task<ActionResult<Genero>> GuardarGenero(Genero genero)
        {
            _context.Generos.Add(genero);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, genero);
        }

        [HttpPut("actualizar genero/{id}")]
        public async Task<ActionResult> ActualizarGenero(int id, Genero genero)
        {
            var generoActualizado = await _context.Generos.FindAsync(id);

            if (generoActualizado == null)
            {
                return NotFound(); //404
            }
            generoActualizado.Nombre = genero.Nombre;
            generoActualizado.Descripcion = genero.Descripcion;
    

            await _context.SaveChangesAsync();

            return Ok(generoActualizado);

        }

        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarGenero(int id)
        {
            var genero = await _context.Generos.FindAsync(id);

            if (genero == null)
            {
                return NotFound();
            }

            _context.Generos.Remove(genero);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("buscar/{id}")]
        public async Task<ActionResult<Genero>> BuscarPorId(int id)
        {
            var genero = await _context.Generos.FindAsync(id);
            if (genero == null)
            {
                return NotFound();
            }
            return Ok(genero);
        }
    }
}
