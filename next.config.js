const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Isso permite imagens de qualquer hostname
        port: "", // Você pode deixar vazio, ou remover essa linha se não precisar de uma porta específica
      },
    ],
  },
};

module.exports = nextConfig;
