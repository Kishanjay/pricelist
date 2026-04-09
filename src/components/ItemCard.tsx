import type { PriceItem } from '../types';
import { ItemDetail } from './ItemDetail';

interface ItemCardProps {
  item: PriceItem;
  expanded: boolean;
  onToggle: () => void;
}

export function ItemCard({ item, expanded, onToggle }: ItemCardProps) {
  const { bestBonus, bestNormal } = item;
  const showBonus = bestBonus && (!bestNormal || bestBonus.unitprice < bestNormal.unitprice);
  const primary = showBonus ? bestBonus! : (bestNormal ?? bestBonus)!;

  return (
    <div className="item-card" onClick={onToggle}>
      <div className="item-card-row">
        <div className="item-card-left">
          <div className="item-name">{item.item}</div>
          <div className="item-store">{primary.store}</div>
        </div>
        <div className="item-card-right">
          <div className="item-prices">
            <span className={showBonus ? 'price-bonus' : 'price-normal'}>
              €{primary.unitprice.toFixed(2)}
            </span>
            {showBonus && bestNormal && (
              <span className="price-strikethrough">€{bestNormal.unitprice.toFixed(2)}</span>
            )}
          </div>
          <div className="item-quantity">/{primary.unit || primary.quantity}</div>
        </div>
      </div>
      {expanded && <ItemDetail item={item} />}
    </div>
  );
}
