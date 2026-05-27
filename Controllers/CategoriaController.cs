    using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoundBitesAPI.Models;

namespace SoundBitesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("listar categorias")]
        public async Task<ActionResult<IEnumerable<Categoria>>> ListarCategorias()
        {
            var categorias = await _context.Categorias.ToListAsync();
            return Ok(categorias); //200
        }

        [HttpPost("guardar categoria")]
        public async Task<ActionResult<Categoria>> GuardarCategoria(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, categoria);
        }
        [HttpPut("actualizar categoria/{id}")]
        public async Task<ActionResult> ActualizarCategoria(int id, Categoria categoria)
        {
            var categoriaActualizada = await _context.Categorias.FindAsync(id);

            if (categoriaActualizada == null)
            {
                return NotFound(); //404
            }
            categoriaActualizada.Nombre = categoria.Nombre;
            
            await _context.SaveChangesAsync();

            return Ok(categoriaActualizada);

        }

        [HttpDelete("eliminar/{id}")]
        public async Task<ActionResult> EliminarCategoria(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);

            if (categoria == null)
            {
                return NotFound();
            }

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("buscar/{id}")]
        public async Task<ActionResult<Categoria>> BuscarPorId(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);
            if (categoria == null)
            {
                return NotFound();
            }
            return Ok(categoria);
        }
    }
}
