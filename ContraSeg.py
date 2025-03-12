from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import secrets
import string

app = FastAPI()

# Sirve la carpeta static (CSS y JS)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Función para generar la contraseña
def generar_password(longitud: int = 12, mayusculas: bool = True, numeros: bool = True, simbolos: bool = True):
    caracteres = string.ascii_lowercase
    if mayusculas:
        caracteres += string.ascii_uppercase
    if numeros:
        caracteres += string.digits
    if simbolos:
        caracteres += string.punctuation

    password = ''.join(secrets.choice(caracteres) for _ in range(longitud))
    return password

# Endpoint para generar la contraseña
@app.get("/generar_password")
def obtener_password(longitud: int = 12, mayusculas: bool = True, numeros: bool = True, simbolos: bool = True):
    if longitud < 6:
        return {"error": "La longitud mínima de la contraseña es 6 caracteres."}

    password = generar_password(longitud, mayusculas, numeros, simbolos)
    return {"password": password}

# Sirve la página principal
@app.get("/")
def serve_index():
    return FileResponse("templates/index.html")
