import { useState } from 'react';
import { User, Phone, Mail, ShoppingBag, Calendar, Search, Plus, Edit2, Trash2 } from 'lucide-react';

interface Purchase {
  id: number;
  product: string;
  quantity: number;
  value: string;
  date: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  totalPurchases: number;
  totalSpent: string;
  purchases: Purchase[];
}

const customersData: Customer[] = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 98765-4321',
    registrationDate: '2025-01-15',
    totalPurchases: 12,
    totalSpent: 'R$ 1.450,00',
    purchases: [
      { id: 1, product: 'Whey Protein Chocolate 900g', quantity: 2, value: 'R$ 179,80', date: '2026-03-15' },
      { id: 2, product: 'BCAA 2:1:1 120 cáps', quantity: 1, value: 'R$ 54,90', date: '2026-03-10' },
      { id: 3, product: 'Creatina Monohidratada 300g', quantity: 1, value: 'R$ 69,90', date: '2026-02-20' },
    ],
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    phone: '(11) 99876-5432',
    registrationDate: '2025-02-20',
    totalPurchases: 8,
    totalSpent: 'R$ 890,00',
    purchases: [
      { id: 4, product: 'Whey Protein Chocolate 900g', quantity: 1, value: 'R$ 89,90', date: '2026-03-10' },
      { id: 5, product: 'Barra de Proteína Cookies', quantity: 12, value: 'R$ 90,00', date: '2026-03-05' },
    ],
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    phone: '(11) 97654-3210',
    registrationDate: '2025-03-10',
    totalPurchases: 15,
    totalSpent: 'R$ 2.100,00',
    purchases: [
      { id: 6, product: 'BCAA 2:1:1 120 cáps', quantity: 3, value: 'R$ 164,70', date: '2026-02-28' },
      { id: 7, product: 'Glutamina 300g', quantity: 2, value: 'R$ 159,80', date: '2026-02-15' },
    ],
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    email: 'ana@email.com',
    phone: '(11) 96543-2109',
    registrationDate: '2025-01-05',
    totalPurchases: 20,
    totalSpent: 'R$ 3.200,00',
    purchases: [
      { id: 8, product: 'Creatina Monohidratada 300g', quantity: 2, value: 'R$ 139,80', date: '2026-03-20' },
      { id: 9, product: 'Whey Protein Chocolate 900g', quantity: 3, value: 'R$ 269,70', date: '2026-03-12' },
    ],
  },
  {
    id: 5,
    name: 'Carlos Souza',
    email: 'carlos@email.com',
    phone: '(11) 95432-1098',
    registrationDate: '2025-04-12',
    totalPurchases: 6,
    totalSpent: 'R$ 650,00',
    purchases: [
      { id: 10, product: 'Creatina Monohidratada 300g', quantity: 1, value: 'R$ 69,90', date: '2026-03-05' },
      { id: 11, product: 'Barra de Proteína Cookies', quantity: 6, value: 'R$ 45,00', date: '2026-02-28' },
    ],
  },
];

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(customersData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Editar cliente existente
      setCustomers(customers.map(c =>
        c.id === editingId ? { ...c, name: formData.name, email: formData.email, phone: formData.phone } : c
      ));
      // Atualizar cliente selecionado se for o mesmo
      if (selectedCustomer?.id === editingId) {
        setSelectedCustomer({
          ...selectedCustomer,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        });
      }
      setEditingId(null);
    } else {
      // Adicionar novo cliente
      const newCustomer: Customer = {
        id: customers.length + 1,
        ...formData,
        registrationDate: new Date().toISOString().split('T')[0],
        totalPurchases: 0,
        totalSpent: 'R$ 0,00',
        purchases: [],
      };
      setCustomers([...customers, newCustomer]);
    }
    setFormData({ name: '', email: '', phone: '' });
    setShowForm(false);
  };

  const handleEdit = (customer: Customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
    setEditingId(customer.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      setCustomers(customers.filter(c => c.id !== id));
      // Limpar seleção se for o cliente selecionado
      if (selectedCustomer?.id === id) {
        setSelectedCustomer(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setFormData({ name: '', email: '', phone: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
          <p className="text-gray-500 mt-1">Gerencie seus clientes e histórico de compras</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition shadow-md"
        >
          <Plus className="w-5 h-5" />
          Novo Cliente
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Ex: João Silva"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="cliente@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="(11) 98765-4321"
                required
              />
            </div>
            <div className="md:col-span-3 flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar clientes por nome, e-mail ou telefone..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customers List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Lista de Clientes</h2>
            <p className="text-sm text-gray-600 mt-1">{filteredCustomers.length} clientes cadastrados</p>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`p-4 cursor-pointer transition ${
                  selectedCustomer?.id === customer.id
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Mail className="w-4 h-4" />
                      {customer.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Phone className="w-4 h-4" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {customer.totalPurchases} compras
                      </span>
                      <span className="text-xs font-medium text-blue-700">
                        {customer.totalSpent}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(customer);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Editar cliente"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(customer.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Excluir cliente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Histórico de Compras</h2>
            {selectedCustomer && (
              <p className="text-sm text-gray-600 mt-1">Cliente: {selectedCustomer.name}</p>
            )}
          </div>
          {selectedCustomer ? (
            <div>
              {/* Customer Stats */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total de Compras</p>
                    <p className="text-2xl font-bold text-blue-700">{selectedCustomer.totalPurchases}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Gasto</p>
                    <p className="text-2xl font-bold text-blue-700">{selectedCustomer.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Cliente Desde</p>
                    <p className="text-lg font-semibold text-blue-700">
                      {new Date(selectedCustomer.registrationDate).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchases List */}
              <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
                {selectedCustomer.purchases.map((purchase) => (
                  <div key={purchase.id} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <ShoppingBag className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{purchase.product}</h4>
                          <p className="text-sm text-gray-600 mt-1">Quantidade: {purchase.quantity} un</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(purchase.date).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-700">{purchase.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Selecione um cliente para ver o histórico de compras</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
