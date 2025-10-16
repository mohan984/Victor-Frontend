export default function FAQ() {
  return (
    <section className="px-8 py-16 bg-gray-50">
      <h3 className="text-2xl font-bold mb-8 text-center">FAQ</h3>
      <div className="space-y-4 max-w-2xl mx-auto">
        <details className="p-4 border rounded-lg">
          <summary>How many free tests can I take?</summary>
          <p className="mt-2 text-sm text-gray-600">You can take 2 free tests per subject without a subscription.</p>
        </details>
        <details className="p-4 border rounded-lg">
          <summary>Do I get detailed performance reports?</summary>
          <p className="mt-2 text-sm text-gray-600">Yes, premium users get full analytics.</p>
        </details>
        <details className="p-4 border rounded-lg">
          <summary>Can I access exams on mobile?</summary>
          <p className="mt-2 text-sm text-gray-600">Yes, the site is fully responsive for mobile.</p>
        </details>
      </div>
    </section>
  );
}
