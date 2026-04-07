import { AlertTriangle, DollarSign, Package, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const statsData = [
  { label: 'Produtos próximos ao vencimento', value: '24', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Valor financeiro em risco', value: 'R$ 3.450,00', icon: DollarSign, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Total de produtos em estoque', value: '152', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Lotes cadastrados', value: '89', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const chartData = [
  { name: 'OK', value: 128, color: '#3b82f6' },
  { name: 'Em Risco', value: 24, color: '#f59e0b' },
  { name: 'Vencido', value: 0, color: '#ef4444' },
];

const expiringProducts = [
  { name: 'Whey Protein Chocolate 900g', brand: 'NutriMax', days: 5, value: 'R$ 450,00', quantity: 10 },
  { name: 'BCAA 2:1:1 120 cáps', brand: 'FitSupp', days: 8, value: 'R$ 320,00', quantity: 15 },
  { name: 'Creatina Monohidratada 300g', brand: 'PowerFit', days: 12, value: 'R$ 280,00', quantity: 8 },
  { name: 'Barra de Proteína Cookies', brand: 'HealthBar', days: 15, value: 'R$ 180,00', quantity: 24 },
  { name: 'Glutamina 300g', brand: 'NutriMax', days: 18, value: 'R$ 240,00', quantity: 6 },
];

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral do seu estoque</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Status do Estoque</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Expiring Products List */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Produtos que Vencem em Breve</h2>
          <div className="space-y-3">
            {expiringProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.brand} • {product.quantity} unidades</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    product.days <= 7
                      ? 'bg-red-100 text-red-700'
                      : product.days <= 15
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                    {product.days} dias
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{product.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
