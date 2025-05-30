"""

Revision ID: 7d8b3154107f
Revises: 1ea18300c57d
Create Date: 2025-05-04 20:00:26.281811

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7d8b3154107f'
down_revision: Union[str, None] = '1ea18300c57d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('orders',
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('total', sa.Float(), nullable=False),
    sa.Column('status', sa.Enum('processing', 'shipped', 'delivered', 'cancelled', name='orderstatus'), nullable=False),
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_items',
    sa.Column('order_id', sa.String(), nullable=False),
    sa.Column('product_id', sa.String(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('products', sa.Column('discount_price', sa.Float(), nullable=True))
    op.drop_column('products', 'discount')
    op.drop_column('products', 'original_price')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('original_price', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
    op.add_column('products', sa.Column('discount', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
    op.drop_column('products', 'discount_price')
    op.drop_table('order_items')
    op.drop_table('orders')
    # ### end Alembic commands ###
