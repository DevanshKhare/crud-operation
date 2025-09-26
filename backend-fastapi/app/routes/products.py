from fastapi import APIRouter, HTTPException, Depends
from typing import List
from bson import ObjectId
from app.models.product import ProductCreate, ProductUpdate, ProductOut
from app.db import db

router = APIRouter(prefix="/api/products", tags=["products"])

def serialize(product):
    product["id"] = str(product["_id"])
    del product["_id"]
    return product

@router.post("/", response_model=ProductOut)
def create_product(product: ProductCreate):
    res = db.products.insert_one(product.dict())
    return {"id": str(res.inserted_id), **product.dict()}

@router.get("/", response_model=List[ProductOut])
def list_products():
    return [serialize(p) for p in db.products.find()]

@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: str):
    product = db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(404, "Product not found")
    return serialize(product)

@router.put("/{product_id}", response_model=ProductOut)
def update_product(product_id: str, data: ProductUpdate):
    db.products.update_one({"_id": ObjectId(product_id)}, {"$set": data.dict(exclude_unset=True)})
    product = db.products.find_one({"_id": ObjectId(product_id)})
    return serialize(product)

@router.delete("/{product_id}")
def delete_product(product_id: str):
    res = db.products.delete_one({"_id": ObjectId(product_id)})
    if res.deleted_count == 0:
        raise HTTPException(404, "Product not found")
    return {"detail": "Deleted"}
