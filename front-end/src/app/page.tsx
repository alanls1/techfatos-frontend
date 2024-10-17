import Section from "@/components/Section/Section";

export const metadata = {
  title: "Tech fatos",
  description: "Portal de notícias sobre tecnologias",
  metadataBase: new URL("https://techfatos.com"),
  charset: "utf-8",
};

export default function Home() {
  return (
    <main>
      <Section />
    </main>
  );
}
