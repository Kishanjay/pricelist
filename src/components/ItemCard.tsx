import type { PriceItem } from '../types';
import { ItemDetail } from './ItemDetail';

interface ItemCardProps {
  item: PriceItem;
  expanded: boolean;
  onToggle: () => void;
}

export function ItemCard({ item, expanded, onToggle }: ItemCardProps) {
  return (
    <div className="item-card" onClick={onToggle}>
      <div className="item-card-row">
        <div className="item-card-left">
          <div className="item-name">{item.item}</div>
          <div className="item-store">{item.store}</div>
        </div>
        <div className="item-card-right">
          <div className="item-unitprice">€{item.unitprice.toFixed(2)}</div>
          <div className="item-quantity">/{item.unit || item.quantity}</div>
        </div>
      </div>
      {expanded && <ItemDetail item={item} />}
    </div>
  );
}
