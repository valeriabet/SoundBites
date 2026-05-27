using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoundBitesAPI.Models;

namespace SoundBitesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FavoritoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("listar favoritos")]
        public async Task<ActionResult<IEnumerable<Favorito>>> ListarFavoritos()
        {
            var favoritos = await _context.Favoritos.ToListAsync();
            return Ok(favoritos); //200
        }

        [HttpPost("Guardar favorito")]
        public async Task<ActionResult<Genero>> GuardarFavorito(Favorito favorito)
        {
            _context.Favoritos.Add(favorito);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, favorito);
        }
        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarFavorito(int id)
        {
            var favorito = await _context.Favoritos.FindAsync(id);

            if (favorito == null)
            {
                return NotFound();
            }

            _context.Favoritos.Remove(favorito);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpGet("buscar/{id}")]
        public async Task<ActionResult<Favorito>> BuscarPorId(int id)
        {
            var favorito = await _context.Favoritos.FindAsync(id);
            if (favorito == null)
            {
                return NotFound();
            }
            return Ok(favorito);
        }
    }
}
