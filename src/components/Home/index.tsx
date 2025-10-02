import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BarChart3, 
  Shield, 
  Zap, 
  Users, 
  TrendingUp,
  Star,
  Play,
  ChevronDown
} from "lucide-react";
import Image from "../../images/Coins-bro.png";

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: BarChart3,
      title: "Relatórios Inteligentes",
      description: "Dashboards personalizáveis com insights em tempo real"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Criptografia de ponta a ponta e backup automático"
    },
    {
      icon: Zap,
      title: "Integração Fácil",
      description: "Conecte com seus bancos em poucos cliques"
    },
    {
      icon: TrendingUp,
      title: "Análise Preditiva",
      description: "IA que prevê tendências e otimiza seus investimentos"
    }
  ];

  const stats = [
    { number: "10K+", label: "Clientes Ativos" },
    { number: "R$ 2B+", label: "Volume Gerenciado" },
    { number: "99.9%", label: "Uptime Garantido" },
    { number: "4.9/5", label: "Avaliação Média" }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "CEO, TechStart",
      content: "A MEU FLUXO revolucionou nossa gestão financeira. Agora temos controle total e visibilidade completa dos nossos recursos.",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Diretor Financeiro, CorpX",
      content: "Interface intuitiva e relatórios precisos. Nossa equipe se adaptou rapidamente e os resultados foram imediatos.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "CFO, Inovação Ltda",
      content: "Suporte excepcional e plataforma robusta. Recomendo para qualquer empresa que busca excelência em gestão financeira.",
      rating: 5
    }
  ];

  return (
    <>
    
      <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight">
                  A <span className="text-[#15C64F]">Liberdade Financeira</span> começa com um bom controle
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                  Transforme sua gestão financeira com nossa plataforma inteligente. 
                  Relatórios em tempo real, análise preditiva e controle total dos seus recursos.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-[#15C64F] hover:bg-[#0EA83C] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Começar Grátis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="group px-8 py-4 border-2 border-[#15C64F] text-[#15C64F] hover:bg-[#15C64F] hover:text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Ver Demo
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#15C64F] mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#15C64F] to-[#0EA83C] rounded-3xl transform rotate-3 scale-105 opacity-10"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <img 
                  src={Image} 
                  alt="Gestão Financeira" 
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Por que escolher a MEU FLUXO?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnologia avançada, interface intuitiva e resultados comprovados para sua empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#15C64F] group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-[#15C64F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Em 3 passos simples, você terá controle total das suas finanças
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#15C64F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Conecte suas Contas
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Integre seus bancos e cartões de crédito de forma segura e automática
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#15C64F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Organize e Categorize
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nossa IA categoriza automaticamente suas transações e gera insights
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#15C64F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Analise e Decida
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Visualize relatórios detalhados e tome decisões baseadas em dados reais
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Milhares de empresas já transformaram sua gestão financeira conosco
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#15C64F] to-[#0EA83C] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para transformar sua gestão financeira?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de empresas que já confiam na MEU FLUXO para 
            tomar decisões financeiras mais inteligentes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group px-8 py-4 bg-white text-[#15C64F] font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Começar Teste Grátis
            </Link>
            <Link
              to="/contato"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#15C64F] transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Falar com Especialista
            </Link>
          </div>
        </div>
      </section>

      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300"
            >
              ✕
            </button>
            <div className="bg-white rounded-lg p-4">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Demo em breve</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
