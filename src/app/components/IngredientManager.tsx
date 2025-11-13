"use client";

import { useState } from 'react';
import { Ingredient } from '@/lib/types';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IngredientManagerProps {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (id: string) => void;
}

export function IngredientManager({ ingredients, onAddIngredient, onRemoveIngredient }: IngredientManagerProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('un');
  const [category, setCategory] = useState<Ingredient['category']>('outros');

  const handleAdd = () => {
    if (!name || !quantity) return;

    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name,
      quantity: parseFloat(quantity),
      unit,
      category,
    };

    onAddIngredient(newIngredient);
    setName('');
    setQuantity('');
    setUnit('un');
    setCategory('outros');
  };

  const categories = [
    { value: 'proteina', label: 'Proteína' },
    { value: 'vegetal', label: 'Vegetal' },
    { value: 'carboidrato', label: 'Carboidrato' },
    { value: 'laticinios', label: 'Laticínios' },
    { value: 'temperos', label: 'Temperos' },
    { value: 'outros', label: 'Outros' },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Meus Ingredientes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <Label htmlFor="ingredient-name" className="text-sm font-medium mb-1">Nome</Label>
            <Input
              id="ingredient-name"
              placeholder="Ex: Tomate"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="quantity" className="text-sm font-medium mb-1">Qtd</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="unit" className="text-sm font-medium mb-1">Unidade</Label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
              >
                <option value="un">un</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="category" className="text-sm font-medium mb-1">Categoria</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Ingredient['category'])}
              className="w-full h-10 px-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Ingrediente
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Disponíveis ({ingredients.length})
        </h3>
        
        {ingredients.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhum ingrediente cadastrado ainda
          </p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {ingredient.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {ingredient.quantity} {ingredient.unit} • {ingredient.category}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveIngredient(ingredient.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
