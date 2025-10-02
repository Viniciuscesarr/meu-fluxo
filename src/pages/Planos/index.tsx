import { useState } from "react";
import Header from "../../components/Header";
import { Check, Star, Zap, Crown, Users, BarChart3, Shield, Clock, ArrowRight } from "lucide-react";

export default function Planos() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Básico",
      icon: Users,
      price: { monthly: 29, annual: 290 },
      description: "Perfeito para pequenos negócios e freelancers",
      color: "blue",
      features: [
        "Até 5 usuários",
        "Relatórios básicos",
        "2 carteiras",
        "10 categorias",
        "Suporte por email",
        "Backup automático",
        "Integração com 1 banco",
        "Dashboard simples"
      ],
      limitations: [
        "Sem análise preditiva",
        "Relatórios limitados"
      ],
      popular: false
    },
    {
      name: "Profissional",
      icon: BarChart3,
      price: { monthly: 79, annual: 790 },
      description: "Ideal para empresas em crescimento",
      color: "green",
      features: [
        "Até 25 usuários",
        "Relatórios avançados",
        "Carteiras ilimitadas",
        "Categorias ilimitadas",
        "Suporte prioritário",
        "Backup em tempo real",
        "Integração com 5 bancos",
        "Dashboard personalizável",
        "Análise preditiva básica",
        "Exportação de dados",
        "API básica",
        "Treinamento online"
      ],
      limitations: [],
      popular: true
    },
    {
      name: "Enterprise",
      icon: Crown,
      price: { monthly: 199, annual: 1990 },
      description: "Solução completa para grandes empresas",
      color: "purple",
      features: [
        "Usuários ilimitados",
        "Relatórios customizados",
        "Carteiras ilimitadas",
        "Categorias ilimitadas",
        "Suporte 24/7",
        "Backup em múltiplas regiões",
        "Integração com todos os bancos",
        "Dashboard totalmente customizável",
        "IA avançada e machine learning",
        "Exportação avançada",
        "API completa",
        "Treinamento presencial",
        "Gerente de conta dedicado",
        "SLA garantido",
        "Auditoria completa",
        "Integração com ERPs"
      ],
      limitations: [],
      popular: false
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500",
        hover: "hover:bg-blue-600",
        text: "text-blue-600",
        border: "border-blue-500",
        light: "bg-blue-50",
        ring: "ring-blue-500"
      },
      green: {
        bg: "bg-green-500",
        hover: "hover:bg-green-600",
        text: "text-green-600",
        border: "border-green-500",
        light: "bg-green-50",
        ring: "ring-green-500"
      },
      purple: {
        bg: "bg-purple-500",
        hover: "hover:bg-purple-600",
        text: "text-purple-600",
        border: "border-purple-500",
        light: "bg-purple-50",
        ring: "ring-purple-500"
      }
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#15C64F] to-[#0EA83C] text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Escolha seu Plano
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto mb-8">
              Planos flexíveis para empresas de todos os tamanhos. 
              Comece grátis e escale conforme cresce.
            </p>
            
            {/* Toggle Anual/Mensal */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-lg ${!isAnnual ? 'text-white font-semibold' : 'text-green-200'}`}>
                Mensal
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-white' : 'bg-green-200'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-green-500 transition-transform ${
                    isAnnual ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${isAnnual ? 'text-white font-semibold' : 'text-green-200'}`}>
                Anual
              </span>
              {isAnnual && (
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  -17% de desconto
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Planos */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const colors = getColorClasses(plan.color);
              const price = isAnnual ? plan.price.annual : plan.price.monthly;
              const monthlyPrice = isAnnual ? Math.round(plan.price.annual / 12) : plan.price.monthly;
              
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    plan.popular ? 'ring-2 ring-green-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Mais Popular
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header do Plano */}
                    <div className="text-center mb-8">
                      <div className={`w-16 h-16 ${colors.light} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <plan.icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {plan.description}
                      </p>
                      
                      {/* Preço */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl font-bold text-gray-800">
                            R$ {price}
                          </span>
                          <span className="text-gray-600 ml-2">
                            /{isAnnual ? 'ano' : 'mês'}
                          </span>
                        </div>
                        {isAnnual && (
                          <div className="text-sm text-gray-500 mt-1">
                            R$ {monthlyPrice}/mês cobrado anualmente
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Limitações */}
                    {plan.limitations.length > 0 && (
                      <div className="mb-8">
                        <div className="text-sm text-gray-500 mb-2">Limitações:</div>
                        <div className="space-y-2">
                          {plan.limitations.map((limitation, limitIndex) => (
                            <div key={limitIndex} className="flex items-start gap-3">
                              <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              </div>
                              <span className="text-gray-500 text-sm">{limitation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Botão CTA */}
                    <button
                      className={`w-full py-4 px-6 ${colors.bg} ${colors.hover} text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        plan.popular ? 'ring-2 ring-green-500 ring-offset-2' : ''
                      }`}
                    >
                      {plan.name === 'Enterprise' ? 'Falar com Vendas' : 'Começar Agora'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparação de Recursos */}
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Compare os Recursos
              </h2>
              <p className="text-xl text-gray-600">
                Veja todos os recursos incluídos em cada plano
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-800">Recursos</th>
                    <th className="text-center py-4 px-6 font-semibold text-blue-600">Básico</th>
                    <th className="text-center py-4 px-6 font-semibold text-green-600">Profissional</th>
                    <th className="text-center py-4 px-6 font-semibold text-purple-600">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Usuários", basic: "5", pro: "25", enterprise: "Ilimitados" },
                    { feature: "Carteiras", basic: "2", pro: "Ilimitadas", enterprise: "Ilimitadas" },
                    { feature: "Categorias", basic: "10", pro: "Ilimitadas", enterprise: "Ilimitadas" },
                    { feature: "Relatórios", basic: "Básicos", pro: "Avançados", enterprise: "Customizados" },
                    { feature: "Integração Bancária", basic: "1 banco", pro: "5 bancos", enterprise: "Todos" },
                    { feature: "Suporte", basic: "Email", pro: "Prioritário", enterprise: "24/7" },
                    { feature: "API", basic: "Não", pro: "Básica", enterprise: "Completa" },
                    { feature: "Análise Preditiva", basic: "Não", pro: "Básica", enterprise: "IA Avançada" }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-800">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-gray-600">{row.basic}</td>
                      <td className="py-4 px-6 text-center text-gray-600">{row.pro}</td>
                      <td className="py-4 px-6 text-center text-gray-600">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Perguntas Frequentes
              </h2>
              <p className="text-xl text-gray-600">
                Tire suas dúvidas sobre nossos planos
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  question: "Posso mudar de plano a qualquer momento?",
                  answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações são aplicadas imediatamente e os valores são calculados proporcionalmente."
                },
                {
                  question: "Há período de teste gratuito?",
                  answer: "Oferecemos 14 dias de teste gratuito para todos os planos. Não é necessário cartão de crédito para começar."
                },
                {
                  question: "Meus dados estão seguros?",
                  answer: "Sim! Utilizamos criptografia de ponta a ponta e seguimos os mais altos padrões de segurança. Seus dados são armazenados em servidores certificados e nunca são compartilhados com terceiros."
                },
                {
                  question: "Posso cancelar a qualquer momento?",
                  answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas ou multas. Seu acesso permanece ativo até o final do período de cobrança."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-[#15C64F] to-[#0EA83C] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para Começar?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Junte-se a milhares de empresas que já confiam na MEU FLUXO
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Começar Teste Grátis
              </a>
              <a
                href="/contato"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Falar com Especialista
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
