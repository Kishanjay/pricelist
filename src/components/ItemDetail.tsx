import type { PriceItem } from '../types';

interface ItemDetailProps {
  item: PriceItem;
}

export function ItemDetail({ item }: ItemDetailProps) {
  return (
    <table className="item-detail-table">
      <thead>
        <tr>
          <th>Store</th>
          <th>Qty</th>
          <th>Unit price</th>
        </tr>
      </thead>
      <tbody>
        {item.rows.map((row, i) => {
          const isBonus = row.type?.toLowerCase() === 'bonus';
          const qty = row.quantity
            ? `${row.quantity}${row.unit || ''}`
            : '—';
          return (
            <tr key={i}>
              <td>{row.store || '—'}</td>
              <td>{qty}</td>
              <td>
                {isBonus && <span className="bonus-badge">b</span>}
                €{row.unitprice.toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
