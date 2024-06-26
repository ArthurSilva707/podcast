interface Podcast {
    podcastName: string;
    episode: string;
    cover: string;
    link: string;
    categories: string[];
  }
  
  const podcasts: Podcast[] = [
    {
      podcastName: "Saúde em Pauta",
      episode: "Episódio 1",
      cover: "link-da-imagem",
      link: "link-do-episódio",
      categories: ["saúde"]
    },
    {
      podcastName: "Fitness Total",
      episode: "Episódio 2",
      cover: "link-da-imagem",
      link: "link-do-episódio",
      categories: ["fitness"]
    },
    // Adicione mais podcasts aqui
  ];
  
  export { Podcast, podcasts };
  