import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "",
  description: "",
  metadataBase: new URL("https://techfatos.com/"),
};

const MetaHead = ({
  title,
  content,
  path,
  id,
}: {
  title: string;
  content: string;
  path: string;
  id: number;
}) => {
  console.log(title);

  metadata["title"] = title;
  metadata["description"] = content.substring(0, 160) || title;
  metadata["metadataBase"] = new URL(
    `https://techfatos.com/${path}/${title
      .toLowerCase()
      .replace(/[#?&/]/g, "-")
      .replace(/ /g, "-")}/${id}`
  );

  return null;
};

export default MetaHead;
