from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .auth import verify_password, create_access_token, decode_access_token
from .user_service import get_user_by_email, create_user
from pydantic import BaseModel
from user.models import UserCreate
auth_router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

class Token(BaseModel):
    access_token: str
    token_type: str

@auth_router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user_by_email(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email ou mot de passe invalide")
    token = create_access_token({"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token invalide ou expiré")
    user = get_user_by_email(payload.get("sub"))
    if not user:
        raise HTTPException(status_code=401, detail="Utilisateur non trouvé")
    return user

@auth_router.get("/me")
def me(current_user: dict = Depends(get_current_user)):
    return {"email": current_user["email"]}
             
@auth_router.post("/register")
def register(user: UserCreate):
    if get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Utilisateur déjà enregistré")
    new_user = create_user(user)
    return {"message": "Utilisateur créé avec succès", "email": new_user["email"]}
          

