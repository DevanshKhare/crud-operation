from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import uvicorn
from app.routes import auth, products

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="FastAPI CRUD")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.include_router(auth.router)
app.include_router(products.router)

@app.get("/")
@limiter.limit("5/minute")
def root(request: Request):
    return {"msg": "API running"}

if __name__ == "__main__":
    uvicorn.run("app.app:app", host="localhost", port=8000, reload=True)