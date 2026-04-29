using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoundBitesAPI.Models;

namespace SoundBitesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VotoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("listar votos")]
        public async Task<ActionResult<IEnumerable<Voto>>> ListarVotos()
        {
            var votos = await _context.Votos.ToListAsync();
            return Ok(votos); //200
        }

        [HttpPost("guardar voto")]
        public async Task<ActionResult<Voto>> GuardarVoto(Voto voto)
        {
            _context.Votos.Add(voto);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, voto);
        }
        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarVoto(int id)
        {
            var voto = await _context.Votos.FindAsync(id);

            if (voto == null)
            {
                return NotFound();
            }

            _context.Votos.Remove(voto);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("buscar/{id}")]
        public async Task<ActionResult<Voto>> BuscarPorId(int id)
        {
            var voto = await _context.Votos.FindAsync(id);
            if (voto == null)
            {
                return NotFound();
            }
            return Ok(voto);
        }
    }
}
