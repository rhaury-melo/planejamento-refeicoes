"use client";

import { useState } from 'react';
import { Check, Sparkles, Zap, Crown, Rocket, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { upgradePlan, getStoredSubscription } from '@/lib/auth';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Básico',
    price: 0,
    period: 'Grátis para sempre',
    icon: <Sparkles className="w-8 h-8" />,
    gradient: 'from-gray-400 to-gray-600',
    features: [
      'Até 20 ingredientes cadastrados',
      'Cardápio semanal básico',
      'Lista de compras manual',
      'Receitas básicas',
      'Suporte por email',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.90,
    period: 'por mês',
    icon: <Zap className="w-8 h-8" />,
    gradient: 'from-blue-500 to-indigo-600',
    popular: true,
    features: [
      'Ingredientes ilimitados',
      'IA para sugestões personalizadas',
      'Lista de compras inteligente',
      'Receitas premium exclusivas',
      'Análise nutricional completa',
      'Substituições automáticas',
      'Suporte prioritário 24/7',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 39.90,
    period: 'por mês',
    icon: <Crown className="w-8 h-8" />,
    gradient: 'from-purple-500 to-pink-600',
    features: [
      'Tudo do plano Pro',
      'Planejamento mensal completo',
      'Integração com supermercados',
      'Comparação de preços',
      'Receitas de chefs renomados',
      'Vídeos tutoriais exclusivos',
      'Consultoria nutricional mensal',
      'Acesso antecipado a novidades',
    ],
  },
];

export function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const currentSubscription = getStoredSubscription();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    
    if (planId === 'free') {
      alert('Você já tem acesso ao plano Básico!');
      return;
    }

    // Simula processo de pagamento
    const confirmed = confirm(
      `Deseja assinar o plano ${planId.toUpperCase()}?\n\nEm um ambiente real, você seria redirecionado para o gateway de pagamento.`
    );

    if (confirmed) {
      const success = upgradePlan(planId as 'pro' | 'premium');
      if (success) {
        alert(`🎉 Parabéns! Você agora é um assinante ${planId.toUpperCase()}!\n\nRecarregue a página para aproveitar todos os recursos.`);
        window.location.reload();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com animação */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
          <Rocket className="w-5 h-5 text-purple-600 animate-pulse" />
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Desbloqueie todo o potencial
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
          Escolha seu plano ideal
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Transforme sua experiência culinária com recursos exclusivos e tecnologia de ponta
        </p>

        {/* Mostra plano atual */}
        {currentSubscription && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30">
            <Crown className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              Plano atual: {currentSubscription.planId.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Cards de planos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isCurrentPlan = currentSubscription?.planId === plan.id;
          
          return (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                plan.popular ? 'ring-4 ring-purple-500/50 ring-offset-4 ring-offset-gray-50 dark:ring-offset-gray-900' : ''
              } ${isCurrentPlan ? 'ring-4 ring-emerald-500/50' : ''}`}
            >
              {/* Badge "Popular" */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    ⭐ Mais Popular
                  </div>
                </div>
              )}

              {/* Badge "Plano Atual" */}
              {isCurrentPlan && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    ✓ Seu Plano
                  </div>
                </div>
              )}

              {/* Ícone com gradiente */}
              <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                {plan.icon}
              </div>

              {/* Nome do plano */}
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {plan.name}
              </h3>

              {/* Preço */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    R$ {plan.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{plan.period}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Botão de ação */}
              <Button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isCurrentPlan}
                className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-semibold py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl ${
                  plan.popular && !isCurrentPlan ? 'animate-pulse' : ''
                } ${isCurrentPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isCurrentPlan ? (
                  'Plano Atual'
                ) : plan.price === 0 ? (
                  'Plano Gratuito'
                ) : (
                  'Assinar Agora'
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Garantia */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 text-center border border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
            Garantia de 7 dias
          </h4>
        </div>
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          Não gostou? Devolvemos 100% do seu dinheiro, sem perguntas
        </p>
      </div>

      {/* Informações sobre pagamento */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-1">
              Pagamento 100% seguro
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Seus dados estão protegidos com criptografia de ponta a ponta. Aceitamos cartão de crédito, débito e PIX.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
