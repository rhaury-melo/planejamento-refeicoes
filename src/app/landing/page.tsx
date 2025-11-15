"use client";

import { useState } from 'react';
import { ChefHat, Check, Sparkles, TrendingUp, Clock, DollarSign, Users, Star, ArrowRight, Zap, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: 'mensal',
    name: 'Plano Mensal',
    price: 29.90,
    period: 'mês',
    features: [
      'Planejamento semanal ilimitado',
      'Lista de compras inteligente',
      'Sugestões personalizadas com IA',
      'Controle de dispensa',
      'Receitas exclusivas',
      'Suporte prioritário',
    ],
    highlighted: true,
    badge: 'Mais Popular',
  },
];

export default function LandingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>('mensal');

  const handleSubscribe = () => {
    // Redireciona para página de pagamento (a ser implementada)
    window.location.href = '/checkout?plan=' + selectedPlan;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="relative w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border border-white/30">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">MenuFácil</h1>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Transforme Sua Rotina Alimentar com Inteligência Artificial
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Planeje suas refeições semanais em minutos, economize tempo e dinheiro, 
              e reduza o desperdício de alimentos com tecnologia de ponta.
            </p>
            <Button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 text-xl px-10 py-7 rounded-2xl shadow-2xl hover:scale-105 transition-all font-bold"
            >
              Começar Agora <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-50 to-transparent"></div>
      </section>

      {/* Benefícios Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Por Que Escolher o MenuFácil?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnologia que simplifica sua vida e transforma sua relação com a alimentação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-2xl transition-all border-2 border-emerald-100 hover:border-emerald-300 bg-gradient-to-br from-white to-emerald-50">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Economize Tempo</h3>
              <p className="text-gray-600 leading-relaxed">
                Planeje suas refeições da semana em apenas 5 minutos. Nossa IA faz todo o trabalho pesado por você.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-2xl transition-all border-2 border-blue-100 hover:border-blue-300 bg-gradient-to-br from-white to-blue-50">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Economize Dinheiro</h3>
              <p className="text-gray-600 leading-relaxed">
                Reduza desperdícios em até 40% e economize até R$ 500/mês com planejamento inteligente de compras.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-2xl transition-all border-2 border-teal-100 hover:border-teal-300 bg-gradient-to-br from-white to-teal-50">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vida Mais Saudável</h3>
              <p className="text-gray-600 leading-relaxed">
                Refeições balanceadas e nutritivas todos os dias, adaptadas às suas preferências e restrições.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Como Funciona?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simples, rápido e inteligente - em apenas 3 passos
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start gap-6 bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-emerald-100">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Configure Seu Perfil</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Informe suas preferências alimentares, restrições e objetivos. Nossa IA aprende com você.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Receba Seu Cardápio Personalizado</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Em segundos, nossa IA cria um cardápio semanal completo, balanceado e delicioso especialmente para você.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-teal-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Compre e Cozinhe com Facilidade</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Lista de compras automática e receitas passo a passo. Tudo organizado para você não perder tempo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mais de 10.000 Famílias Já Transformaram Suas Vidas
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "Economizei mais de R$ 400 no primeiro mês! O MenuFácil mudou completamente minha rotina."
              </p>
              <p className="font-bold text-gray-900">Maria Silva</p>
              <p className="text-sm text-gray-600">São Paulo, SP</p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "Finalmente consigo planejar refeições saudáveis sem estresse. Recomendo demais!"
              </p>
              <p className="font-bold text-gray-900">João Santos</p>
              <p className="text-sm text-gray-600">Rio de Janeiro, RJ</p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-teal-50 to-white border-2 border-teal-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                "A IA é incrível! Sempre sugere receitas que minha família adora. Vale cada centavo!"
              </p>
              <p className="font-bold text-gray-900">Ana Costa</p>
              <p className="text-sm text-gray-600">Belo Horizonte, MG</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Comece Sua Transformação Hoje
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Investimento que se paga sozinho com a economia que você terá
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`p-8 bg-white text-gray-900 hover:shadow-2xl transition-all border-4 ${
                  plan.highlighted ? 'border-emerald-500 scale-105' : 'border-gray-200'
                }`}
              >
                {plan.badge && (
                  <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    {plan.badge}
                  </div>
                )}
                
                <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold">R$ {plan.price.toFixed(2)}</span>
                  <span className="text-gray-600 text-lg">/{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg py-6 rounded-xl shadow-xl hover:scale-105 transition-all font-bold"
                >
                  Assinar Agora <Zap className="ml-2 w-5 h-5" />
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Pagamento 100% seguro</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-white/90 text-lg">
              🎉 <strong>Oferta Especial:</strong> Primeiros 7 dias grátis para novos usuários!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6 border-2 border-gray-100 hover:border-emerald-200 transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Como funciona a garantia?</h3>
              <p className="text-gray-600 leading-relaxed">
                Oferecemos 7 dias de teste grátis. Se não ficar satisfeito, cancele a qualquer momento sem custos.
              </p>
            </Card>

            <Card className="p-6 border-2 border-gray-100 hover:border-emerald-200 transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Posso cancelar quando quiser?</h3>
              <p className="text-gray-600 leading-relaxed">
                Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais.
              </p>
            </Card>

            <Card className="p-6 border-2 border-gray-100 hover:border-emerald-200 transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">O MenuFácil funciona para dietas especiais?</h3>
              <p className="text-gray-600 leading-relaxed">
                Sim! Nossa IA se adapta a qualquer tipo de dieta: vegetariana, vegana, low carb, sem glúten, e muito mais.
              </p>
            </Card>

            <Card className="p-6 border-2 border-gray-100 hover:border-emerald-200 transition-all">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Como funciona o pagamento?</h3>
              <p className="text-gray-600 leading-relaxed">
                Aceitamos cartão de crédito, débito e PIX. O pagamento é processado de forma 100% segura.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto Para Transformar Sua Alimentação?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Junte-se a milhares de famílias que já economizam tempo e dinheiro com o MenuFácil
          </p>
          <Button 
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
            className="bg-white text-emerald-700 hover:bg-emerald-50 text-xl px-10 py-7 rounded-2xl shadow-2xl hover:scale-105 transition-all font-bold"
          >
            Começar Agora - 7 Dias Grátis <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-8 h-8" />
            <span className="text-2xl font-bold">MenuFácil</span>
          </div>
          <p className="text-gray-400 mb-4">
            Tecnologia que simplifica sua vida alimentar
          </p>
          <p className="text-sm text-gray-500">
            © 2024 MenuFácil. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
