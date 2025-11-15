"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChefHat, CreditCard, Lock, Check, ArrowLeft, Smartphone, Copy, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const [pixGenerated, setPixGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const planPrice = paymentMethod === 'pix' ? 12.90 : 29.90;
  const planDuration = paymentMethod === 'pix' ? '7 dias' : 'Mensal';
  const pixCode = "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540512.905802BR5913MenuFacil6009SAO PAULO62070503***6304ABCD";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatação automática para número do cartão
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    // Formatação automática para data de validade
    if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (paymentMethod === 'pix') {
      // Gera o código PIX
      setPixGenerated(true);
      setLoading(false);
      return;
    }

    // Simula processamento de pagamento com cartão
    setTimeout(() => {
      // Salva informações de assinatura no localStorage
      localStorage.setItem('menufacil-subscription', JSON.stringify({
        plan: 'mensal',
        status: 'active',
        startDate: new Date().toISOString(),
        email: formData.email,
      }));

      // Redireciona para o app
      router.push('/');
    }, 2000);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePixPaymentConfirm = () => {
    // Simula confirmação de pagamento PIX
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('menufacil-subscription', JSON.stringify({
        plan: 'trial-7dias',
        status: 'active',
        startDate: new Date().toISOString(),
        email: formData.email,
      }));
      router.push('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                MenuFácil
              </span>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push('/landing')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Finalize Sua Assinatura
            </h1>
            <p className="text-xl text-gray-600">
              Você está a um passo de transformar sua alimentação
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulário de Pagamento */}
            <div>
              <Card className="p-8 border-2 border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-gray-700">Pagamento 100% Seguro</span>
                </div>

                {/* Seleção de Método de Pagamento */}
                <div className="mb-6">
                  <Label className="text-gray-700 font-semibold mb-3 block">Escolha o método de pagamento</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('card');
                        setPixGenerated(false);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
                        paymentMethod === 'card' ? 'text-emerald-600' : 'text-gray-400'
                      }`} />
                      <div className="text-center">
                        <div className={`font-semibold ${
                          paymentMethod === 'card' ? 'text-emerald-700' : 'text-gray-600'
                        }`}>
                          Cartão
                        </div>
                        <div className="text-sm text-gray-500">R$ 29,90/mês</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('pix');
                        setPixGenerated(false);
                      }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'pix'
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Smartphone className={`w-8 h-8 mx-auto mb-2 ${
                        paymentMethod === 'pix' ? 'text-emerald-600' : 'text-gray-400'
                      }`} />
                      <div className="text-center">
                        <div className={`font-semibold ${
                          paymentMethod === 'pix' ? 'text-emerald-700' : 'text-gray-600'
                        }`}>
                          PIX
                        </div>
                        <div className="text-sm text-gray-500">R$ 12,90/7 dias</div>
                      </div>
                    </button>
                  </div>
                </div>

                {!pixGenerated ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-semibold">Nome Completo</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-2 border-gray-300 focus:border-emerald-500"
                        placeholder="João Silva"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-semibold">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-2 border-gray-300 focus:border-emerald-500"
                        placeholder="joao@email.com"
                      />
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          <CreditCard className="w-5 h-5 text-gray-600" />
                          <span className="font-semibold text-gray-700">Dados do Cartão</span>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardNumber" className="text-gray-700 font-semibold">Número do Cartão</Label>
                            <Input
                              id="cardNumber"
                              name="cardNumber"
                              type="text"
                              required
                              maxLength={19}
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="mt-2 border-gray-300 focus:border-emerald-500"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>

                          <div>
                            <Label htmlFor="cardName" className="text-gray-700 font-semibold">Nome no Cartão</Label>
                            <Input
                              id="cardName"
                              name="cardName"
                              type="text"
                              required
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className="mt-2 border-gray-300 focus:border-emerald-500"
                              placeholder="JOÃO SILVA"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate" className="text-gray-700 font-semibold">Validade</Label>
                              <Input
                                id="expiryDate"
                                name="expiryDate"
                                type="text"
                                required
                                maxLength={5}
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                className="mt-2 border-gray-300 focus:border-emerald-500"
                                placeholder="MM/AA"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv" className="text-gray-700 font-semibold">CVV</Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                type="text"
                                required
                                maxLength={4}
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="mt-2 border-gray-300 focus:border-emerald-500"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg py-6 rounded-xl shadow-xl hover:scale-105 transition-all font-bold"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processando...
                        </span>
                      ) : (
                        paymentMethod === 'pix' ? `Gerar PIX de R$ ${planPrice.toFixed(2)}` : `Pagar R$ ${planPrice.toFixed(2)}`
                      )}
                    </Button>
                  </form>
                ) : (
                  // Tela de PIX Gerado
                  <div className="space-y-6">
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <QrCode className="w-6 h-6 text-emerald-600" />
                        <h3 className="font-bold text-gray-900">PIX Gerado com Sucesso!</h3>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                          <QrCode className="w-32 h-32 text-gray-400" />
                        </div>
                        <p className="text-center text-sm text-gray-600 mb-2">
                          Escaneie o QR Code acima com o app do seu banco
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-gray-700 font-semibold">Ou copie o código PIX:</Label>
                        <div className="flex gap-2">
                          <Input
                            value={pixCode}
                            readOnly
                            className="font-mono text-xs bg-white"
                          />
                          <Button
                            type="button"
                            onClick={handleCopyPix}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Importante:</strong> Após realizar o pagamento, clique no botão abaixo para confirmar e acessar o app.
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handlePixPaymentConfirm}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg py-6 rounded-xl shadow-xl hover:scale-105 transition-all font-bold"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Confirmando...
                        </span>
                      ) : (
                        'Já Paguei - Acessar App'
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setPixGenerated(false)}
                      className="w-full text-gray-600"
                    >
                      Voltar
                    </Button>
                  </div>
                )}
              </Card>
            </div>

            {/* Resumo do Pedido */}
            <div>
              <Card className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b border-emerald-200">
                    <div>
                      <span className="text-gray-700 font-semibold block">
                        {paymentMethod === 'pix' ? 'Experiência de 7 Dias' : 'Plano Mensal'}
                      </span>
                      {paymentMethod === 'pix' && (
                        <span className="text-sm text-emerald-600 font-semibold">
                          🎉 Oferta Especial PIX
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">R$ {planPrice.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-3">O que está incluído:</h3>
                    {[
                      'Planejamento semanal ilimitado',
                      'Lista de compras inteligente',
                      'Sugestões personalizadas com IA',
                      'Controle de dispensa',
                      'Receitas exclusivas',
                      'Suporte prioritário',
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {paymentMethod === 'pix' && (
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="w-5 h-5" />
                      <span className="font-bold">Vantagem PIX</span>
                    </div>
                    <p className="text-sm">
                      Experimente por 7 dias com desconto especial de 57% OFF! Apenas R$ 12,90 via PIX.
                    </p>
                  </div>
                )}

                <div className="bg-white rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-700 mb-2">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">
                      {paymentMethod === 'pix' ? 'Satisfação garantida' : '7 dias de garantia'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {paymentMethod === 'pix' 
                      ? 'Teste por 7 dias sem compromisso. Cancele quando quiser.'
                      : 'Não gostou? Cancele nos primeiros 7 dias e receba 100% do seu dinheiro de volta.'
                    }
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Garantias */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center border-2 border-gray-100">
              <Lock className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Pagamento Seguro</h3>
              <p className="text-sm text-gray-600">Seus dados protegidos com criptografia SSL</p>
            </Card>

            <Card className="p-6 text-center border-2 border-gray-100">
              <Check className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Satisfação Garantida</h3>
              <p className="text-sm text-gray-600">Cancele quando quiser sem complicações</p>
            </Card>

            <Card className="p-6 text-center border-2 border-gray-100">
              <Smartphone className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">PIX Instantâneo</h3>
              <p className="text-sm text-gray-600">Pagamento aprovado em segundos</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
