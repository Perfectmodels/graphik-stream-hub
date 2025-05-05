import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  message: z.string().min(10, {
    message: "Le message doit comporter au moins 10 caractères.",
  }),
});

const Contact = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé!",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      form.reset();
    }, 1000);
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero
          title="Contactez-nous"
          subtitle="Nous sommes là pour vous aider"
          description="N'hésitez pas à nous contacter pour toute question ou demande d'information"
          backgroundImage="https://images.unsplash.com/photo-1550831103-7490aade57f1?auto=format&fit=crop&q=80&w=1600"
        />

        <section className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="md:order-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="exemple@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Votre message"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Envoyer <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div className="md:order-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              Nos coordonnées
            </h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <MapPin className="mr-2 h-5 w-5 text-graphik-blue" />
                <span>
                  Graphik'Studio, Libreville, Gabon
                </span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="mr-2 h-5 w-5 text-graphik-blue" />
                <span>+241 62 70 89 98</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="mr-2 h-5 w-5 text-graphik-blue" />
                <span>contact@graphikstudio.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="mr-2 h-5 w-5 text-graphik-blue" />
                <span>Lun - Ven: 9h00 - 18h00</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MessageCircle className="mr-2 h-5 w-5 text-graphik-blue" />
                <span>
                  <a href="https://wa.me/24162708998" target="_blank" rel="noopener noreferrer" className="underline">
                    Contactez-nous sur WhatsApp
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
