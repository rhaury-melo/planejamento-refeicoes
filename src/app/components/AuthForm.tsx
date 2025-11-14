"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChefHat, Mail, Lock, User, Sparkles, Zap } from 'lucide-react';
import { login, register } from '@/lib/auth';

interface AuthFormProps {
  onAuthSuccess: () => void;
}

export function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const user = login(email, password);
        if (!user) {
          setError('Email ou senha incorretos');
          setLoading(false);
          return;
        }
      } else {
        if (!name.trim()) {
          setError('Por favor, preencha seu nome');
          setLoading(false);
          return;
        }
        const user = register(email, password, name);
        if (!user) {
          setError('Este email já está cadastrado');
          setLoading(false);
          return;
        }
      }

      // Pequeno delay para animação
      setTimeout(() => {
        onAuthSuccess();
      }, 500);
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Efeitos de fundo animados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Card de autenticação */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
          {/* Logo e título */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl blur-lg animate-pulse"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <ChefHat className="w-9 h-9 text-white" />
                </div>
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                MenuFácil
              </h1>
              <p className="text-sm text-purple-200 flex items-center justify-center gap-1 mt-1">
                <Zap className="w-3 h-3 animate-pulse" />
                Powered by AI
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
              <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
              <span className="text-sm font-semibold text-purple-200">
                {isLogin ? 'Bem-vindo de volta!' : 'Comece sua jornada'}
              </span>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-purple-400"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 text-white font-bold py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processando...
                </div>
              ) : (
                isLogin ? 'Entrar' : 'Criar conta'
              )}
            </Button>
          </form>

          {/* Toggle entre login e registro */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-sm text-purple-200 hover:text-white transition-colors"
            >
              {isLogin ? (
                <>
                  Não tem uma conta?{' '}
                  <span className="font-bold underline">Cadastre-se</span>
                </>
              ) : (
                <>
                  Já tem uma conta?{' '}
                  <span className="font-bold underline">Faça login</span>
                </>
              )}
            </button>
          </div>

          {/* Informação sobre plano gratuito */}
          {!isLogin && (
            <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3 text-center">
              <p className="text-xs text-emerald-200">
                ✨ Ao criar sua conta, você ganha acesso ao <span className="font-bold">Plano Básico Gratuito</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
