using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TodoController : ControllerBase
  {
    private readonly TodoContext _context;

    public TodoController(TodoContext context)
    {
      _context = context;
    }

    // GET: api/todo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
    {
      return await _context.TodoItems.ToListAsync();
    }

    // GET: api/todo/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(int id)
    {
      TodoItem? todo = await _context.TodoItems.FindAsync(id);
      if (todo == null)
        return NotFound();

      return todo;
    }

    // POST: api/todo
    [HttpPost]
    public async Task<ActionResult<TodoItem>> CreateTodo(TodoItem todo)
    {
      _context.TodoItems.Add(todo);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetTodoItem), new { id = todo.Id }, todo);
    }

    // PUT: api/todo/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(int id, TodoItem todo)
    {
      TodoItem? existing = await _context.TodoItems.FindAsync(id);
      if (existing == null)
        return NotFound();

      existing.Title = todo.Title;
      existing.IsCompleted = todo.IsCompleted;

      await _context.SaveChangesAsync();

      return NoContent();
    }

    // DELETE: api/todo/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
      TodoItem? todo = await _context.TodoItems.FindAsync(id);
      if (todo == null)
        return NotFound();

      _context.TodoItems.Remove(todo);
      await _context.SaveChangesAsync();

      return NoContent();
    }
  }
}
