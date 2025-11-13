"use client";

import { useState } from 'react';
import { UserProfile } from '@/lib/types';
import { User, Mail, Phone, Users, Heart, ChefHat, Save, Edit2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface UserProfileProps {
  profile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
}

export function UserProfileComponent({ profile, onSaveProfile }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(!profile);
  const [formData, setFormData] = useState<Partial<UserProfile>>(
    profile || {
      name: '',
      email: '',
      phone: '',
      dietaryRestrictions: [],
      allergies: [],
      householdSize: 1,
      preferredCuisines: [],
    }
  );

  const [newRestriction, setNewRestriction] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newCuisine, setNewCuisine] = useState('');

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert('Por favor, preencha nome e email');
      return;
    }

    const profileToSave: UserProfile = {
      id: profile?.id || Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dietaryRestrictions: formData.dietaryRestrictions || [],
      allergies: formData.allergies || [],
      householdSize: formData.householdSize || 1,
      preferredCuisines: formData.preferredCuisines || [],
      createdAt: profile?.createdAt || new Date().toISOString(),
    };

    onSaveProfile(profileToSave);
    setIsEditing(false);
  };

  const addItem = (type: 'restriction' | 'allergy' | 'cuisine') => {
    if (type === 'restriction' && newRestriction) {
      setFormData({
        ...formData,
        dietaryRestrictions: [...(formData.dietaryRestrictions || []), newRestriction],
      });
      setNewRestriction('');
    } else if (type === 'allergy' && newAllergy) {
      setFormData({
        ...formData,
        allergies: [...(formData.allergies || []), newAllergy],
      });
      setNewAllergy('');
    } else if (type === 'cuisine' && newCuisine) {
      setFormData({
        ...formData,
        preferredCuisines: [...(formData.preferredCuisines || []), newCuisine],
      });
      setNewCuisine('');
    }
  };

  const removeItem = (type: 'restriction' | 'allergy' | 'cuisine', item: string) => {
    if (type === 'restriction') {
      setFormData({
        ...formData,
        dietaryRestrictions: formData.dietaryRestrictions?.filter((r) => r !== item),
      });
    } else if (type === 'allergy') {
      setFormData({
        ...formData,
        allergies: formData.allergies?.filter((a) => a !== item),
      });
    } else if (type === 'cuisine') {
      setFormData({
        ...formData,
        preferredCuisines: formData.preferredCuisines?.filter((c) => c !== item),
      });
    }
  };

  if (!isEditing && profile) {
    return (
      <div className="bg-gradient-to-br from-white/95 to-purple-50/95 dark:from-gray-800/95 dark:to-purple-900/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200/50 dark:border-purple-500/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg animate-pulse"></div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {profile.name}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Membro desde {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</span>
            </div>
            <p className="text-gray-800 dark:text-gray-100">{profile.email}</p>
          </div>

          {profile.phone && (
            <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Telefone</span>
              </div>
              <p className="text-gray-800 dark:text-gray-100">{profile.phone}</p>
            </div>
          )}

          <div className="bg-white/50 dark:bg-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pessoas em Casa</span>
            </div>
            <p className="text-gray-800 dark:text-gray-100">{profile.householdSize} pessoa(s)</p>
          </div>
        </div>

        {profile.dietaryRestrictions.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-pink-600" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Restrições Alimentares</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.dietaryRestrictions.map((restriction) => (
                <span
                  key={restriction}
                  className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm"
                >
                  {restriction}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.allergies.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-red-600" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Alergias</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.allergies.map((allergy) => (
                <span
                  key={allergy}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.preferredCuisines.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ChefHat className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">Cozinhas Preferidas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.preferredCuisines.map((cuisine) => (
                <span
                  key={cuisine}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/95 to-purple-50/95 dark:from-gray-800/95 dark:to-purple-900/30 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200/50 dark:border-purple-500/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg animate-pulse"></div>
          <div className="relative w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {profile ? 'Editar Perfil' : 'Complete seu Check-in'}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium mb-1">Nome Completo *</Label>
            <Input
              id="name"
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium mb-1">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium mb-1">Telefone</Label>
            <Input
              id="phone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="household" className="text-sm font-medium mb-1">Pessoas em Casa</Label>
            <Input
              id="household"
              type="number"
              min="1"
              value={formData.householdSize}
              onChange={(e) => setFormData({ ...formData, householdSize: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Restrições Alimentares</Label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Ex: Vegetariano, Vegano, Sem Glúten"
              value={newRestriction}
              onChange={(e) => setNewRestriction(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem('restriction')}
            />
            <Button onClick={() => addItem('restriction')} variant="outline">
              Adicionar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.dietaryRestrictions?.map((restriction) => (
              <span
                key={restriction}
                className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-pink-200"
                onClick={() => removeItem('restriction', restriction)}
              >
                {restriction} ×
              </span>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Alergias</Label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Ex: Amendoim, Lactose, Frutos do Mar"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem('allergy')}
            />
            <Button onClick={() => addItem('allergy')} variant="outline">
              Adicionar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.allergies?.map((allergy) => (
              <span
                key={allergy}
                className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-red-200"
                onClick={() => removeItem('allergy', allergy)}
              >
                {allergy} ×
              </span>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Cozinhas Preferidas</Label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Ex: Italiana, Japonesa, Brasileira"
              value={newCuisine}
              onChange={(e) => setNewCuisine(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem('cuisine')}
            />
            <Button onClick={() => addItem('cuisine')} variant="outline">
              Adicionar
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.preferredCuisines?.map((cuisine) => (
              <span
                key={cuisine}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm flex items-center gap-1 cursor-pointer hover:bg-purple-200"
                onClick={() => removeItem('cuisine', cuisine)}
              >
                {cuisine} ×
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Perfil
          </Button>
          {profile && (
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancelar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
