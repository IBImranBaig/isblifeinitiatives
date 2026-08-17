import type { Metadata } from "next";
import { LegalDocument, type LegalSection } from "@/components/sections/LegalDocument";

export const metadata: Metadata = {
  title: "Comment Policy",
  description: "How we keep discussion open, respectful and constructive.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "A Shared Point Of View",
    body: (
      <p>
        When I write a blog post, it&rsquo;s obviously my point of view. Once
        it&rsquo;s in the open, though, it then becomes a shared point of view with
        you, the readers – and your point of view is what builds the discussions
        around a post. Sometimes you&rsquo;ll agree with me; other times, not so
        much. And that&rsquo;s what makes the comments after a post such a fervent
        breeding ground for ideas.
      </p>
    ),
  },
  {
    heading: "Attack My Views, Not Other Commenters",
    body: (
      <>
        <p>
          I don&rsquo;t mind if you attack me for my views. Heck, I&rsquo;m big and
          ugly enough to take your shots, and it shows me that you&rsquo;re
          passionate about a topic – and I would never discourage passion.
        </p>
        <p>
          Besides, I&rsquo;m the person that&rsquo;s invoked that reaction, so if
          it&rsquo;s an attack, let&rsquo;s have it open and unfiltered (although
          keeping it respectful would be nice).
        </p>
        <p>
          What I won&rsquo;t accept, however, is attacking other commenters.
          They&rsquo;re like you – simply offering an additional view on the starting
          topic. By all means, attack me – the blog is my home and as the owner,
          I&rsquo;m responsible for what goes on inside. But attacking another
          commenter – that&rsquo;s poor form.
        </p>
      </>
    ),
  },
  {
    heading: "Open, But Play Nice",
    body: (
      <>
        <p>
          I&rsquo;m a firm believer in an open comment policy; I don&rsquo;t moderate
          before publication, because I feel that stints genuine interaction and
          conversation. Going by the conversations that have happened over the
          months, it would appear that most agree.
        </p>
        <p>
          Let&rsquo;s play nice and keep it that way. Like I say, attack me if you
          wish – as the instigator of discussion, I&rsquo;m open to all views and
          words. But let&rsquo;s treat the guests (and that includes you) nicely.
          Otherwise, you will be moderated and deleted where I feel it&rsquo;s
          applicable. Continue to be abusive and you will be banned.
        </p>
      </>
    ),
  },
  {
    heading: "No Slander, Hate Or Spam",
    body: (
      <>
        <p>
          The same goes for comments that include slanderous or libelous statements.
          As the owner of this blog, I&rsquo;m responsible for what&rsquo;s posted
          here, so I won&rsquo;t allow allegations that could result in legal action
          – these comments will be removed.
        </p>
        <p>
          And let&rsquo;s keep the bigotry, hate, sexism, profanity and all that
          other fun stuff off here too. You want that, hit up TechCrunch, YouTube or
          similar. Oh, and no affiliate links in the comments, please – instead, feel
          free to point to any blog posts you&rsquo;ve written about a particular
          affiliate program.
        </p>
        <p>Sound fair?</p>
      </>
    ),
  },
  {
    heading: "Real Names Only",
    body: (
      <p>
        Oh – and one more thing. Real names only, please – no SEO-driven keyword
        names. You get a link back to your site anyway thanks to the Do-Follow
        arrangement here, so there&rsquo;s no need to go double SEO on me. Names that
        are blatant linkbait will be edited.
      </p>
    ),
  },
];

export default function CommentPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Community"
      title="Comment Policy"
      updated="August 2025"
      sections={SECTIONS}
      numbered
    />
  );
}
