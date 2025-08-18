import { useState } from "react";
import { MessageCircle, CheckCircle, Users, BookOpen, ExternalLink, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  email?: string;
  displayName?: string;
}

interface CommunitySectionProps {
  user: User | null;
}

export default function CommunitySection({ user }: CommunitySectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleDiscordClick = () => {
    if (user) {
      toast({
        title: "Redirigiendo a Discord...",
        description: "Te llevamos a nuestro servidor de Discord",
      });
      setTimeout(() => {
        window.open('https://discord.gg/escuadron404', '_blank');
      }, 1000);
    } else {
      toast({
        title: "Inicia sesión requerido",
        description: "Debes iniciar sesión para unirte al Discord",
        variant: "destructive",
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Mensaje enviado",
      description: "Te contactaremos pronto",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <section className="bg-mesh min-h-screen pt-24" id="comunidad">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gradient bg-gradient-to-r from-white via-purple-200 to-blue-200 animate-gradient-x leading-tight">
              Escuadrón 404
            </h1>
          </div>
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Comunidad de desarrolladores apasionados por la tecnología, donde el error 404 se convierte en oportunidad de crecimiento
            </p>
          </div>
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <button 
              onClick={handleDiscordClick}
              className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 hover:from-purple-700 hover:via-purple-800 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-2xl text-lg transition-all duration-300 hover:scale-105 animate-glow shadow-2xl"
              data-testid="button-discord-hero"
            >
              <MessageCircle className="w-6 h-6 inline-block mr-3" />
              Únete al Discord
            </button>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">¿Qué hacemos?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Construimos el futuro del desarrollo con pasión, conocimiento y colaboración</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-8 text-center hover-lift group">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-soft group-hover:scale-110 transition-transform">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gradient-purple">Desarrollo Colaborativo</h3>
            <p className="text-gray-300 leading-relaxed">Trabajamos juntos en proyectos open source, compartimos conocimiento y construimos soluciones que impactan</p>
          </div>
          
          <div className="glass-card rounded-3xl p-8 text-center hover-lift group" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-soft group-hover:scale-110 transition-transform">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gradient-purple">Mentorías</h3>
            <p className="text-gray-300 leading-relaxed">Conectamos desarrolladores senior con junior para acelerar el aprendizaje y crear vínculos duraderos</p>
          </div>
          
          <div className="glass-card rounded-3xl p-8 text-center hover-lift group" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-soft group-hover:scale-110 transition-transform">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gradient-purple">Eventos Tech</h3>
            <p className="text-gray-300 leading-relaxed">Organizamos meetups, hackathons y charlas técnicas que inspiran y conectan a la comunidad tech</p>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">Proyectos Destacados</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Innovaciones que nacen de la colaboración y el talento de nuestra comunidad</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "DevTools Suite",
              description: "Conjunto de herramientas para desarrolladores que automatiza tareas comunes del día a día y mejora la productividad.",
              tags: ["JavaScript", "Node.js", "CLI"],
              colors: ["from-yellow-400 to-orange-500", "from-green-400 to-blue-500", "from-purple-400 to-pink-500"]
            },
            {
              title: "Learning Platform",
              description: "Plataforma educativa interactiva para compartir recursos, tutoriales y rutas de aprendizaje personalizadas.",
              tags: ["React", "Firebase", "PWA"],
              colors: ["from-blue-400 to-purple-500", "from-orange-400 to-red-500", "from-indigo-400 to-blue-500"]
            },
            {
              title: "API Gateway",
              description: "Gateway de APIs open source con funcionalidades avanzadas de rate limiting, autenticación y monitoreo.",
              tags: ["Go", "Docker", "Kubernetes"],
              colors: ["from-cyan-400 to-blue-500", "from-gray-600 to-gray-700", "from-green-400 to-green-500"]
            }
          ].map((project, index) => (
            <div key={index} className="glass-card rounded-3xl p-8 hover-lift group">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gradient-purple">{project.title}</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className={`bg-gradient-to-r ${project.colors[tagIndex]} text-white text-xs px-3 py-1 rounded-full font-medium`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold transition-colors group-hover:translate-x-2 transform duration-300">
                Ver proyecto 
                <ExternalLink className="w-4 h-4 ml-2" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="container mx-auto px-6 py-20">
        <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 text-purple-400 mx-auto opacity-50 flex items-center justify-center">
              <MessageCircle className="w-16 h-16" />
            </div>
          </div>
          <blockquote className="text-2xl md:text-3xl font-light text-gray-200 mb-8 leading-relaxed">
            "Escuadrón 404 transformó mi carrera como desarrollador. La comunidad es increíble, siempre hay alguien dispuesto a ayudar y los proyectos colaborativos me han permitido crecer exponencialmente."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center ring-4 ring-purple-500/30">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <p className="font-bold text-lg text-gradient-purple">María González</p>
              <p className="text-gray-400">Senior Full Stack Developer</p>
              <div className="flex items-center mt-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-yellow-400 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Discord */}
      <div className="container mx-auto px-6 py-20">
        <div className="glass-card rounded-3xl p-12 text-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">¿Listo para unirte?</h2>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Conecta con más de 1,000 desarrolladores de toda Latinoamérica y forma parte de nuestra comunidad
          </p>
          <button 
            onClick={handleDiscordClick}
            className="bg-gradient-to-r from-white to-gray-100 text-purple-900 font-bold py-4 px-10 rounded-2xl text-lg hover:from-gray-100 hover:to-white transition-all duration-300 hover:scale-105 shadow-2xl"
            data-testid="button-discord-cta"
          >
            <MessageCircle className="w-6 h-6 inline-block mr-3" />
            Únete al Discord
          </button>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-purple">Contáctanos</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">¿Tienes una pregunta o quieres colaborar? Nos encantaría saber de ti</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleFormSubmit} className="glass-card rounded-3xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-200">Nombre *</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400" 
                  placeholder="Tu nombre completo"
                  data-testid="input-name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-200">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400" 
                  placeholder="tu@email.com"
                  data-testid="input-email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold mb-2 text-gray-200">Asunto</label>
              <input 
                type="text" 
                id="subject" 
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400" 
                placeholder="¿De qué quieres hablar?"
                data-testid="input-subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-gray-200">Mensaje *</label>
              <textarea 
                id="message" 
                rows={5} 
                required 
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 resize-none" 
                placeholder="Cuéntanos más sobre tu proyecto o pregunta..."
                data-testid="textarea-message"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-submit-contact"
            >
              <span className="flex items-center justify-center">
                {isSubmitting ? (
                  <div className="spinner mx-auto" />
                ) : (
                  <>
                    Enviar Mensaje
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
