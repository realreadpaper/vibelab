import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

const rehypeOptions = {
  theme: "github-dark",
  keepBackground: false,
};

export function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, rehypeOptions]],
          },
        }}
      />
    </div>
  );
}
