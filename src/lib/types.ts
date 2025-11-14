// Tipos do MenuFácil

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: 'proteina' | 'vegetal' | 'carboidrato' | 'laticinios' | 'temperos' | 'outros';
  expiryDate?: string;
  addedDate?: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: 'cafe' | 'almoco' | 'jantar' | 'lanche';
  ingredients: {
    ingredientId: string;
    name: string;
    quantity: number;
    unit: string;
  }[];
  instructions: string;
  prepTime: number;
}

export interface MealPlan {
  id: string;
  date: string;
  meals: {
    cafe?: Recipe;
    almoco?: Recipe;
    jantar?: Recipe;
    lanche?: Recipe;
  };
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  isManual: boolean;
}

export interface Reminder {
  id: string;
  mealId: string;
  mealName: string;
  time: string;
  enabled: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dietaryRestrictions: string[];
  allergies: string[];
  householdSize: number;
  preferredCuisines: string[];
  avatar?: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: 'free' | 'pro' | 'premium';
  status: 'active' | 'inactive' | 'cancelled';
  startDate: string;
  endDate?: string;
}
