import { useRouter } from 'next/router';

export default function DashboardPage() {
  const router = useRouter();
  const { email, password, role } = router.query;

  return (
    <div>
      This is Dashboard Page, {email} {role} {password}
    </div>
  );
}
