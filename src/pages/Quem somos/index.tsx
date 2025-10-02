import Header from "../../components/Header";
import { Target, Users, Award, TrendingUp, Shield, Lightbulb, CheckCircle, Star } from "lucide-react";

export default function QuemSomos() {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Democratizar o acesso à gestão financeira inteligente, oferecendo ferramentas que transformam dados em decisões estratégicas."
    },
    {
      icon: Lightbulb,
      title: "Visão",
      description: "Ser a plataforma de referência em gestão financeira, reconhecida pela inovação e resultados excepcionais."
    },
    {
      icon: Shield,
      title: "Valores",
      description: "Transparência, inovação, confiança e compromisso com o sucesso sustentável de nossos clientes."
    }
  ];

  const features = [
    "Relatórios financeiros em tempo real",
    "Análise preditiva de tendências",
    "Integração com principais bancos",
    "Dashboard personalizável",
    "Suporte especializado 24/7",
    "Segurança de dados certificada"
  ];

  const stats = [
    { number: "10K+", label: "Clientes Ativos" },
    { number: "R$ 2B+", label: "Volume Gerenciado" },
    { number: "99.9%", label: "Uptime Garantido" },
    { number: "4.9/5", label: "Avaliação Média" }
  ];

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-white">
      
        <div className="bg-gradient-to-r from-[#15C64F] to-[#0EA83C] text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Quem Somos
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Transformando a gestão financeira através de tecnologia, 
              inovação e compromisso com o seu sucesso
            </p>
          </div>
        </div>

        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Nossa História
                </h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Fundada em 2020, a <strong className="text-green-600">MEU FLUXO</strong> nasceu da 
                    necessidade de simplificar a complexidade financeira que muitas empresas enfrentam. 
                    Nossa equipe de especialistas em tecnologia e finanças identificou uma lacuna no 
                    mercado: a falta de ferramentas intuitivas e acessíveis para gestão financeira eficiente.
                  </p>
                  <p>
                    Começamos como uma startup com uma visão clara: democratizar o acesso à gestão 
                    financeira de qualidade. Hoje, somos uma empresa consolidada que atende milhares 
                    de clientes, desde pequenos empreendedores até grandes corporações.
                  </p>
                  <p>
                    Nossa jornada é marcada pela inovação constante, sempre buscando novas formas de 
                    ajudar nossos clientes a tomar decisões mais inteligentes e alcançar seus objetivos 
                    financeiros.
                  </p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Nossos Pilares
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Os fundamentos que guiam nossa empresa e definem nossa identidade
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                O Que Fazemos
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Soluções inteligentes para transformar sua gestão financeira
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Tecnologia a Serviço da Gestão
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Desenvolvemos uma plataforma completa que combina análise de dados, 
                  inteligência artificial e design intuitivo para oferecer insights 
                  valiosos sobre suas finanças. Nossa tecnologia permite que você tenha 
                  controle total sobre seus recursos, com relatórios precisos e 
                  recomendações personalizadas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Análise Avançada</h4>
                      <p className="text-gray-600 text-sm">Insights baseados em dados reais</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Suporte Especializado</h4>
                      <p className="text-gray-600 text-sm">Equipe dedicada ao seu sucesso</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Resultados Comprovados</h4>
                      <p className="text-gray-600 text-sm">Milhares de clientes satisfeitos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                O Que Nossos Clientes Dizem
              </h2>
              <p className="text-xl text-gray-600">
                Depoimentos reais de quem confia na MEU FLUXO
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "A MEU FLUXO revolucionou nossa gestão financeira. Agora temos 
                  controle total e visibilidade completa dos nossos recursos."
                </p>
                <div className="font-semibold text-gray-800">Maria Silva</div>
                <div className="text-sm text-gray-500">CEO, TechStart</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Interface intuitiva e relatórios precisos. Nossa equipe se 
                  adaptou rapidamente e os resultados foram imediatos."
                </p>
                <div className="font-semibold text-gray-800">João Santos</div>
                <div className="text-sm text-gray-500">Diretor Financeiro, CorpX</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Suporte excepcional e plataforma robusta. Recomendo para 
                  qualquer empresa que busca excelência em gestão financeira."
                </p>
                <div className="font-semibold text-gray-800">Ana Costa</div>
                <div className="text-sm text-gray-500">CFO, Inovação Ltda</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-[#15C64F] to-[#0EA83C] text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para Transformar sua Gestão Financeira?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Junte-se a milhares de empresas que já confiam na MEU FLUXO
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/register"
                className="px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Começar Agora
              </a>
              <a
                href="/contato"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition-colors"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
