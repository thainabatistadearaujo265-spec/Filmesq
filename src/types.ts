import { Play, Info, Search, Bell, User, ChevronRight, ChevronLeft, Plus, X } from 'lucide-react';

export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  type: 'movie' | 'series';
  rating: number;
  year: number;
  episodes?: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
}

export const MOVIES_DATA: Movie[] = [
  {
    id: '1',
    title: 'O Cavaleiro das Trevas',
    description: 'Quando a ameaça conhecida como o Coringa emerge de seu passado misterioso, ele causa estragos e caos nas pessoas de Gotham.',
    thumbnail: 'https://picsum.photos/seed/batman/800/450',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Ação',
    type: 'movie',
    rating: 9.0,
    year: 2008
  },
  {
    id: '2',
    title: 'Interestelar',
    description: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
    thumbnail: 'https://picsum.photos/seed/interstellar/800/450',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Ficção Científica',
    type: 'movie',
    rating: 8.6,
    year: 2014
  },
  {
    id: '3',
    title: 'Stranger Things',
    description: 'Quando um menino desaparece, sua mãe, um chefe de polícia e seus amigos devem enfrentar forças aterrorizantes para trazê-lo de volta.',
    thumbnail: 'https://picsum.photos/seed/stranger/800/450',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Suspense',
    type: 'series',
    rating: 8.7,
    year: 2016,
    episodes: [
      { id: 'e1', title: 'Capítulo Um: O Desaparecimento de Will Byers', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '48m' },
      { id: 'e2', title: 'Capítulo Dois: A Estranha da Maple Street', videoUrl: 'https://www.w3schools.com/html/movie.mp4', duration: '55m' },
      { id: 'e3', title: 'Capítulo Três: Caras de Natal', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '51m' }
    ]
  },
  {
    id: '4',
    title: 'A Origem',
    description: 'Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um C.E.O.',
    thumbnail: 'https://picsum.photos/seed/inception/800/450',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Ação',
    type: 'movie',
    rating: 8.8,
    year: 2010
  },
  {
    id: '5',
    title: 'The Last of Us',
    description: 'Após uma pandemia global destruir a civilização, um sobrevivente endurecido assume o comando de uma menina de 14 anos que pode ser a última esperança da humanidade.',
    thumbnail: 'https://picsum.photos/seed/tlou/800/450',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Drama',
    type: 'series',
    rating: 8.8,
    year: 2023,
    episodes: [
      { id: 'e4', title: 'Quando Estiver Perdido na Escuridão', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '81m' },
      { id: 'e5', title: 'Infectados', videoUrl: 'https://www.w3schools.com/html/movie.mp4', duration: '52m' }
    ]
  },
  {
    id: '6',
    title: 'Duna: Parte Dois',
    description: 'Paul Atreides se une a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.',
    thumbnail: 'https://picsum.photos/seed/dune/800/450',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Ficção Científica',
    type: 'movie',
    rating: 8.9,
    year: 2024
  },
  {
    id: '7',
    title: 'The Boys',
    description: 'Um grupo de vigilantes se propõe a derrubar super-heróis corruptos que abusam de seus superpoderes.',
    thumbnail: 'https://picsum.photos/seed/boys/800/450',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    category: 'Ação',
    type: 'series',
    rating: 8.7,
    year: 2019,
    episodes: [
      { id: 'e6', title: 'O Nome do Jogo', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '60m' },
      { id: 'e7', title: 'Cereja', videoUrl: 'https://www.w3schools.com/html/movie.mp4', duration: '60m' }
    ]
  },
  {
    id: '8',
    title: 'Parasita',
    description: 'A ganância e a discriminação de classe ameaçam a relação recém-formada entre a rica família Park e o clã Kim.',
    thumbnail: 'https://picsum.photos/seed/parasite/800/450',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    category: 'Drama',
    type: 'movie',
    rating: 8.5,
    year: 2019
  }
];

export const CATEGORIES = ['Todos', 'Ação', 'Drama', 'Ficção Científica', 'Suspense', 'Comédia'];
