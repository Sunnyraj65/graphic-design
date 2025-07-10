import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Download, Award, Users, Clock, Palette } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const skills = [
    "Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Figma", 
    "Cinema 4D", "Blender", "Brand Identity", "UI/UX Design", "Digital Art", "Print Design"
  ];

  const stats = [
    { icon: Award, label: "Projects Completed", value: "200+" },
    { icon: Users, label: "Happy Clients", value: "150+" }, 
    { icon: Clock, label: "Years Experience", value: "5+" },
    { icon: Palette, label: "Design Awards", value: "10+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-4">
            About Me
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-creative bg-clip-text text-transparent">
              Sunny raj
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Creative Designer & Digital Artist
          </p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">My Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Hello! I'm Sunny raj, a passionate graphic designer and digital artist with over 5 years 
                    of experience creating stunning visual experiences. My journey began with a simple love 
                    for art and has evolved into a career dedicated to bringing creative visions to life.
                  </p>
                  <p>
                    I specialize in creating compelling visual narratives through various mediums - from 
                    digital art and brand identities to UI/UX design and advertising campaigns. Each project 
                    is an opportunity to push creative boundaries and deliver exceptional results.
                  </p>
                  <p>
                    My work has been featured in various design publications and has won several awards. 
                    I believe in the power of good design to not just look beautiful, but to solve problems 
                    and create meaningful connections between brands and their audiences.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Achievements</h3>
                <div className="space-y-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-creative rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Let's Work Together</h3>
                <p className="text-muted-foreground mb-6">
                  Ready to bring your creative vision to life? Let's discuss your project!
                </p>
                <div className="space-y-3">
                  <Button variant="creative" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-creative text-white text-center">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              Interested in my work?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Check out my complete portfolio gallery
            </p>
            <Link to="/gallery">
              <Button variant="secondary" size="lg">
                View Gallery
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}