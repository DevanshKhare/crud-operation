from pydantic import BaseModel, Field
from typing import Optional

class ProductBase(BaseModel):
    name: str = Field(..., min_length=1)
    description: Optional[str] = None
    price: float = Field(..., ge=0)
    category: Optional[str] = None

class ProductCreate(ProductBase): pass
class ProductUpdate(ProductBase): pass

class ProductOut(ProductBase):
    id: str
