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
    title: 'Sintel',
    description: 'Uma jovem chamada Sintel procura por seu amigo, um bebê dragão chamado Scales. Uma jornada épica de amizade e perda produzida pela Blender Foundation.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sintel_poster.jpg/800px-Sintel_poster.jpg',
    videoUrl: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4', // Using a reliable blender link
    category: 'Ficção Científica',
    type: 'movie',
    rating: 8.2,
    year: 2010
  },
  {
    id: '2',
    title: 'Tears of Steel',
    description: 'Em um futuro distópico, um grupo de guerreiros e cientistas tenta salvar o mundo de robôs gigantes usando tecnologia antiga e memórias do passado.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Tears_of_Steel_poster.jpg/800px-Tears_of_Steel_poster.jpg',
    videoUrl: 'https://archive.org/download/TearsOfSteel/TearsOfSteel.mp4',
    category: 'Ação',
    type: 'movie',
    rating: 7.9,
    year: 2012
  },
  {
    id: '3',
    title: 'Big Buck Bunny',
    description: 'Um coelho gigante e gentil decide se vingar de três roedores que o importunaram e maltrataram os animais da floresta.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_Buck_Bunny_Thumbnail.jpg/800px-Big_Buck_Bunny_Thumbnail.jpg',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'Comédia',
    type: 'movie',
    rating: 8.5,
    year: 2008
  },
  {
    id: '4',
    title: 'Cosmos Laundromat',
    description: 'Em uma ilha deserta, uma ovelha suicida chamada Franck conhece um vendedor misterioso que lhe oferece o mundo em uma lavanderia cósmica.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cosmos_Laundromat_-_First_Cycle_poster.jpg/800px-Cosmos_Laundromat_-_First_Cycle_poster.jpg',
    videoUrl: 'https://archive.org/download/CosmosLaundromat/CosmosLaundromat.mp4',
    category: 'Ficção Científica',
    type: 'movie',
    rating: 8.8,
    year: 2015
  },
  {
    id: '5',
    title: 'Caminandes',
    description: 'As aventuras de Koro, uma lhama da Patagônia que tenta atravessar uma estrada deserta, enfrentando diversos obstáculos engraçados.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Caminandes_-_Gran_Dillama_poster.jpg/800px-Caminandes_-_Gran_Dillama_poster.jpg',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Comédia',
    type: 'series',
    rating: 8.4,
    year: 2013,
    episodes: [
      { id: 'e1', title: 'Llama Drama', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', duration: '2m' },
      { id: 'e2', title: 'Gran Dillama', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', duration: '3m' },
      { id: 'e3', title: 'Llamigos', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', duration: '3m' }
    ]
  },
  {
    id: '6',
    title: 'Elephants Dream',
    description: 'Dois personagens exploram um mundo estranho e mecânico em uma jornada surrealista sobre a natureza da realidade.',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_poster.jpg/800px-Elephants_Dream_poster.jpg',
    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'Ficção Científica',
    type: 'movie',
    rating: 7.5,
    year: 2006
  }
];

export const CATEGORIES = ['Todos', 'Ação', 'Drama', 'Ficção Científica', 'Suspense', 'Comédia'];
