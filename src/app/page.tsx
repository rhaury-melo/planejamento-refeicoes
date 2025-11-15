"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Ingredient, Recipe, ShoppingItem, UserProfile } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { IngredientManager } from './components/IngredientManager';
import { ShoppingList } from './components/ShoppingList';
import { MealPlanner } from './components/MealPlanner';
import { WeeklySuggestions } from './components/WeeklySuggestions';
import { UserProfileComponent } from './components/UserProfile';
import { PantryView } from './components/PantryView';
import { AuthForm } from './components/AuthForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChefHat, ShoppingCart, Package, Sparkles, Zap, User, Home as HomeIcon, LogOut } from 'lucide-react';
import { getStoredUser, logout } from '@/lib/auth';
import { Button } from '@/components/ui/button';

// Banco de receitas exemplo
const RECIPE_DATABASE: Recipe[] = [
  {
    id: '1',
    name: 'Omelete com Legumes',
    category: 'cafe',
    prepTime: 15,
    ingredients: [
      { ingredientId: 'egg', name: 'Ovos', quantity: 3, unit: 'un' },
      { ingredientId: 'tomato', name: 'Tomate', quantity: 1, unit: 'un' },
      { ingredientId: 'onion', name: 'Cebola', quantity: 0.5, unit: 'un' },
    ],
    instructions: 'Bata os ovos, adicione os legumes picados, tempere e frite em fogo médio até dourar.',
  },
  {
    id: '2',
    name: 'Arroz com Frango e Brócolis',
    category: 'almoco',
    prepTime: 35,
    ingredients: [
      { ingredientId: 'rice', name: 'Arroz', quantity: 200, unit: 'g' },
      { ingredientId: 'chicken', name: 'Peito de Frango', quantity: 300, unit: 'g' },
      { ingredientId: 'broccoli', name: 'Brócolis', quantity: 200, unit: 'g' },
    ],
    instructions: 'Cozinhe o arroz. Grelhe o frango temperado. Cozinhe o brócolis no vapor. Sirva junto.',
  },
  {
    id: '3',
    name: 'Sopa de Legumes',
    category: 'jantar',
    prepTime: 30,
    ingredients: [
      { ingredientId: 'carrot', name: 'Cenoura', quantity: 2, unit: 'un' },
      { ingredientId: 'potato', name: 'Batata', quantity: 2, unit: 'un' },
      { ingredientId: 'onion', name: 'Cebola', quantity: 1, unit: 'un' },
    ],
    instructions: 'Refogue a cebola, adicione os legumes picados e água. Cozinhe até amolecer e tempere a gosto.',
  },
  {
    id: '4',
    name: 'Vitamina de Banana',
    category: 'lanche',
    prepTime: 5,
    ingredients: [
      { ingredientId: 'banana', name: 'Banana', quantity: 2, unit: 'un' },
      { ingredientId: 'milk', name: 'Leite', quantity: 300, unit: 'ml' },
      { ingredientId: 'honey', name: 'Mel', quantity: 1, unit: 'colher' },
    ],
    instructions: 'Bata todos os ingredientes no liquidificador até ficar homogêneo. Sirva gelado.',
  },
  {
    id: '5',
    name: 'Panqueca Integral',
    category: 'cafe',
    prepTime: 20,
    ingredients: [
      { ingredientId: 'flour', name: 'Farinha Integral', quantity: 150, unit: 'g' },
      { ingredientId: 'egg', name: 'Ovos', quantity: 2, unit: 'un' },
      { ingredientId: 'milk', name: 'Leite', quantity: 200, unit: 'ml' },
    ],
    instructions: 'Misture todos os ingredientes até formar uma massa lisa. Frite em frigideira antiaderente.',
  },
  {
    id: '6',
    name: 'Salada Caesar com Frango',
    category: 'almoco',
    prepTime: 25,
    ingredients: [
      { ingredientId: 'lettuce', name: 'Alface', quantity: 1, unit: 'un' },
      { ingredientId: 'chicken', name: 'Peito de Frango', quantity: 200, unit: 'g' },
      { ingredientId: 'cheese', name: 'Queijo Parmesão', quantity: 50, unit: 'g' },
    ],
    instructions: 'Grelhe o frango e corte em tiras. Monte a salada com alface, frango e queijo ralado.',
  },
];

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const [ingredients, setIngredients, ingredientsLoaded] = useLocalStorage<Ingredient[]>('menufacil-ingredients', []);
  const [shoppingList, setShoppingList, shoppingLoaded] = useLocalStorage<ShoppingItem[]>('menufacil-shopping', []);
  const [currentPlan, setCurrentPlan, planLoaded] = useLocalStorage<Recipe[]>('menufacil-plan', []);
  const [userProfile, setUserProfile, profileLoaded] = useLocalStorage<UserProfile | null>('menufacil-profile', null);
  const [activeTab, setActiveTab] = useState('profile');

  // Verifica autenticação e assinatura ao carregar
  useEffect(() => {
    const user = getStoredUser();
    const subscription = localStorage.getItem('menufacil-subscription');
    
    if (!user || !subscription) {
      // Redireciona para landing page se não estiver autenticado ou sem assinatura
      router.push('/landing');
      return;
    }

    const subscriptionData = JSON.parse(subscription);
    if (subscriptionData.status !== 'active') {
      router.push('/landing');
      return;
    }

    setIsAuthenticated(true);
    setHasSubscription(true);
    setCurrentUser(user);
  }, [router]);

  const handleAuthSuccess = () => {
    const user = getStoredUser();
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('menufacil-subscription');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setHasSubscription(false);
    router.push('/landing');
  };

  const handleAddIngredient = (ingredient: Ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const handleAddShoppingItem = (item: ShoppingItem) => {
    setShoppingList([...shoppingList, item]);
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingList(
      shoppingList.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRemoveShoppingItem = (id: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const generateMealPlan = () => {
    // Algoritmo simples: seleciona receitas que podem ser feitas com ingredientes disponíveis
    const availableIngredientNames = ingredients.map(ing => 
      ing.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );

    // Filtra receitas que têm pelo menos 50% dos ingredientes disponíveis
    const possibleRecipes = RECIPE_DATABASE.filter(recipe => {
      const matchingIngredients = recipe.ingredients.filter(recipeIng => {
        const normalizedName = recipeIng.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return availableIngredientNames.some(availName => 
          availName.includes(normalizedName) || normalizedName.includes(availName)
        );
      });
      return matchingIngredients.length >= recipe.ingredients.length * 0.3;
    });

    // Seleciona uma receita de cada categoria se possível
    const plan: Recipe[] = [];
    const categories: Recipe['category'][] = ['cafe', 'almoco', 'jantar', 'lanche'];

    categories.forEach(category => {
      const recipesInCategory = possibleRecipes.filter(r => r.category === category);
      if (recipesInCategory.length > 0) {
        const randomRecipe = recipesInCategory[Math.floor(Math.random() * recipesInCategory.length)];
        plan.push(randomRecipe);
      }
    });

    // Se não encontrou receitas suficientes, adiciona receitas aleatórias
    if (plan.length < 4) {
      const remainingRecipes = RECIPE_DATABASE.filter(r => !plan.find(p => p.id === r.id));
      while (plan.length < 4 && remainingRecipes.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingRecipes.length);
        plan.push(remainingRecipes[randomIndex]);
        remainingRecipes.splice(randomIndex, 1);
      }
    }

    setCurrentPlan(plan);

    // Gera lista de compras automaticamente
    const missingIngredients: ShoppingItem[] = [];
    plan.forEach(recipe => {
      recipe.ingredients.forEach(recipeIng => {
        const hasIngredient = ingredients.some(ing => 
          ing.name.toLowerCase().includes(recipeIng.name.toLowerCase()) ||
          recipeIng.name.toLowerCase().includes(ing.name.toLowerCase())
        );

        if (!hasIngredient) {
          const alreadyInList = shoppingList.some(item => 
            item.name.toLowerCase() === recipeIng.name.toLowerCase()
          );

          if (!alreadyInList && !missingIngredients.some(item => item.name === recipeIng.name)) {
            missingIngredients.push({
              id: `auto-${Date.now()}-${Math.random()}`,
              name: recipeIng.name,
              quantity: recipeIng.quantity,
              unit: recipeIng.unit,
              checked: false,
              isManual: false,
            });
          }
        }
      });
    });

    if (missingIngredients.length > 0) {
      setShoppingList([...shoppingList, ...missingIngredients]);
    }

    // Muda para a aba do cardápio
    setActiveTab('planner');
  };

  // Se não estiver autenticado ou sem assinatura, mostra loading enquanto redireciona
  if (!isAuthenticated || !hasSubscription) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold animate-pulse">Redirecionando...</p>
        </div>
      </div>
    );
  }

  if (!ingredientsLoaded || !shoppingLoaded || !planLoaded || !profileLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold animate-pulse">Carregando experiência...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 relative overflow-hidden">
      {/* Efeitos de fundo animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header futurista */}
      <header className="bg-white/95 backdrop-blur-xl shadow-2xl sticky top-0 z-50 border-b border-emerald-200">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl blur-lg animate-pulse"></div>
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <ChefHat className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-700 via-teal-700 to-blue-700 bg-clip-text text-transparent">
                  MenuFácil
                </h1>
                <p className="text-xs sm:text-sm text-emerald-700 flex items-center gap-1">
                  <Zap className="w-3 h-3 animate-pulse" />
                  Powered by AI
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {currentUser && (
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full border border-emerald-300">
                  <User className="w-4 h-4 text-emerald-700" />
                  <span className="text-sm font-semibold text-emerald-800">{currentUser.name.split(' ')[0]}</span>
                </div>
              )}
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-emerald-700 hover:bg-emerald-100"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-white/95 backdrop-blur-xl p-1.5 rounded-2xl shadow-2xl border border-emerald-200 overflow-x-auto">
            <TabsTrigger 
              value="profile" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white text-gray-700 rounded-xl transition-all data-[state=active]:shadow-lg"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pantry" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white text-gray-700 rounded-xl transition-all data-[state=active]:shadow-lg"
            >
              <HomeIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Dispensa</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ingredients" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white text-gray-700 rounded-xl transition-all data-[state=active]:shadow-lg"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Ingredientes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="planner"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white text-gray-700 rounded-xl transition-all data-[state=active]:shadow-lg"
            >
              <ChefHat className="w-4 h-4" />
              <span className="hidden sm:inline">Cardápio</span>
            </TabsTrigger>
            <TabsTrigger 
              value="shopping"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white text-gray-700 rounded-xl transition-all data-[state=active]:shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Compras</span>
            </TabsTrigger>
            <TabsTrigger 
              value="suggestions"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white text-gray-700 rounded-xl transition-all data-[state=active]:shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Sugestões</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0">
            <UserProfileComponent profile={userProfile} onSaveProfile={handleSaveProfile} />
          </TabsContent>

          <TabsContent value="pantry" className="mt-0">
            <PantryView ingredients={ingredients} />
          </TabsContent>

          <TabsContent value="ingredients" className="mt-0">
            <IngredientManager
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
            />
          </TabsContent>

          <TabsContent value="planner" className="mt-0">
            <MealPlanner
              ingredients={ingredients}
              onGeneratePlan={generateMealPlan}
              currentPlan={currentPlan}
            />
          </TabsContent>

          <TabsContent value="shopping" className="mt-0">
            <ShoppingList
              items={shoppingList}
              onAddItem={handleAddShoppingItem}
              onToggleItem={handleToggleShoppingItem}
              onRemoveItem={handleRemoveShoppingItem}
            />
          </TabsContent>

          <TabsContent value="suggestions" className="mt-0">
            <WeeklySuggestions onAddToShoppingList={handleAddShoppingItem} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer futurista */}
      <footer className="bg-white/95 backdrop-blur-xl mt-12 py-8 border-t border-emerald-200 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
            <p className="text-lg font-semibold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
              MenuFácil - Tecnologia que Emociona
            </p>
            <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
          </div>
          <p className="text-sm text-emerald-700">
            Planeje suas refeições com inteligência artificial
          </p>
          <p className="text-xs text-emerald-600 mt-2">
            Economize tempo, dinheiro e reduza desperdícios
          </p>
        </div>
      </footer>
    </div>
  );
}
