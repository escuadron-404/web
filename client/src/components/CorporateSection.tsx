import { useState } from "react";
import { Users, Layers, CheckCircle, Star, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CorporateSection() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    contactEmail: '',
    phoneNumber: '',
    serviceType: '',
    projectDescription: '',
    budget: '',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.contactName || !formData.contactEmail || !formData.serviceType || !formData.projectDescription || !formData.terms) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos requeridos y acepta los términos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Solicitud enviada",
      description: "Nos pondremos en contacto contigo pronto",
    });
    
    setFormData({
      companyName: '',
      contactName: '',
      contactEmail: '',
      phoneNumber: '',
      serviceType: '',
      projectDescription: '',
      budget: '',
      terms: false
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <section className="bg-gray-900 min-h-screen pt-24" id="corporativo">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
            Soluciones <span className="text-gradient-purple">Corporativas</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Potencia tu equipo con talento especializado de nuestra comunidad de desarrolladores élite
          </p>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 hover:scale-105 animate-glow shadow-2xl">
            Solicitar Propuesta
          </button>
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">Nuestros Servicios</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Soluciones tecnológicas que escalan con tu negocio</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-10 text-center hover-lift">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Users className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-gradient-purple">Staff Augmentation</h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">Amplía tu equipo con desarrolladores especializados que se integran perfectamente a tu cultura organizacional y metodologías de trabajo.</p>
            <div className="space-y-4">
              {[
                "Desarrolladores Full Stack especializados",
                "Expertos en Frontend y Backend",
                "DevOps y Cloud Engineers certificados",
                "Mobile Developers multiplataforma",
                "QA Engineers y Test Automation"
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-start text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card rounded-3xl p-10 text-center hover-lift">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Layers className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-gradient-purple">Proyectos Colaborativos</h3>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">Desarrollamos soluciones completas trabajando como una extensión natural de tu equipo interno con metodologías ágiles.</p>
            <div className="space-y-4">
              {[
                "Desarrollo de aplicaciones web escalables",
                "APIs RESTful y arquitectura de microservicios",
                "Aplicaciones móviles nativas y PWA",
                "Migración a la nube (AWS, Azure, GCP)",
                "Modernización de sistemas legacy"
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-start text-gray-300">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">Proceso Simple y Efectivo</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">De la idea a la implementación en 4 pasos simples</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Consulta",
                description: "Conversamos sobre tus necesidades, objetivos y requisitos específicos del proyecto",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                number: "2",
                title: "Propuesta",
                description: "Diseñamos una solución personalizada con timeline, recursos y estimaciones detalladas",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                number: "3",
                title: "Selección",
                description: "Elegimos el talento perfecto de nuestra comunidad basado en skills y experiencia",
                gradient: "from-green-500 to-teal-500"
              },
              {
                number: "4",
                title: "Ejecución",
                description: "Comenzamos el desarrollo con sprints ágiles y comunicación constante",
                gradient: "from-orange-500 to-red-500"
              }
            ].map((step, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 text-center hover-lift">
                <div className={`bg-gradient-to-br ${step.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gradient-purple">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Talent */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">Talentos Destacados</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Conoce a algunos de los desarrolladores élite de nuestra comunidad</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Carlos Mendoza",
              role: "Senior Full Stack Developer",
              skills: ["React", "Node.js", "AWS", "TypeScript"],
              rating: "4.9",
              status: "Disponible",
              statusColor: "text-green-400",
              delay: "0s"
            },
            {
              name: "Ana Rodríguez",
              role: "Senior DevOps Engineer",
              skills: ["Docker", "Kubernetes", "Terraform", "CI/CD"],
              rating: "5.0",
              status: "Disponible",
              statusColor: "text-green-400",
              delay: "0.2s"
            },
            {
              name: "Luis García",
              role: "Lead Mobile Developer",
              skills: ["React Native", "Flutter", "Swift", "Kotlin"],
              rating: "4.8",
              status: "Ocupado hasta Feb",
              statusColor: "text-yellow-400",
              delay: "0.4s"
            }
          ].map((talent, index) => (
            <div key={index} className="glass-card rounded-3xl p-8 text-center hover-lift">
              <div className={`w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mx-auto mb-6 ring-4 ring-purple-500/30 animate-float flex items-center justify-center`} style={{ animationDelay: talent.delay }}>
                <Users className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gradient-purple">{talent.name}</h3>
              <p className="text-gray-400 mb-4 font-medium">{talent.role}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {talent.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {index === 0 && "8+ años desarrollando arquitecturas escalables y liderando equipos en proyectos enterprise"}
                {index === 1 && "Especialista en automatización cloud con experiencia en AWS, Azure y Google Cloud Platform"}
                {index === 2 && "Experto en desarrollo móvil multiplataforma con más de 50 apps publicadas en stores"}
              </p>
              <div className="flex justify-center space-x-3">
                <div className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{talent.rating}</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className={`text-sm font-medium ${talent.statusColor}`}>{talent.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Information Form */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">Solicitar Información</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">¿Listo para potenciar tu equipo? Contáctanos y recibe una propuesta personalizada</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleFormSubmit} className="glass-card rounded-3xl p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold mb-2 text-gray-200">Nombre de la Empresa</label>
                <input 
                  type="text" 
                  id="companyName" 
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400" 
                  placeholder="Tu empresa"
                  data-testid="input-company-name"
                />
              </div>
              <div>
                <label htmlFor="contactName" className="block text-sm font-semibold mb-2 text-gray-200">Nombre de Contacto *</label>
                <input 
                  type="text" 
                  id="contactName" 
                  required 
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400" 
                  placeholder="Tu nombre completo"
                  data-testid="input-contact-name"
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-semibold mb-2 text-gray-200">Email Corporativo *</label>
                <input 
                  type="email" 
                  id="contactEmail" 
                  required 
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400" 
                  placeholder="tu@empresa.com"
                  data-testid="input-contact-email"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold mb-2 text-gray-200">Teléfono</label>
                <input 
                  type="tel" 
                  id="phoneNumber" 
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400" 
                  placeholder="+1 (555) 123-4567"
                  data-testid="input-phone"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="serviceType" className="block text-sm font-semibold mb-2 text-gray-200">Tipo de Servicio *</label>
                <select 
                  id="serviceType" 
                  required 
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  data-testid="select-service-type"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="staff-augmentation">Staff Augmentation</option>
                  <option value="proyecto-colaborativo">Proyecto Colaborativo</option>
                  <option value="consultoria">Consultoría Técnica</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="projectDescription" className="block text-sm font-semibold mb-2 text-gray-200">Descripción del Proyecto *</label>
                <textarea 
                  id="projectDescription" 
                  rows={4} 
                  required 
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 resize-none" 
                  placeholder="Cuéntanos sobre tu proyecto, tecnologías, timeline estimado y cualquier requerimiento específico..."
                  data-testid="textarea-project-description"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="budget" className="block text-sm font-semibold mb-2 text-gray-200">Presupuesto Estimado</label>
                <select 
                  id="budget" 
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  data-testid="select-budget"
                >
                  <option value="">Selecciona un rango</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                  <option value="por-definir">Por definir</option>
                </select>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center mb-6">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 bg-transparent border-purple-500 rounded focus:ring-purple-500"
                  data-testid="checkbox-terms"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-300">
                  Acepto los <button type="button" className="text-purple-400 hover:text-purple-300">términos y condiciones</button> y autorizo el procesamiento de mis datos
                </label>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-submit-corporate"
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <div className="spinner mx-auto" />
                  ) : (
                    <>
                      Enviar Solicitud
                      <Mail className="w-5 h-5 ml-2" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
