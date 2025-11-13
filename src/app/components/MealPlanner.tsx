"use client";

import { Recipe, Ingredient } from '@/lib/types';
import { Coffee, Utensils, Moon, Cookie, Clock, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MealPlannerProps {
  ingredients: Ingredient[];
  onGeneratePlan: () => void;
  currentPlan: Recipe[];
}

export function MealPlanner({ ingredients, onGeneratePlan, currentPlan }: MealPlannerProps) {
  const getMealIcon = (category: Recipe['category']) => {
    switch (category) {
      case 'cafe':
        return <Coffee className="w-5 h-5" />;
      case 'almoco':
        return <Utensils className="w-5 h-5" />;
      case 'jantar':
        return <Moon className="w-5 h-5" />;
      case 'lanche':
        return <Cookie className="w-5 h-5" />;
    }
  };

  const getMealLabel = (category: Recipe['category']) => {
    switch (category) {
      case 'cafe':
        return 'Café da Manhã';
      case 'almoco':
        return 'Almoço';
      case 'jantar':
        return 'Jantar';
      case 'lanche':
        return 'Lanche';
    }
  };

  const getMealColor = (category: Recipe['category']) => {
    switch (category) {
      case 'cafe':
        return 'from-orange-400 to-amber-500';
      case 'almoco':
        return 'from-emerald-400 to-teal-500';
      case 'jantar':
        return 'from-indigo-400 to-purple-500';
      case 'lanche':
        return 'from-pink-400 to-rose-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <ChefHat className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
            Cardápio Semanal
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Gere sugestões de refeições baseadas nos seus ingredientes disponíveis
        </p>

        <Button
          onClick={onGeneratePlan}
          disabled={ingredients.length === 0}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChefHat className="w-4 h-4 mr-2" />
          Gerar Cardápio Personalizado
        </Button>

        {ingredients.length === 0 && (
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-2 text-center">
            Adicione ingredientes primeiro para gerar o cardápio
          </p>
        )}
      </div>

      {currentPlan.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentPlan.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getMealColor(recipe.category)} text-white text-sm font-medium mb-3`}>
                {getMealIcon(recipe.category)}
                {getMealLabel(recipe.category)}
              </div>

              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                {recipe.name}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                <Clock className="w-4 h-4" />
                <span>{recipe.prepTime} min</span>
              </div>

              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Ingredientes:
                </p>
                <ul className="space-y-1">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                      • {ing.name} ({ing.quantity} {ing.unit})
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Modo de preparo:
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {recipe.instructions}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
