import { auth } from "@/auth";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

const getData = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: { id },
    select: {
      name: true,
      email: true,
    },
  });

  if (!data) return null;

  return data;
};

export default async function SettingsPage() {
  const session = await auth();

  const data = await getData(session?.user?.id as string);

  return (
    <div>
      <SettingsForm
        name={data?.name as string}
        email={data?.email as string}
      />
    </div>
  );
}
