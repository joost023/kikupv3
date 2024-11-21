export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "beweging-en-leren",
    title: "Waarom beweging zo belangrijk is tijdens het leren",
    excerpt: "Ontdek hoe fysieke activiteit je hersenen stimuleert en het leerproces verbetert.",
    content: `
      Beweging en leren gaan hand in hand. Uit recent onderzoek blijkt dat fysieke activiteit tijdens het leren niet alleen goed is voor je lichaam, maar ook je hersenen stimuleert. 

      Wanneer je beweegt, worden er verschillende hormonen aangemaakt die een positief effect hebben op je concentratievermogen en geheugen. Daarnaast zorgt beweging voor een betere doorbloeding van je hersenen, waardoor je informatie beter kunt verwerken.

      Bij KIKUP combineren we daarom bewust leerelementen met fysieke activiteit. Onze spellen zijn zo ontworpen dat je niet alleen mentaal, maar ook fysiek wordt uitgedaagd. Dit zorgt voor een optimale leerervaring en maakt het leren ook nog eens een stuk leuker!
    `,
    author: {
      name: "Dr. Lisa van den Berg",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
      role: "Onderwijspsycholoog"
    },
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&auto=format&fit=crop",
    tags: ["onderwijs", "beweging", "onderzoek"]
  },
  {
    id: "digitaal-spelen",
    title: "De voordelen van digitaal spelen voor de ontwikkeling",
    excerpt: "Hoe moderne technologie en gaming bijdragen aan de cognitieve ontwikkeling van kinderen.",
    content: `
      In het digitale tijdperk worden kinderen omringd door technologie. Maar is dat wel goed? Het antwoord is: ja, mits op de juiste manier ingezet.

      Digitale spellen kunnen een waardevolle bijdrage leveren aan de ontwikkeling van kinderen. Ze stimuleren probleemoplossend denken, strategisch inzicht en hand-oog coördinatie. Daarnaast kunnen educatieve games helpen bij het ontwikkelen van belangrijke vaardigheden zoals taal en rekenen.

      Het is wel belangrijk om een goede balans te vinden tussen schermtijd en andere activiteiten. KIKUP spellen zijn daarom zo ontwikkeld dat ze digitaal leren combineren met fysieke beweging, waardoor kinderen het beste van beide werelden krijgen.
    `,
    author: {
      name: "Mark de Jong",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&auto=format&fit=crop",
      role: "Game Developer"
    },
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?w=1200&auto=format&fit=crop",
    tags: ["technologie", "gaming", "ontwikkeling"]
  },
  {
    id: "concentratie-tips",
    title: "5 tips om de concentratie te verbeteren",
    excerpt: "Praktische tips om beter gefocust te blijven tijdens het leren en spelen.",
    content: `
      Concentratie is een vaardigheid die je kunt trainen. Met deze tips help je je hersenen om beter gefocust te blijven:

      1. Neem regelmatig korte pauzes
      2. Beweeg tussendoor
      3. Drink voldoende water
      4. Elimineer afleidingen
      5. Wissel verschillende activiteiten af

      Deze tips zijn verwerkt in de KIKUP spellen, waar we bewust korte, intensieve speelsessies afwisselen met bewegingsmomenten. Dit helpt bij het behouden van focus en maakt het leren effectiever.
    `,
    author: {
      name: "Emma Visser",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&auto=format&fit=crop",
      role: "Onderwijskundige"
    },
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop",
    tags: ["concentratie", "tips", "leren"]
  }
];