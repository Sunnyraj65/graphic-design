import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Palette, Camera, Sparkles, Star, Award, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-subtle overflow-hidden">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 text-center">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary-glow/15 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-60 right-40 w-8 h-8 bg-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto space-y-8 animate-fade-in">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            ✨ Creative Portfolio
          </Badge>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tight">
              <span className="bg-gradient-creative bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Creative
              </span>
              <br />
              <span className="text-foreground animate-fade-in" style={{ animationDelay: '0.6s' }}>
                designs
              </span>
              <br />
              <span className="text-2xl md:text-4xl font-normal text-muted-foreground animate-fade-in" style={{ animationDelay: '0.8s' }}>
                works
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '1s' }}>
            Explore a stunning collection of graphic design works showcasing creativity, 
            innovation, and artistic excellence. From concept to creation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link to="/gallery">
              <Button variant="creative" size="lg" className="group text-lg px-8 py-4 animate-scale-in hover-scale" style={{ animationDelay: '1.2s' }}>
                <Star className="w-5 h-5 mr-2" />
                View Gallery
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 animate-scale-in hover-scale" style={{ animationDelay: '1.4s' }}>
                <Heart className="w-5 h-5 mr-2" />
                About Me
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '1.6s' }}>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-creative bg-clip-text text-transparent">200+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-creative bg-clip-text text-transparent">150+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-creative bg-clip-text text-transparent">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-creative bg-clip-text text-transparent">10+</div>
              <div className="text-sm text-muted-foreground">Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            What I Do <span className="bg-gradient-creative bg-clip-text text-transparent">Best</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Specialized in creating stunning visual experiences across multiple design disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group hover:shadow-glow transition-all duration-500 hover:-translate-y-4 border-0 bg-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8 text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-creative opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-creative rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-elegant">
                  <Palette className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mt-4 group-hover:text-primary transition-colors">Graphic Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Professional graphic design solutions with creative flair and modern aesthetics that captivate audiences.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-glow transition-all duration-500 hover:-translate-y-4 border-0 bg-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-8 text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-creative opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-creative rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-elegant">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mt-4 group-hover:text-primary transition-colors">Digital Art</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stunning digital artworks and illustrations that bring imagination to life with vivid colors and details.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-glow transition-all duration-500 hover:-translate-y-4 border-0 bg-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-8 text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-creative opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-20 h-20 mx-auto bg-gradient-creative rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-elegant">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mt-4 group-hover:text-primary transition-colors">Creative Concepts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Innovative design concepts that push boundaries and inspire creativity through unique visual storytelling.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonial/Achievement Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Turning <span className="bg-gradient-creative bg-clip-text text-transparent">Ideas</span><br />
              Into Visual <span className="bg-gradient-creative bg-clip-text text-transparent">Reality</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Every project is a journey of creativity, where ideas transform into stunning visual experiences 
              that connect with audiences and leave lasting impressions.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                <span className="font-semibold">Award Winner</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-semibold">Fast Delivery</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Card className="p-6 bg-gradient-creative text-white transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-white/90">Client Satisfaction</div>
            </Card>
            <Card className="p-6 bg-accent text-white transform -rotate-2 hover:rotate-0 transition-transform duration-300 mt-8">
              <div className="text-3xl font-bold mb-2">24h</div>
              <div className="text-white/90">Quick Response</div>
            </Card>
            <Card className="p-6 bg-primary text-white transform rotate-1 hover:rotate-0 transition-transform duration-300 -mt-4">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-white/90">Design Tools</div>
            </Card>
            <Card className="p-6 bg-gradient-creative text-white transform -rotate-1 hover:rotate-0 transition-transform duration-300 mt-4">
              <div className="text-3xl font-bold mb-2">∞</div>
              <div className="text-white/90">Creativity</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="relative bg-gradient-creative text-white overflow-hidden border-0 shadow-glow animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-2"></div>
          <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          
          <CardContent className="p-16 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to explore my work?
            </h2>
            <p className="text-2xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Browse through my complete portfolio of creative designs and discover the magic of visual storytelling
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/gallery">
                <Button variant="secondary" size="lg" className="text-lg px-10 py-4 hover-scale">
                  <Sparkles className="w-5 h-5 mr-2" />
                  View Full Gallery
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary text-lg px-10 py-4 hover-scale">
                  Admin Panel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}