
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: "1",
      title: "Les meilleures séries à ne pas manquer sur Netflix en 2025",
      excerpt: "Découvrez notre sélection des séries qui font sensation cette année sur la plateforme de streaming numéro 1",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600",
      category: "Streaming Vidéo",
      author: "Sophie Martin",
      date: "2 mai 2025",
      readTime: "5 min",
    },
    {
      id: "2",
      title: "Comment optimiser votre expérience IPTV pour éviter les bufferings",
      excerpt: "Astuces et conseils pratiques pour profiter pleinement de votre abonnement IPTV sans interruptions ni ralentissements",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600",
      category: "IPTV",
      author: "Maxime Leroy",
      date: "28 avril 2025",
      readTime: "7 min",
    },
    {
      id: "3",
      title: "Comparatif : Spotify vs Apple Music vs Deezer en 2025",
      excerpt: "Quelle plateforme de streaming audio vous correspond le mieux ? Analyse détaillée des fonctionnalités, catalogues et tarifs",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80&w=600",
      category: "Streaming Audio",
      author: "Thomas Durand",
      date: "15 avril 2025",
      readTime: "9 min",
    },
    {
      id: "4",
      title: "Guide complet des abonnements gaming : lequel choisir ?",
      excerpt: "Xbox Game Pass, PlayStation Plus, Nintendo Switch Online... Découvrez quel service offre le meilleur rapport qualité-prix",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
      category: "Gaming",
      author: "Léa Dubois",
      date: "10 avril 2025",
      readTime: "8 min",
    },
    {
      id: "5",
      title: "Les 10 films à voir absolument sur Disney+ ce mois-ci",
      excerpt: "Notre sélection des meilleurs films disponibles actuellement sur la plateforme aux grandes oreilles",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
      category: "Streaming Vidéo",
      author: "Sophie Martin",
      date: "5 avril 2025",
      readTime: "6 min",
    },
    {
      id: "6",
      title: "Comment protéger vos données personnelles sur les plateformes de streaming",
      excerpt: "Guide de sécurité et bonnes pratiques pour préserver votre vie privée tout en profitant de vos contenus préférés",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      category: "Sécurité",
      author: "Maxime Leroy",
      date: "1 avril 2025",
      readTime: "10 min",
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Blog & Actualités"
          subtitle="Conseils et tendances"
          description="Découvrez nos derniers articles sur le streaming, l'IPTV et le gaming"
          backgroundImage="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=1600"
        />

        <section className="container mx-auto px-4 py-20">
          <SectionHeader
            title="Articles Récents"
            description="Restez informé des dernières tendances et actualités"
          />

          {/* Featured Post */}
          <div className="mb-16">
            <Card className="bg-graphik-grey border-none overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto relative">
                  <img
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800"
                    alt="Featured post"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-graphik-blue/20 text-graphik-blue">
                    Tendances
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    L'avenir du streaming : ce qui nous attend en 2026
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Des résolutions encore plus élevées, réalité virtuelle, intelligence artificielle... 
                    Découvrez comment les technologies émergentes vont transformer notre façon de consommer les médias.
                  </p>
                  <div className="flex flex-wrap gap-4 items-center text-sm text-gray-400 mb-6">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>Thomas Durand</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>3 mai 2025</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>12 min de lecture</span>
                    </div>
                  </div>
                  <Link to="/blog/avenir-streaming-2026" className="inline-flex items-center text-graphik-blue hover:text-graphik-lightblue transition-colors">
                    Lire l'article <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-graphik-grey border-graphik-light-grey overflow-hidden flex flex-col h-full">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-graphik-blue/20 text-graphik-blue">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-4 items-center text-xs text-gray-400 mb-4">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{post.readTime} de lecture</span>
                    </div>
                  </div>
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center text-graphik-blue hover:text-graphik-lightblue transition-colors text-sm">
                    Lire l'article <ArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-6 py-3 bg-graphik-grey border border-graphik-light-grey text-white rounded-md hover:bg-graphik-light-grey/20 transition-colors">
              Charger plus d'articles
            </button>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-graphik-grey py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Catégories"
              description="Explorez nos articles par thème"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="/blog/category/streaming-video" className="relative group overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-graphik-blue/20 group-hover:bg-graphik-blue/40 transition-colors z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600"
                  alt="Streaming Vidéo"
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-xl font-bold text-white">Streaming Vidéo</h3>
                </div>
              </Link>

              <Link to="/blog/category/streaming-audio" className="relative group overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-graphik-blue/20 group-hover:bg-graphik-blue/40 transition-colors z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&q=80&w=600"
                  alt="Streaming Audio"
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-xl font-bold text-white">Streaming Audio</h3>
                </div>
              </Link>

              <Link to="/blog/category/iptv" className="relative group overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-graphik-blue/20 group-hover:bg-graphik-blue/40 transition-colors z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600"
                  alt="IPTV"
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-xl font-bold text-white">IPTV</h3>
                </div>
              </Link>

              <Link to="/blog/category/gaming" className="relative group overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-graphik-blue/20 group-hover:bg-graphik-blue/40 transition-colors z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600"
                  alt="Gaming"
                  className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-xl font-bold text-white">Gaming</h3>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-graphik-blue/20 to-graphik-purple/20 rounded-xl p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                S'abonner à Notre Newsletter
              </h2>
              <p className="text-gray-300 mb-8">
                Recevez nos derniers articles, conseils et offres exclusives directement dans votre boîte de réception
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-grow px-4 py-2 rounded-md bg-graphik-grey border border-graphik-light-grey text-white focus:outline-none focus:ring-2 focus:ring-graphik-blue"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-graphik-blue text-white rounded-md hover:bg-graphik-blue/80 transition-colors"
                >
                  S'abonner
                </button>
              </form>
              <p className="text-gray-400 text-sm mt-4">
                Nous respectons votre vie privée. Désabonnez-vous à tout moment.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
