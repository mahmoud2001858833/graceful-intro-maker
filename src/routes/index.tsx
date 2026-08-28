import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { Cover } from "@/components/invitation/Cover";
import { InvitationCard } from "@/components/invitation/InvitationCard";
import { MusicPlayer } from "@/components/invitation/MusicPlayer";
import { smoothScrollToElement } from "@/lib/smooth-scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "حفل زفاف محمد وفرح — ٤ / ٩ / ٢٠٢٦" },
      {
        name: "description",
        content:
          "دعوة حفل زفاف محمد وفرح، يوم الجمعة ٤ / ٩ / ٢٠٢٦ في حديقة تاج بارك للمناسبات. بحضوركم تكتمل فرحتنا.",
      },
      { property: "og:title", content: "حفل زفاف محمد وفرح — ٤ / ٩ / ٢٠٢٦" },
      {
        property: "og:description",
        content: "بحضوركم تكتمل فرحتنا — حديقة تاج بارك للمناسبات.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const goToInvite = useCallback(() => {
    smoothScrollToElement("main-invite", 2800);
  }, []);

  return (
    <main dir="rtl" className="invite-root">
      <h1 className="sr-only">دعوة حفل زفاف محمد وفرح</h1>
      <Cover onGoToInvite={goToInvite} />
      <InvitationCard />
    </main>
  );
}
