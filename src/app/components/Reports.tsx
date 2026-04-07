import { TrendingDown, TrendingUp, DollarSign, Package } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const lossesData = [
  { month: 'Out/25', perdas: 450, evitadas: 1200 },
  { month: 'Nov/25', perdas: 380, evitadas: 1500 },
  { month: 'Dez/25', perdas: 520, evitadas: 1800 },
  { month: 'Jan/26', perdas: 290, evitadas: 2100 },
  { month: 'Fev/26', perdas: 210, evitadas: 2400 },
  { month: 'Mar/26', perdas: 150, evitadas: 2800 },
];

const categoryLossesData = [
  { category: 'Proteínas', value: 450 },
  { category: 'Aminoácidos', value: 320 },
  { category: 'Creatina', value: 280 },
  { category: 'Snacks', value: 180 },
  { category: 'Vitaminas', value: 120 },
];

const savingsImpact = [
  { metric: 'Perdas Evitadas (6 meses)', value: 'R$ 11.800,00', icon: TrendingUp, color: 'blue' },
  { metric: 'Perdas Realizadas (6 meses)', value: 'R$ 2.000,00', icon: TrendingDown, color: 'red' },
  { metric: 'Taxa de Aproveitamento', value: '85,5%', icon: Package, color: 'blue' },
  { metric: 'Economia Estimada', value: 'R$ 9.800,00', icon: DollarSign, color: 'blue' },
];

export function Reports() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>
        <p className="text-gray-500 mt-1">Análise de perdas e economia gerada</p>
      </div>

      {/* Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {savingsImpact.map((item, index) => {
          const Icon = item.icon;
          const colorClasses = {
            blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
            red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
          }[item.color];

          return (
            <div key={index} className={`bg-white rounded-xl p-6 shadow-sm border ${colorClasses.border}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`${colorClasses.bg} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.metric}</p>
              <p className={`text-2xl font-bold ${colorClasses.text}`}>{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Losses vs Prevented */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Perdas vs Perdas Evitadas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lossesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value},00`} />
              <Legend />
              <Line type="monotone" dataKey="perdas" stroke="#ef4444" strokeWidth={2} name="Perdas" />
              <Line type="monotone" dataKey="evitadas" stroke="#3b82f6" strokeWidth={2} name="Evitadas" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tendência positiva:</strong> Redução de 67% nas perdas nos últimos 6 meses
            </p>
          </div>
        </div>

        {/* Category Losses */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Perdas por Categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryLossesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value},00`} />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" name="Valor Perdido (R$)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Atenção:</strong> Categoria Proteínas representa 35% das perdas totais
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Relatório Detalhado - Últimos 6 Meses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mês</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Perdas por Vencimento</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Perdas Evitadas</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Economia</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Taxa de Sucesso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lossesData.map((data, index) => {
                const economia = data.evitadas - data.perdas;
                const taxaSucesso = ((data.evitadas / (data.evitadas + data.perdas)) * 100).toFixed(1);

                return (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{data.month}</td>
                    <td className="px-6 py-4">
                      <span className="text-red-600 font-medium">R$ {data.perdas},00</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-blue-600 font-medium">R$ {data.evitadas},00</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-blue-600 font-semibold">R$ {economia},00</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${taxaSucesso}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{taxaSucesso}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">ROI do Sistema</h3>
          <p className="text-4xl font-bold mb-2">490%</p>
          <p className="text-blue-100">Retorno sobre investimento em 6 meses</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Produtos Salvos</h3>
          <p className="text-4xl font-bold mb-2">1.240</p>
          <p className="text-blue-100">Unidades evitadas de descarte</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Campanhas Efetivas</h3>
          <p className="text-4xl font-bold mb-2">92%</p>
          <p className="text-purple-100">Taxa de conversão de cupons</p>
        </div>
      </div>
    </div>
  );
}
