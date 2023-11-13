global using API.Data;
global using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
var host = Environment.GetEnvironmentVariable("DB_HOST");
var name = Environment.GetEnvironmentVariable("DB_NAME");
var pass = Environment.GetEnvironmentVariable("DB_PASS");
var port = Environment.GetEnvironmentVariable("DB_PORT");
//var connection = $"Server=localhost;Database=GTTest;Uid=root;Pwd=;";
var connection = $"Server={host};Port={port};Database={name};Uid=root;Pwd={pass};SslMode=none;";
builder.Services.AddDbContext<DataContext>(option =>
{
    option.UseMySql(connection, ServerVersion.AutoDetect(connection));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => {
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standart (\" bearer {token} \")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();

});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
           .GetBytes(builder.Configuration.GetSection("Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
var web = Environment.GetEnvironmentVariable("WEB_HOST");

builder.Services.AddCors(p => p.AddPolicy("corspolicy", build =>
{
    build.WithOrigins(web).AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("corspolicy");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
