from typing import Annotated

from fastapi import Depends, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security.jwt import verify_token
from app.models.user import User

security = HTTPBearer()


async def get_user(
    credentials: Annotated[HTTPAuthorizationCredentials, Security(security)],
    db: AsyncSession = Depends(get_db),
) -> User:
    """ """
    token = credentials.credentials
    auth = await verify_token(db, token)
    return auth.user
