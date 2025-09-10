export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-red-500">
      <h1 className="text-green-500 mb-6">Profile Page</h1>
      <hr />
      <p className="text-4xl text-red-500">
        This is profile page
        <span className="p-2 mx-2 mr-2 rounded bg-orange-600 text-black">{id}</span>
      </p>
    </div>
  );
}
