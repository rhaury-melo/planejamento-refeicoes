"use client";

import { Ingredient } from '@/lib/types';
import { Package, Calendar, AlertCircle, TrendingUp, Sparkles } from 'lucide-react';

interface PantryViewProps {
  ingredients: Ingredient[];
}

export function PantryView({ ingredients }: PantryViewProps) {
  const categorizeIngredients = () => {
    const categories = {
      proteina: [] as Ingredient[],
      vegetal: [] as Ingredient[],
      carboidrato: [] as Ingredient[],
      laticinios: [] as Ingredient[],
      temperos: [] as Ingredient[],
      outros: [] as Ingredient[],
    };

    ingredients.forEach((ing) => {
      categories[ing.category].push(ing);
    });

    return categories;
  };

  const categorized = categorizeIngredients();

  const categoryLabels = {
    proteina: { label: 'Proteínas', color: 'from-red-500 to-orange-500', bgColor: 'bg-red-50 dark:bg-red-900/20' },
    vegetal: { label: 'Vegetais', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    carboidrato: { label: 'Carboidratos', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20' },
    laticinios: { label: 'Laticínios', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    temperos: { label: 'Temperos', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    outros: { label: 'Outros', color: 'from-gray-500 to-slate-500', bgColor: 'bg-gray-50 dark:bg-gray-900/20' },
  };

  const totalItems = ingredients.length;
  const totalQuantity = ingredients.reduce((sum, ing) => sum + ing.quantity, 0);

  if (ingredients.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/95 to-purple-50/95 dark:from-gray-800/95 dark:to-purple-900/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-200/50 dark:border-purple-500/30 text-center">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg animate-pulse"></div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
            <Package className="w-10 h-10 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Sua Dispensa está Vazia
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Adicione ingredientes na aba "Ingredientes" para começar a gerenciar sua dispensa
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-2xl text-white">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 opacity-80" />
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <p className="text-3xl font-bold mb-1">{totalItems}</p>
          <p className="text-sm opacity-90">Itens Diferentes</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-2xl text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <p className="text-3xl font-bold mb-1">{totalQuantity.toFixed(0)}</p>
          <p className="text-sm opacity-90">Quantidade Total</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 shadow-2xl text-white">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <p className="text-3xl font-bold mb-1">{Object.keys(categorized).filter(cat => categorized[cat as keyof typeof categorized].length > 0).length}</p>
          <p className="text-sm opacity-90">Categorias Ativas</p>
        </div>
      </div>

      {/* Categorias */}
      <div className="bg-gradient-to-br from-white/95 to-purple-50/95 dark:from-gray-800/95 dark:to-purple-900/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200/50 dark:border-purple-500/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg animate-pulse"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Minha Dispensa Completa
          </h2>
        </div>

        <div className="space-y-6">
          {Object.entries(categorized).map(([category, items]) => {
            if (items.length === 0) return null;

            const categoryInfo = categoryLabels[category as keyof typeof categoryLabels];

            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`h-1 flex-1 bg-gradient-to-r ${categoryInfo.color} rounded-full`}></div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {categoryInfo.label} ({items.length})
                  </h3>
                  <div className={`h-1 flex-1 bg-gradient-to-r ${categoryInfo.color} rounded-full`}></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className={`${categoryInfo.bgColor} rounded-xl p-4 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 transition-all hover:shadow-lg hover:scale-105`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                          {ingredient.name}
                        </h4>
                        <Package className="w-4 h-4 text-gray-500" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {ingredient.quantity} {ingredient.unit}
                        </span>
                      </div>

                      {ingredient.expiryDate && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>Validade: {new Date(ingredient.expiryDate).toLocaleDateString()}</span>
                        </div>
                      )}

                      {ingredient.addedDate && (
                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                          <AlertCircle className="w-3 h-3" />
                          <span>Adicionado: {new Date(ingredient.addedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dicas */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border border-purple-300/50 dark:border-purple-600/50">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
              Dica Inteligente
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Mantenha sua dispensa sempre atualizada para receber sugestões de cardápios mais precisas e personalizadas. 
              O MenuFácil usa IA para criar receitas baseadas nos ingredientes que você tem em casa!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
