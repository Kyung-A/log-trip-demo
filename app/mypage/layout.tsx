import { AuthLayout } from "@/widgets/auth";

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
