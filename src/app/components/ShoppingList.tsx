"use client";

import { useState } from 'react';
import { ShoppingItem } from '@/lib/types';
import { Plus, Check, X, ShoppingCart, Sparkles, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ShoppingListProps {
  items: ShoppingItem[];
  onAddItem: (item: ShoppingItem) => void;
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
}

export function ShoppingList({ items, onAddItem, onToggleItem, onRemoveItem }: ShoppingListProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('un');

  const handleAdd = () => {
    if (!name || !quantity) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name,
      quantity: parseFloat(quantity),
      unit,
      checked: false,
      isManual: true,
    };

    onAddItem(newItem);
    setName('');
    setQuantity('');
    setUnit('un');
  };

  const uncheckedItems = items.filter(item => !item.checked);
  const checkedItems = items.filter(item => item.checked);

  return (
    <div className="space-y-4">
      {/* Card de adicionar com visual tecnológico */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Lista de Compras
            </h2>
            <p className="text-sm text-purple-200">Adicione produtos manualmente</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="sm:col-span-2">
            <Label htmlFor="item-name" className="text-sm font-medium mb-2 text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Produto
            </Label>
            <Input
              id="item-name"
              placeholder="Ex: Arroz integral"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <Label htmlFor="item-quantity" className="text-sm font-medium mb-2 text-white">Quantidade</Label>
            <Input
              id="item-quantity"
              type="number"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div>
            <Label htmlFor="item-unit" className="text-sm font-medium mb-2 text-white">Unidade</Label>
            <select
              id="item-unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-white/20 bg-white/10 text-white text-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="un" className="bg-gray-800">un</option>
              <option value="kg" className="bg-gray-800">kg</option>
              <option value="g" className="bg-gray-800">g</option>
              <option value="l" className="bg-gray-800">l</option>
              <option value="ml" className="bg-gray-800">ml</option>
              <option value="pacote" className="bg-gray-800">pacote</option>
            </select>
          </div>
        </div>

        <Button
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar à Lista
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl p-4 border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-emerald-400" />
            <p className="text-sm text-emerald-200">Pendentes</p>
          </div>
          <p className="text-3xl font-bold text-white">{uncheckedItems.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-5 h-5 text-purple-400" />
            <p className="text-sm text-purple-200">Comprados</p>
          </div>
          <p className="text-3xl font-bold text-white">{checkedItems.length}</p>
        </div>
      </div>

      {/* Lista de itens pendentes */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
        <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
          Itens Pendentes ({uncheckedItems.length})
        </h3>
        
        {uncheckedItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/50">Nenhum item pendente</p>
          </div>
        ) : (
          <div className="space-y-3">
            {uncheckedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-500/50 group"
              >
                <button
                  onClick={() => onToggleItem(item.id)}
                  className="w-7 h-7 rounded-lg border-2 border-white/30 hover:border-emerald-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                >
                  {item.checked && <Check className="w-5 h-5 text-emerald-400" />}
                </button>
                <div className="flex-1">
                  <p className="font-semibold text-white text-lg">
                    {item.name}
                  </p>
                  <p className="text-sm text-purple-200">
                    {item.quantity} {item.unit}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Lista de itens comprados */}
        {checkedItems.length > 0 && (
          <>
            <h3 className="text-xl font-bold mt-8 mb-4 text-white flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Comprados ({checkedItems.length})
            </h3>
            <div className="space-y-3">
              {checkedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-emerald-500/10 backdrop-blur-sm rounded-xl border border-emerald-500/30 opacity-70"
                >
                  <button
                    onClick={() => onToggleItem(item.id)}
                    className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </button>
                  <div className="flex-1">
                    <p className="font-semibold text-white line-through text-lg">
                      {item.name}
                    </p>
                    <p className="text-sm text-emerald-200">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
