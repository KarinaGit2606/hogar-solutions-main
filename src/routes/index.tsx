import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  Wrench, Zap, PaintBucket, Hammer, Droplets, Wind,
  Phone, MapPin, Clock, Shield, Star, CheckCircle2, MessageCircle, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import heroImg from "@/assets/hero-handyman.jpg";

const WHATSAPP_NUMBER = "5491100000000";
const PHONE = "+54 11 0000-0000";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soluciones del Hogar — Reparaciones Rápidas 24/7" },
      { name: "description", content: "Servicio técnico profesional a domicilio: plomería, electricidad, pintura y más. Atención el mismo día. Presupuestos sin cargo." },
      { property: "og:title", content: "Soluciones del Hogar — Reparaciones Rápidas" },
      { property: "og:description", content: "Reparaciones del hogar urgentes. Técnicos certificados, garantía escrita y atención el mismo día." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Droplets, name: "Plomería", desc: "Destapaciones, fugas, calefones, grifería y cañerías.", from: "$8.000" },
  { icon: Zap, name: "Electricidad", desc: "Tableros, cortocircuitos, instalaciones y luminarias.", from: "$10.000" },
  { icon: PaintBucket, name: "Pintura", desc: "Interiores, exteriores, empapelado y revestimientos.", from: "$15.000" },
  { icon: Hammer, name: "Albañilería", desc: "Reparaciones, humedad, revoques y pequeñas obras.", from: "$12.000" },
  { icon: Wrench, name: "Gas", desc: "Conexiones, pérdidas y mantenimiento por matriculado.", from: "$14.000" },
  { icon: Wind, name: "Climatización", desc: "Instalación, carga de gas y limpieza de splits.", from: "$18.000" },
];

const zones = [
  "Palermo", "Belgrano", "Recoleta", "Caballito", "Villa Crespo",
  "Núñez", "Almagro", "Flores", "Vicente López", "San Isidro",
  "Olivos", "Martínez", "Devoto", "Saavedra", "Colegiales", "Villa Urquiza",
];

const testimonials = [
  { name: "María González", zone: "Palermo", text: "Llamé a las 9 AM por una pérdida de agua y a las 11 ya estaba todo solucionado. Muy profesionales.", rating: 5 },
  { name: "Carlos Méndez", zone: "Belgrano", text: "Excelente trabajo eléctrico. Presupuesto justo, sin sorpresas, y dejaron todo impecable.", rating: 5 },
  { name: "Lucía Fernández", zone: "Caballito", text: "Pinté todo el departamento con ellos. Puntualidad, prolijidad y precio muy razonable.", rating: 5 },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresá tu nombre").max(80),
  phone: z.string().trim().min(6, "Ingresá un teléfono válido").max(20),
  service: z.string().trim().min(2, "Indicá el servicio").max(80),
  message: z.string().trim().min(5, "Contanos qué necesitás").max(800),
});

function Index() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });

  const waLink = (text: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Revisá los datos");
      return;
    }
    const { name, phone, service, message } = result.data;
    const text = `Hola, soy ${name} (tel: ${phone}). Necesito: ${service}. ${message}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
    toast.success("¡Te derivamos a WhatsApp!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Atención 24/7</span>
            <span className="hidden sm:flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Garantía escrita</span>
          </div>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="flex items-center gap-1.5 font-medium hover:underline">
            <Phone className="h-3.5 w-3.5" /> {PHONE}
          </a>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="h-9 w-9 rounded-lg bg-primary text-primary-foreground grid place-items-center">
              <Wrench className="h-5 w-5" />
            </span>
            Soluciones del Hogar
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
            <a href="#servicios" className="hover:text-foreground">Servicios</a>
            <a href="#zonas" className="hover:text-foreground">Zonas</a>
            <a href="#precios" className="hover:text-foreground">Precios</a>
            <a href="#testimonios" className="hover:text-foreground">Testimonios</a>
            <a href="#contacto" className="hover:text-foreground">Contacto</a>
          </nav>
          <Button asChild size="sm" className="bg-urgent hover:bg-urgent/90 text-urgent-foreground">
            <a href="#contacto"><Phone className="h-4 w-4 mr-1.5" /> Solicitar</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-accent text-accent-foreground border-0 mb-5">
              <span className="h-2 w-2 rounded-full bg-whatsapp mr-2 animate-pulse" />
              Disponibles ahora — Respuesta en 15 min
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
              Reparaciones del hogar,<br />
              <span className="text-primary">rápidas y confiables.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Técnicos certificados a domicilio el mismo día. Plomería, electricidad,
              pintura y más, con presupuesto cerrado y garantía por escrito.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground shadow-[var(--shadow-soft)]">
                <a href={waLink("Hola, necesito una reparación urgente")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" /> WhatsApp ahora
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#contacto">Pedir presupuesto <ArrowRight className="h-4 w-4 ml-2" /></a>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { n: "+12.000", l: "Trabajos" },
                { n: "4.9★", l: "Calificación" },
                { n: "24/7", l: "Atención" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-foreground">{s.n}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-primary-glow/10 rounded-3xl blur-2xl" />
            <img
              src={heroImg}
              alt="Técnico de Soluciones del Hogar reparando una canilla"
              width={1536}
              height={1024}
              className="relative rounded-2xl shadow-[var(--shadow-elegant)] w-full h-auto object-cover aspect-[4/3]"
            />
            <Card className="absolute -bottom-6 -left-4 md:-left-8 p-4 flex items-center gap-3 shadow-[var(--shadow-soft)] max-w-[260px]">
              <div className="h-10 w-10 rounded-full bg-whatsapp/15 text-whatsapp grid place-items-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">Presupuesto sin cargo</div>
                <div className="text-xs text-muted-foreground">Sin compromiso, en el día</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl mb-12">
            <Badge variant="outline" className="mb-3">Servicios</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Todo lo que tu hogar necesita, en un solo lugar.</h2>
            <p className="mt-3 text-muted-foreground">Equipos especializados para cada tipo de reparación. Cumplimos horarios y dejamos todo impecable.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Card key={s.name} className="p-6 hover:shadow-[var(--shadow-soft)] transition-shadow group">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-1.5">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-5 pt-4 border-t flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Desde</span>
                  <span className="font-display font-bold text-primary">{s.from}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Zonas */}
      <section id="zonas" className="py-20">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-3">Cobertura</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Llegamos a tu barrio.</h2>
            <p className="mt-3 text-muted-foreground max-w-md">
              Operamos en CABA y zona norte del GBA con tiempos de respuesta de menos de 60 minutos
              en la mayoría de los casos.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">¿Tu zona no está? Consultanos igual.</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {zones.map((z) => (
              <span key={z} className="px-4 py-2 rounded-full bg-secondary border text-sm font-medium text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-default">
                {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-20 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl mb-12">
            <Badge variant="outline" className="mb-3">Precios aproximados</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Transparencia desde el primer mensaje.</h2>
            <p className="mt-3 text-muted-foreground">Valores de referencia. El presupuesto final lo confirmamos sin cargo tras evaluar el trabajo.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Visita técnica", price: "$5.000", items: ["Diagnóstico profesional", "Presupuesto cerrado", "Sin compromiso"] },
              { title: "Reparación estándar", price: "$15.000", featured: true, items: ["Mano de obra incluida", "Garantía 30 días", "Materiales menores"] },
              { title: "Instalación completa", price: "$35.000", items: ["Trabajo a medida", "Garantía 90 días", "Coordinación de horarios"] },
            ].map((p) => (
              <Card key={p.title} className={`p-7 ${p.featured ? "border-primary border-2 shadow-[var(--shadow-elegant)] relative" : ""}`}>
                {p.featured && (
                  <Badge className="absolute -top-3 left-7 bg-urgent text-urgent-foreground">Más solicitado</Badge>
                )}
                <h3 className="font-display text-lg font-semibold text-muted-foreground">{p.title}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xs text-muted-foreground">desde</span>
                  <span className="font-display text-4xl font-bold text-foreground">{p.price}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {p.items.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-2xl mb-12">
            <Badge variant="outline" className="mb-3">Testimonios</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Lo que dicen nuestros clientes.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-7">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-urgent text-urgent" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed">"{t.text}"</p>
                <div className="mt-5 pt-4 border-t">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.zone}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Solicitá tu reparación hoy.</h2>
            <p className="mt-3 text-primary-foreground/85 max-w-md">
              Completá el formulario y un técnico te contacta en minutos. O escribinos directo por WhatsApp.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { i: Phone, t: "Llamanos", d: PHONE },
                { i: MessageCircle, t: "WhatsApp", d: "Respuesta inmediata" },
                { i: Clock, t: "Horario", d: "24 hs, todos los días" },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-lg bg-primary-foreground/15 grid place-items-center backdrop-blur">
                    <c.i className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-primary-foreground/70">{c.t}</div>
                    <div className="font-medium">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-8 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground">
              <a href={waLink("Hola, necesito una reparación")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" /> Abrir WhatsApp
              </a>
            </Button>
          </div>

          <Card className="p-7 text-foreground">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tu nombre" />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="11 0000-0000" />
              </div>
              <div>
                <Label htmlFor="service">Servicio</Label>
                <Input id="service" maxLength={80} value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="Ej: Plomería" />
              </div>
              <div>
                <Label htmlFor="message">Detalles</Label>
                <Textarea id="message" maxLength={800} rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Contanos qué necesitás..." />
              </div>
              <Button type="submit" size="lg" className="w-full bg-urgent hover:bg-urgent/90 text-urgent-foreground">
                Enviar y abrir WhatsApp
              </Button>
              <p className="text-xs text-muted-foreground text-center">Respuesta promedio en menos de 15 minutos</p>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-10">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 font-display font-bold">
            <Wrench className="h-5 w-5" /> Soluciones del Hogar
          </div>
          <div className="text-background/60">© {new Date().getFullYear()} — Todos los derechos reservados</div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={waLink("Hola, necesito una reparación")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-whatsapp text-whatsapp-foreground grid place-items-center shadow-[var(--shadow-elegant)] hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-30" />
      </a>
    </div>
  );
}
