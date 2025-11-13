"use client";

import { useState } from 'react';
import { ShoppingItem } from '@/lib/types';
import { Calendar, TrendingUp, Sparkles, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeeklySuggestion {
  category: string;
  items: {
    name: string;
    quantity: number;
    unit: string;
    estimatedPrice: number;
    priority: 'high' | 'medium' | 'low';
  }[];
}

const WEEKLY_SUGGESTIONS: WeeklySuggestion[] = [
  {
    category: 'Proteínas',
    items: [
      { name: 'Peito de Frango', quantity: 1, unit: 'kg', estimatedPrice: 18.90, priority: 'high' },
      { name: 'Ovos', quantity: 12, unit: 'un', estimatedPrice: 12.50, priority: 'high' },
      { name: 'Carne Moída', quantity: 500, unit: 'g', estimatedPrice: 15.90, priority: 'medium' },
    ],
  },
  {
    category: 'Vegetais & Verduras',
    items: [
      { name: 'Tomate', quantity: 1, unit: 'kg', estimatedPrice: 6.90, priority: 'high' },
      { name: 'Alface', quantity: 2, unit: 'un', estimatedPrice: 5.80, priority: 'high' },
      { name: 'Cenoura', quantity: 500, unit: 'g', estimatedPrice: 3.50, priority: 'medium' },
      { name: 'Brócolis', quantity: 1, unit: 'un', estimatedPrice: 7.90, priority: 'medium' },
    ],
  },
  {
    category: 'Carboidratos',
    items: [
      { name: 'Arroz Integral', quantity: 1, unit: 'kg', estimatedPrice: 8.90, priority: 'high' },
      { name: 'Macarrão Integral', quantity: 500, unit: 'g', estimatedPrice: 5.50, priority: 'medium' },
      { name: 'Batata', quantity: 1, unit: 'kg', estimatedPrice: 4.90, priority: 'low' },
    ],
  },
  {
    category: 'Laticínios',
    items: [
      { name: 'Leite Integral', quantity: 2, unit: 'l', estimatedPrice: 9.80, priority: 'high' },
      { name: 'Queijo Mussarela', quantity: 300, unit: 'g', estimatedPrice: 12.90, priority: 'medium' },
      { name: 'Iogurte Natural', quantity: 4, unit: 'un', estimatedPrice: 11.60, priority: 'low' },
    ],
  },
];

interface WeeklySuggestionsProps {
  onAddToShoppingList: (item: ShoppingItem) => void;
}

export function WeeklySuggestions({ onAddToShoppingList }: WeeklySuggestionsProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemName: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemName)) {
      newSelected.delete(itemName);
    } else {
      newSelected.add(itemName);
    }
    setSelectedItems(newSelected);
  };

  const addSelectedToList = () => {
    let addedCount = 0;
    WEEKLY_SUGGESTIONS.forEach(category => {
      category.items.forEach(item => {
        if (selectedItems.has(item.name)) {
          const shoppingItem: ShoppingItem = {
            id: `weekly-${Date.now()}-${Math.random()}`,
            name: item.name,
            quantity: item.quantity,
            unit: item.unit,
            checked: false,
            isManual: false,
          };
          onAddToShoppingList(shoppingItem);
          addedCount++;
        }
      });
    });
    
    if (addedCount > 0) {
      alert(`${addedCount} ${addedCount === 1 ? 'item adicionado' : 'itens adicionados'} à lista de compras!`);
      setSelectedItems(new Set());
    }
  };

  const totalEstimated = WEEKLY_SUGGESTIONS.reduce((total, category) => {
    return total + category.items.reduce((catTotal, item) => {
      return catTotal + (selectedItems.has(item.name) ? item.estimatedPrice : 0);
    }, 0);
  }, 0);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Essencial';
      case 'medium': return 'Importante';
      case 'low': return 'Opcional';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com animação */}
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Sugestões da Semana</h2>
              <p className="text-white/80 text-sm">Baseado em IA e tendências nutricionais</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Calendar className="w-6 h-6 mb-2" />
              <p className="text-2xl font-bold">{selectedItems.size}</p>
              <p className="text-sm text-white/80">Itens selecionados</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <TrendingUp className="w-6 h-6 mb-2" />
              <p className="text-2xl font-bold">R$ {totalEstimated.toFixed(2)}</p>
              <p className="text-sm text-white/80">Valor estimado</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 col-span-2 sm:col-span-1">
              <ShoppingBag className="w-6 h-6 mb-2" />
              <p className="text-2xl font-bold">7 dias</p>
              <p className="text-sm text-white/80">Planejamento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categorias de produtos */}
      <div className="space-y-4">
        {WEEKLY_SUGGESTIONS.map((category, categoryIndex) => (
          <div
            key={categoryIndex}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
              {category.category}
            </h3>

            <div className="space-y-3">
              {category.items.map((item, itemIndex) => {
                const isSelected = selectedItems.has(item.name);
                return (
                  <div
                    key={itemIndex}
                    onClick={() => toggleItem(item.name)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-500 shadow-md scale-105'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                    }`}
                  >
                    {/* Checkbox customizado */}
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-br from-purple-500 to-pink-600 border-purple-500'
                        : 'border-gray-300 dark:border-gray-500'
                    }`}>
                      {isSelected && (
                        <Plus className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Informações do item */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                          {item.name}
                        </p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${getPriorityColor(item.priority)}`}>
                          {getPriorityLabel(item.priority)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.quantity} {item.unit}
                      </p>
                    </div>

                    {/* Preço */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        R$ {item.estimatedPrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">estimado</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Botão de adicionar à lista */}
      {selectedItems.size > 0 && (
        <div className="sticky bottom-4 z-20">
          <Button
            onClick={addSelectedToList}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-bold py-6 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 animate-pulse"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Adicionar {selectedItems.size} {selectedItems.size === 1 ? 'item' : 'itens'} à Lista (R$ {totalEstimated.toFixed(2)})
          </Button>
        </div>
      )}

      {/* Dicas */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">💡 Dica Inteligente</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Essas sugestões foram geradas por IA considerando: valor nutricional, sazonalidade, 
              preços médios e suas preferências anteriores. Itens marcados como "Essencial" são 
              fundamentais para uma alimentação balanceada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
