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
        {item.rows.map((row, i) => (
          <tr key={i}>
            <td>{row.store || '—'}</td>
            <td>{row.quantity || '—'}</td>
            <td>€{row.unitprice.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
