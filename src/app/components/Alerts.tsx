import { useState } from 'react';
import { AlertTriangle, Users, Ticket, Send, Check } from 'lucide-react';

interface AlertProduct {
  id: number;
  name: string;
  brand: string;
  daysRemaining: number;
  quantity: number;
  value: string;
  customers: Customer[];
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastPurchase: string;
}

const alertProducts: AlertProduct[] = [
  {
    id: 1,
    name: 'Whey Protein Chocolate 900g',
    brand: 'NutriMax',
    daysRemaining: 5,
    quantity: 10,
    value: 'R$ 450,00',
    customers: [
      { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(11) 98765-4321', lastPurchase: '2026-03-15' },
      { id: 2, name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 99876-5432', lastPurchase: '2026-03-10' },
    ],
  },
  {
    id: 2,
    name: 'BCAA 2:1:1 120 cáps',
    brand: 'FitSupp',
    daysRemaining: 8,
    quantity: 15,
    value: 'R$ 320,00',
    customers: [
      { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 97654-3210', lastPurchase: '2026-02-28' },
    ],
  },
  {
    id: 3,
    name: 'Creatina Monohidratada 300g',
    brand: 'PowerFit',
    daysRemaining: 12,
    quantity: 8,
    value: 'R$ 280,00',
    customers: [
      { id: 4, name: 'Ana Oliveira', email: 'ana@email.com', phone: '(11) 96543-2109', lastPurchase: '2026-03-20' },
      { id: 5, name: 'Carlos Souza', email: 'carlos@email.com', phone: '(11) 95432-1098', lastPurchase: '2026-03-05' },
    ],
  },
];

export function Alerts() {
  const [selectedProduct, setSelectedProduct] = useState<AlertProduct | null>(null);
  const [showCustomers, setShowCustomers] = useState(false);
  const [generatedCoupon, setGeneratedCoupon] = useState<{ code: string; discount: string } | null>(null);
  const [campaignSent, setCampaignSent] = useState(false);

  const handleGenerateCoupon = (productId: number) => {
    const couponCode = `FIT${productId}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setGeneratedCoupon({
      code: couponCode,
      discount: '25%',
    });
    setCampaignSent(false);
  };

  const handleSendCampaign = () => {
    setCampaignSent(true);
    setTimeout(() => {
      setCampaignSent(false);
      setGeneratedCoupon(null);
      setShowCustomers(false);
      setSelectedProduct(null);
    }, 3000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Alertas e CRM</h1>
        <p className="text-gray-500 mt-1">Gerencie produtos em risco e campanhas de clientes</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <span className="text-3xl font-bold text-red-700">24</span>
          </div>
          <p className="text-red-800 font-medium">Produtos em Risco</p>
          <p className="text-sm text-red-600 mt-1">Próximos ao vencimento</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-amber-600" />
            <span className="text-3xl font-bold text-amber-700">156</span>
          </div>
          <p className="text-amber-800 font-medium">Clientes Relacionados</p>
          <p className="text-sm text-amber-600 mt-1">Que compraram esses produtos</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <Ticket className="w-8 h-8 text-blue-600" />
            <span className="text-3xl font-bold text-blue-700">12</span>
          </div>
          <p className="text-blue-800 font-medium">Campanhas Ativas</p>
          <p className="text-sm text-blue-600 mt-1">Cupons promocionais enviados</p>
        </div>
      </div>

      {/* Alert Products List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Produtos Próximos ao Vencimento</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {alertProducts.map((product) => (
            <div key={product.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      product.daysRemaining <= 7
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                      {product.daysRemaining} dias restantes
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{product.brand} • {product.quantity} unidades</p>
                  <p className="text-sm font-medium text-red-600">Valor em risco: {product.value}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowCustomers(true);
                    setGeneratedCoupon(null);
                    setCampaignSent(false);
                  }}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <Users className="w-4 h-4" />
                  Ver Clientes Relacionados ({product.customers.length})
                </button>
                <button
                  onClick={() => handleGenerateCoupon(product.id)}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <Ticket className="w-4 h-4" />
                  Gerar Cupom
                </button>
              </div>

              {/* Customer List */}
              {showCustomers && selectedProduct?.id === product.id && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3">Clientes que compraram este produto:</h4>
                  <div className="space-y-2">
                    {product.customers.map((customer) => (
                      <div key={customer.id} className="bg-white p-3 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{customer.name}</p>
                          <p className="text-sm text-gray-600">{customer.email} • {customer.phone}</p>
                        </div>
                        <span className="text-xs text-gray-500">Última compra: {new Date(customer.lastPurchase).toLocaleDateString('pt-BR')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Generated Coupon */}
              {generatedCoupon && selectedProduct?.id === product.id && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-3">Cupom Gerado com Sucesso!</h4>
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-blue-300 mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Código do Cupom:</p>
                        <p className="text-2xl font-bold text-blue-700 font-mono">{generatedCoupon.code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Desconto:</p>
                        <p className="text-3xl font-bold text-blue-700">{generatedCoupon.discount}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSendCampaign}
                    disabled={campaignSent}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition ${
                      campaignSent
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {campaignSent ? (
                      <>
                        <Check className="w-5 h-5" />
                        Campanha Enviada com Sucesso!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Campanha para {product.customers.length} Cliente(s)
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
