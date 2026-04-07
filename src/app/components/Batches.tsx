import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';

interface Batch {
  id: number;
  product: string;
  batchNumber: string;
  quantity: number;
  expiryDate: string;
  daysRemaining: number;
  status: 'ok' | 'warning' | 'expired';
}

const initialBatches: Batch[] = [
  { id: 1, product: 'Whey Protein Chocolate 900g', batchNumber: 'WP-2024-001', quantity: 10, expiryDate: '2026-04-11', daysRemaining: 5, status: 'expired' },
  { id: 2, product: 'BCAA 2:1:1 120 cáps', batchNumber: 'BC-2024-012', quantity: 15, expiryDate: '2026-04-14', daysRemaining: 8, status: 'expired' },
  { id: 3, product: 'Creatina Monohidratada 300g', batchNumber: 'CR-2024-008', quantity: 8, expiryDate: '2026-04-18', daysRemaining: 12, status: 'warning' },
  { id: 4, product: 'Glutamina 300g', batchNumber: 'GL-2024-015', quantity: 20, expiryDate: '2026-05-15', daysRemaining: 39, status: 'ok' },
  { id: 5, product: 'Barra de Proteína Cookies', batchNumber: 'BP-2024-020', quantity: 24, expiryDate: '2026-04-21', daysRemaining: 15, status: 'warning' },
  { id: 6, product: 'Whey Protein Baunilha 900g', batchNumber: 'WP-2024-005', quantity: 12, expiryDate: '2026-06-10', daysRemaining: 65, status: 'ok' },
];

const productOptions = [
  'Whey Protein Chocolate 900g',
  'BCAA 2:1:1 120 cáps',
  'Creatina Monohidratada 300g',
  'Glutamina 300g',
  'Barra de Proteína Cookies',
];

export function Batches() {
  const [batches, setBatches] = useState<Batch[]>(initialBatches);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    product: '',
    batchNumber: '',
    quantity: '',
    expiryDate: '',
  });

  const getStatus = (expiryDate: string): { status: 'ok' | 'warning' | 'expired'; days: number } => {
    const today = new Date('2026-04-06');
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { status: 'expired', days: 0 };
    if (diffDays <= 7) return { status: 'expired', days: diffDays };
    if (diffDays <= 30) return { status: 'warning', days: diffDays };
    return { status: 'ok', days: diffDays };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const statusInfo = getStatus(formData.expiryDate);
    const newBatch: Batch = {
      id: batches.length + 1,
      product: formData.product,
      batchNumber: formData.batchNumber,
      quantity: parseInt(formData.quantity),
      expiryDate: formData.expiryDate,
      daysRemaining: statusInfo.days,
      status: statusInfo.status,
    };
    setBatches([...batches, newBatch]);
    setFormData({ product: '', batchNumber: '', quantity: '', expiryDate: '' });
    setShowForm(false);
  };

  const getStatusBadge = (status: 'ok' | 'warning' | 'expired', days: number) => {
    const styles = {
      ok: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      warning: 'bg-amber-100 text-amber-700 border-amber-200',
      expired: 'bg-red-100 text-red-700 border-red-200',
    };

    const labels = {
      ok: 'OK',
      warning: 'Atenção',
      expired: days === 0 ? 'Vencido' : 'Crítico',
    };

    return (
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${status === 'ok' ? 'bg-emerald-500' : status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
          {labels[status]}
        </span>
        <span className="text-sm text-gray-600">{days > 0 ? `${days} dias` : 'Vencido'}</span>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Lotes</h1>
          <p className="text-gray-500 mt-1">Controle de lotes e datas de validade</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition shadow-md"
        >
          <Plus className="w-5 h-5" />
          Novo Lote
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Novo Lote</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Produto</label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Selecione um produto...</option>
                {productOptions.map((product) => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Número do Lote</label>
              <input
                type="text"
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Ex: WP-2024-001"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Data de Validade</label>
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div className="lg:col-span-4 flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Status Legend */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-gray-700">Legenda de Status:</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-sm text-gray-600">OK (mais de 30 dias)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-sm text-gray-600">Atenção (8-30 dias)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-sm text-gray-600">Crítico/Vencido (menos de 7 dias)</span>
          </div>
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Produto</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Lote</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Quantidade</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Validade</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {batches.map((batch) => (
              <tr key={batch.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800">{batch.product}</td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {batch.batchNumber}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{batch.quantity} un</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(batch.expiryDate).toLocaleDateString('pt-BR')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(batch.status, batch.daysRemaining)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
