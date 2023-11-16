using API.Data.Validation;
using API.Models;
using API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualBasic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserValidation _validator = new UserValidation();
        private DataContext _context;
        private IConfiguration _configuration;
        
        public AuthController(DataContext context,IConfiguration config)
        {
            _context = context;
            _configuration = config;
        }
        
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDTO request) {
            if (_context.Users.FirstOrDefault(u => u.Email == request.Email) is not null) {
                return BadRequest("Даний користувач існує");
            }
            
            if (!_validator.RegisterUser(request,out string err)) {
                return BadRequest($"Невалідні данні {err}");
            }

            CreatePasswordHash(request.Password, out byte[] hash, out byte[] salt);
            var user = new User 
                { 
                Email = request.Email, Name = request.Name, 
                PasswordHash=hash,PasswordSalt = salt,
                PhoneNumber=request.PhoneNamber 
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDTO request)
        {
            var user = _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email).Result;
            if (user == null) {
                return BadRequest("Такого користувача не існує");
            }
            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt)) {
                return BadRequest("Неправильний пароль");
            }
            var token = CreateToken(user);
            await Console.Out.WriteLineAsync(token);
            var n = new { token = token };
            return Ok(n);
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Name)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(3),
                signingCredentials: cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        
        private void CreatePasswordHash(string pass, out byte[] hash, out byte[] salt) {
            using (var hmac = new HMACSHA512()) {
                salt = hmac.Key;
                hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(pass));
            }
        }
        
        private bool VerifyPasswordHash(string pass, byte[] hash, byte[] salt) {
            using (var hmac = new HMACSHA512(salt)) {
                var computed = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(pass));
                return computed.SequenceEqual(hash);
            }
        }
    }
}
