import { createFileRoute } from "@tanstack/react-router";
import { InvitationPage } from "./index";

export const Route = createFileRoute("/dinner")({
  head: () => ({
    meta: [
      { title: "حفل زفاف محمد وفرح — العشاء — ٤ / ٩ / ٢٠٢٦" },
      {
        name: "description",
        content:
          "دعوة حفل زفاف محمد وفرح، يوم الجمعة ٤ / ٩ / ٢٠٢٦ في حديقة تاج بارك للمناسبات، يليه تناول العشاء في منزل والد العريس.",
      },
      { property: "og:title", content: "حفل زفاف محمد وفرح — العشاء — ٤ / ٩ / ٢٠٢٦" },
      {
        property: "og:description",
        content:
          "بحضوركم تكتمل فرحتنا — حديقة تاج بارك للمناسبات، يليه العشاء في منزل والد العريس.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DinnerPage,
});

function DinnerPage() {
  return <InvitationPage showDinner />;
}
